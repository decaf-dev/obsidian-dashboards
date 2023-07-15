import { MarkdownRenderer, WorkspaceLeaf } from "obsidian";
import { DASHBOARDS_VIEW } from "src/data/constants";
import DashboardsView from "src/obsidian/dashboards-view";
import { ContainerType } from "src/shared/types";

export const getMarkdownFromContainerContent = (
	type: ContainerType,
	content: string
) => {
	switch (type) {
		case ContainerType.CODE_BLOCK:
			return content;
		case ContainerType.FILE:
			if (!content.endsWith(".md")) {
				const resourcePath = app.vault.adapter.getResourcePath(content);
				return `![](${resourcePath})`;
			}
			return `![[${content}]]`;
		case ContainerType.LINK:
			if (
				content.contains("twitter.com") ||
				content.contains("youtube.com")
			) {
				return `![](${content})`;
			}
			return `<iframe src="${content}"></iframe>`;
		default:
			throw new Error(`Unknown container type: ${type}`);
	}
};

export const appendOrReplaceFirstChild = (
	container: HTMLElement | null,
	child: HTMLElement | null
) => {
	if (container == null || child === null) return;

	//If there is no first child, append the child
	if (container && !container.firstChild) {
		container.appendChild(child);
		//If there is already a child and it is not the same as the child, replace the child
	} else if (container.firstChild && container.firstChild !== child) {
		container.replaceChild(child, container.firstChild);
	}
};

export const renderMarkdown = async (leaf: WorkspaceLeaf, markdown: string) => {
	const div = document.createElement("div");
	div.style.height = "100%";
	div.style.width = "100%";
	div.classList.add("markdown-rendered");

	const view = leaf.view;
	if (view instanceof DashboardsView) {
		try {
			//@ts-expect-error - private method
			await MarkdownRenderer.render(
				app,
				markdown,
				div,
				view.file.path,
				view
			);

			watchForMutations(div, view);
		} catch (e) {
			console.error(e);
		}
	}
	return div;
};

const handleLinkClick = (event: MouseEvent) => {
	const targetEl = event.target as HTMLElement;
	const closestAnchor =
		targetEl.tagName === "A" ? targetEl : targetEl.closest("a");

	if (!closestAnchor) {
		return;
	}

	if (closestAnchor.hasClass("internal-link")) {
		event.preventDefault();

		const href = closestAnchor.getAttr("href");
		const newLeaf = event.ctrlKey || event.metaKey;

		if (href) app.workspace.openLinkText(href, "", newLeaf);
	}
};

const watchForMutations = (el: HTMLElement, view: DashboardsView) => {
	const observer = new MutationObserver(function () {
		// // Handle the mutations here
		// mutationsList.forEach(function (mutation) {
		// 	console.log("Mutation type:", mutation.type);
		// 	console.log("Modified element:", mutation.target);
		// });
		checkForEmbeddedLinks(el, view);
	});

	// Configuration options for the observer (e.g., what types of mutations to observe)
	const config = { childList: true, subtree: true };

	// Start observing the target node with the specified configuration
	observer.observe(el, config);
};

const checkForEmbeddedLinks = (el: HTMLElement, view: DashboardsView) => {
	const embeds = el.querySelectorAll(".internal-link");
	embeds.forEach((embed) => {
		const el = embed as HTMLAnchorElement;
		const href = el.getAttribute("data-href");
		if (!href) return;

		const destination = app.metadataCache.getFirstLinkpathDest(
			href,
			view.file.path
		);
		if (!destination) embed.classList.add("is-unresolved");

		el.addEventListener("mouseover", (e) => {
			e.stopPropagation();
			app.workspace.trigger("hover-link", {
				event: e,
				source: DASHBOARDS_VIEW,
				hoverParent: view.containerEl,
				targetEl: el,
				linktext: href,
				sourcePath: el.href,
			});
		});

		el.addEventListener("click", handleLinkClick);
	});
};
