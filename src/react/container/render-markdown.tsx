import { WorkspaceLeaf } from "obsidian";
import React from "react";
import { appendOrReplaceFirstChild, renderMarkdown } from "./render-utils";

interface Props {
	leaf: WorkspaceLeaf;
	markdown: string;
}

export const RenderMarkdown = React.memo(({ leaf, markdown }: Props) => {
	return (
		<div
			ref={async (node) => {
				const markdownDiv = await renderMarkdown(leaf, markdown);
				appendOrReplaceFirstChild(node, markdownDiv);
			}}
		/>
	);
});
