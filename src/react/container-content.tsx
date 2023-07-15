import {
	appendOrReplaceFirstChild,
	renderMarkdown,
} from "src/shared/render-utils";
import { Container, ContainerType } from "src/shared/types";
import IconButton from "./icon-button";
import { useMountState } from "./mount-provider";

interface Props {
	container: Container;
	isCtrlDown: boolean;
	isHovered: boolean;
	onRemoveClick: () => void;
}

export default function ContainerContent({
	isCtrlDown,
	isHovered,
	container,
	onRemoveClick,
}: Props) {
	const leaf = useMountState();

	function getMarkdownFromContent(type: ContainerType, content: string) {
		switch (type) {
			case ContainerType.CODEBLOCK:
				return content;
			case ContainerType.FILE:
				if (!content.endsWith(".md")) {
					const resourcePath =
						app.vault.adapter.getResourcePath(content);
					return `![](${resourcePath})`;
				}
				return `![[${content}]]`;
			case ContainerType.LINK:
				return `![](${content})`;
			default:
				throw new Error(`Unknown container type: ${type}`);
		}
	}

	if (leaf === null)
		throw new Error("Container component must be mounted in a leaf");

	const markdown = getMarkdownFromContent(container.type, container.content);

	return (
		<>
			<div
				ref={async (node) => {
					const markdownDiv = await renderMarkdown(leaf, markdown);
					appendOrReplaceFirstChild(node, markdownDiv);
				}}
			></div>
			{isCtrlDown && isHovered && (
				<IconButton
					tooltip="Remove"
					iconId="x"
					onClick={() => onRemoveClick()}
				/>
			)}
		</>
	);
}
