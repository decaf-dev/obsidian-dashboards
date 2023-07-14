import { css } from "@emotion/react";

import { Container } from "src/shared/types";
import IconButton from "./icon-button";
import React from "react";
import CodeblockModal from "src/obsidian/codeblock-modal";
import LinkModal from "src/obsidian/link-modal";
import FileModal from "src/obsidian/file-modal";
import {
	appendOrReplaceFirstChild,
	renderMarkdown,
} from "src/shared/render-utils";
import { useMountState } from "./mount-provider";

interface Props {
	container?: Container;
}

export default function Container({ container }: Props) {
	const leaf = useMountState();

	// <IconButton iconId="x" />;
	const [isHovered, setHover] = React.useState(false);

	function handleCodeblockModalSave() {}

	function handleLinkModalSave() {}

	function handleFileModalSave() {}

	if (leaf === null)
		throw new Error("Container component must be mounted in a leaf");

	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
				border: 1px solid var(--background-modifier-border);
			`}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			{!container ? (
				<>
					<IconButton
						tooltip="Add file"
						iconId="sticky-note"
						onClick={() =>
							new FileModal(app, handleFileModalSave).open()
						}
					/>
					<IconButton
						tooltip="Add codeblock"
						iconId="code"
						onClick={() =>
							new CodeblockModal(
								app,
								handleCodeblockModalSave
							).open()
						}
					/>
					<IconButton
						tooltip="Add link"
						iconId="link"
						onClick={() =>
							new LinkModal(app, handleLinkModalSave).open()
						}
					/>
				</>
			) : (
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
		</div>
	);
}
