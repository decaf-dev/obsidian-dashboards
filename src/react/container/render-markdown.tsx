import { WorkspaceLeaf } from "obsidian";
import React from "react";
import { appendOrReplaceFirstChild, renderMarkdown } from "./render-utils";
import { css } from "@emotion/react";

interface Props {
	leaf: WorkspaceLeaf;
	markdown: string;
	numContainersY: number;
}

export const RenderMarkdown = React.memo(
	({ leaf, markdown, numContainersY }: Props) => {
		return (
			<div
				css={css`
					width: 100%;
					height: 100%;
				`}
				ref={async (node) => {
					const markdownEl = await renderMarkdown(leaf, markdown);

					const containerEl = leaf.view.containerEl.querySelector(
						".view-content"
					) as HTMLElement;
					const containerHeight =
						containerEl.getBoundingClientRect().height;
					const child = markdownEl.firstChild as HTMLElement;

					//The available space for the table is the height of the container minus the height of the header (50px)
					//dividing this by the number of containers in the y axis gives us the height of each container
					child.style.height = `${
						(containerHeight - 50 - 75) / numContainersY
					}px`;
					child.style.overflowY = "scroll";

					appendOrReplaceFirstChild(node, markdownEl);
				}}
			/>
		);
	}
);
