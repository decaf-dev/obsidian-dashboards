import {
	appendOrReplaceFirstChild,
	renderMarkdown,
} from "src/shared/render-utils";
import { Container } from "src/shared/types";
import IconButton from "./icon-button";
import { WorkspaceLeaf } from "obsidian";
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

	if (leaf === null)
		throw new Error("Container component must be mounted in a leaf");

	return (
		<>
			{(!isCtrlDown || !isHovered) && (
				<div
					ref={async (node) => {
						const markdownDiv = await renderMarkdown(
							leaf,
							container.content
						);
						appendOrReplaceFirstChild(node, markdownDiv);
					}}
				></div>
			)}
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
