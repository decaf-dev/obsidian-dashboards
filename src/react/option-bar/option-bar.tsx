import { css } from "@emotion/react";

import { LayoutOptions } from "src/shared/state/types";

interface Props {
	borderSpacing: string;
	layout: LayoutOptions;
	onLayoutChange: (value: LayoutOptions) => void;
	onToggleBorder: () => void;
	onBorderSpacingChange: (value: string) => void;
}

export default function OptionBar({
	borderSpacing,
	layout,
	onLayoutChange,
	onBorderSpacingChange,
}: Props) {
	return (
		<div
			css={css`
				width: 100%;
				display: flex;
				justify-content: flex-end;
				column-gap: var(--size-2-3);
				padding-top: 0;
				padding-bottom: var(--size-4-4);
				padding-left: var(--size-4-4);
				padding-right: var(--size-4-4);
			`}
		>
			<div
				css={css`
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					row-gap: var(--size-4-4);
				`}
			>
				<select
					value={layout}
					css={css`
						width: fit-content;
					`}
					onChange={(e) =>
						onLayoutChange(e.target.value as LayoutOptions)
					}
				>
					{Object.values(LayoutOptions).map((layoutOption) => (
						<option key={layoutOption}>{layoutOption}</option>
					))}
				</select>
				<input
					aria-label="Border spacing"
					type="range"
					min="0"
					max="50"
					step="5"
					value={borderSpacing.slice(0, -2)}
					onChange={(e) =>
						onBorderSpacingChange(e.target.value + "px")
					}
				/>
			</div>
		</div>
	);
}
