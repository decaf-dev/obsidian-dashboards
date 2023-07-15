import { css } from "@emotion/react";

import { Container } from "src/shared/types";
import React from "react";
import { EVENT_CTRL_DOWN, EVENT_CTRL_UP } from "src/shared/constants";
import { TFile } from "obsidian";
import ContainerContent from "./container-content";
import EmptyContainerContent from "./empty-container-content";

interface Props {
	container?: Container;
	showBorders: boolean;
}

export default function Container({ container, showBorders }: Props) {
	const [isHovered, setHover] = React.useState(false);
	const [isCtrlDown, setCtrlDown] = React.useState(false);

	function handleCodeblockModalSave(value: string) {}

	function handleLinkModalSave(value: string) {}

	function handleFileModalSave(value: TFile) {}

	function handleRemoveClick() {}

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
				${showBorders
					? "border: 1px solid var(--background-modifier-border);"
					: ""}
			`}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			{container === undefined && (
				<EmptyContainerContent
					onCodeblockModalSave={handleCodeblockModalSave}
					onLinkModalSave={handleLinkModalSave}
					onFileModalSave={handleFileModalSave}
				/>
			)}
			{container && (
				<ContainerContent
					container={container}
					isHovered={isHovered}
					isCtrlDown={isCtrlDown}
					onRemoveClick={handleRemoveClick}
				/>
			)}
		</div>
	);
}
