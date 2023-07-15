import { WorkspaceLeaf } from "obsidian";
import React from "react";
import { appendOrReplaceFirstChild, renderMarkdown } from "./render-utils";
import { css } from "@emotion/react";

interface Props {
	leaf: WorkspaceLeaf;
	markdown: string;
}

export const RenderMarkdown = React.memo(({ leaf, markdown }: Props) => {
	return (
		<div
			css={css`
				width: 100%;
				height: 100%;
			`}
			ref={async (node) => {
				const markdownDiv = await renderMarkdown(leaf, markdown);
				appendOrReplaceFirstChild(node, markdownDiv);
			}}
		/>
	);
});
