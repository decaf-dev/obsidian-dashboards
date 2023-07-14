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
import { EVENT_CTRL_DOWN, EVENT_CTRL_UP } from "src/shared/constants";
import { TFile } from "obsidian";

interface Props {
	container?: Container;
}

export default function Container({ container }: Props) {
	const leaf = useMountState();

	const [isHovered, setHover] = React.useState(false);
	const [isCtrlDown, setCtrlDown] = React.useState(false);

	function handleCodeblockModalSave(value: string) {}

	function handleLinkModalSave(value: string) {}

	function handleFileModalSave(value: TFile) {}

	function handleRemoveClick() {}

	if (leaf === null)
		throw new Error("Container component must be mounted in a leaf");

	React.useEffect(() => {
		function handleCtrlDown() {
			setCtrlDown(true);
		}

		function handleCtrlUp() {
			setCtrlDown(false);
		}

		//@ts-expect-error Not native Obsidian event
		app.workspace.on(EVENT_CTRL_DOWN, handleCtrlDown);
		//@ts-expect-error Not native Obsidian event
		app.workspace.on(EVENT_CTRL_UP, handleCtrlUp);
		return () => {
			app.workspace.off(EVENT_CTRL_DOWN, handleCtrlDown);
			app.workspace.off(EVENT_CTRL_UP, handleCtrlUp);
		};
	}, []);

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
			{container === undefined && (
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
			)}
			{container !== undefined && (!isCtrlDown || !isHovered) && (
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
			{container !== undefined && isCtrlDown && isHovered && (
				<IconButton
					tooltip="Remove"
					iconId="x"
					onClick={() => handleRemoveClick()}
				/>
			)}
		</div>
	);
}
