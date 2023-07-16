import { css } from "@emotion/react";
import { LayoutOptions } from "src/shared/state/types";

interface Props {
	layout: LayoutOptions;
	onLayoutChange: (value: LayoutOptions) => void;
	onToggleBorder: () => void;
}

export default function OptionBar({
	layout,
	onLayoutChange,
	onToggleBorder,
}: Props) {
	return (
		<div
			css={css`
				width: 100%;
				display: flex;
				justify-content: flex-end;
				column-gap: 10px;
				padding: 10px;
			`}
		>
			<button onClick={() => onToggleBorder()}>Toggle Border</button>
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
		</div>
	);
}
