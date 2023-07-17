import React from "react";

import { css } from "@emotion/react";
import { setIcon } from "obsidian";

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
	onToggleBorder,
	onBorderSpacingChange,
}: Props) {
	const ref = React.useRef<HTMLButtonElement>(null);
	const [position, setPosition] = React.useState({ x: 0, y: 0 });

	React.useEffect(() => {
		let observer: MutationObserver | null = null;

		const handleSizeChanges = (mutationsList: any) => {
			console.log(mutationsList);
			for (let mutation of mutationsList) {
				if (
					mutation.type === "attributes" &&
					mutation.attributeName === "style"
				) {
					const rect = ref.current?.getBoundingClientRect();
					if (rect) {
						const { x, y } = rect;
						setPosition({ x, y });
					}
				}
			}
		};

		const appContainer = document.querySelector("body");
		if (appContainer) {
			// Create a new mutation observer
			const observer = new MutationObserver(handleSizeChanges);

			// Configure and start the observer
			const observerConfig = {
				attributes: true,
				attributeFilter: ["style"],
			};

			observer.observe(appContainer, observerConfig);
		}

		return () => {
			observer?.disconnect();
		};
	}, [ref.current]);

	React.useEffect(() => {
		if (ref.current) {
			setIcon(ref.current, "more-vertical");
			const { x, y } = ref.current.getBoundingClientRect();
			setPosition({ x, y });
		}
	}, []);

	console.log(borderSpacing);

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
			{/* <button
				css={css`
					border: none;
					box-shadow: none !important;
					padding: var(--size-2-2) var(--size-2-3);
				`}
				ref={ref}
				onClick={() =>
					showLayoutMenu(position, {
						onToggleBorder,
					})
				}
			></button> */}
		</div>
	);
}
