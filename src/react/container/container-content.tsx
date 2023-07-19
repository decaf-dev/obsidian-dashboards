import { getMarkdownFromContainerContent } from "src/react/container/render-utils";
import { Container } from "src/shared/types";
import IconButton from "../icon-button/icon-button";
import { useMountState } from "../mount-provider";
import { RenderMarkdown } from "./render-markdown";
import { css } from "@emotion/react";

interface Props {
	container: Container;
	isCtrlDown: boolean;
	isHovered: boolean;
	height: number;
	numContainersY: number;
	onRemoveClick: () => void;
}

export default function ContainerContent({
	isCtrlDown,
	isHovered,
	container,
	height,
	numContainersY,
	onRemoveClick,
}: Props) {
	const leaf = useMountState();

	if (leaf === null)
		throw new Error("Container component must be mounted in a leaf");

	const markdown = getMarkdownFromContainerContent(
		container.type,
		container.content
	);

	return (
		<>
			<div
				css={css`
					position: relative;
				`}
			>
				<div
					css={css`
						position: absolute;
						top: ${height / 2}px;
						z-index: 100;
						transform: translate(-50%, 0);
					`}
				>
					{isCtrlDown && isHovered && (
						<div
							css={css`
								background-color: var(--background-primary);
								opacity: 0.98;
								border-radius: 50%;
							`}
						>
							<IconButton
								tooltip="Remove"
								iconId="x"
								onClick={() => onRemoveClick()}
							/>
						</div>
					)}
				</div>
			</div>
			<RenderMarkdown
				leaf={leaf}
				markdown={markdown}
				numContainersY={numContainersY}
			/>
		</>
	);
}
