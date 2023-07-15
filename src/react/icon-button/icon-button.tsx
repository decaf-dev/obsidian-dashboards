import { css } from "@emotion/react";
import { setIcon } from "obsidian";

interface Props {
	iconId: string;
	tooltip: string;
	onClick?: (e: React.MouseEvent) => void;
}

export default function IconButton({ iconId, tooltip, onClick }: Props) {
	return (
		<div
			css={css`
				display: flex;
				justify-content: center;
				align-items: center;
				width: 50px;
				height: 50px;
				cursor: pointer;
				border-radius: 50%;
				&:hover {
					background-color: var(--background-modifier-hover);
				}
			`}
			ref={(node) => {
				if (node) {
					setIcon(node, iconId);
				}
			}}
			aria-label={tooltip}
			onClick={onClick}
		/>
	);
}
