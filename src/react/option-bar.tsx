import { css } from "@emotion/react";
import { LayoutOptions } from "src/shared/types";

interface Props {
	layout: LayoutOptions;
	onLayoutChange: (value: LayoutOptions) => void;
}

export default function OptionBar({ layout, onLayoutChange }: Props) {
	return (
		<div
			css={css`
				width: 100%;
				display: flex;
				justify-content: flex-end;
				padding: 10px;
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
		</div>
	);
}
