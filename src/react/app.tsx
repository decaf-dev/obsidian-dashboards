import React from "react";

import { css } from "@emotion/react";

import { AppState } from "src/shared/state/types";
import Table from "./table/table";
import OptionBar from "./option-bar/option-bar";
import { getGridX, getGridY } from "./table/table-utils";
import {
	EVENT_BORDER_TOGGLE,
	EVENT_OPTION_BAR_TOGGLE,
} from "src/shared/constants";
import { useMountState } from "./mount-provider";

interface Props {
	initialState: AppState;
	onStateChange: (state: AppState) => void;
}

export default function App({ initialState, onStateChange }: Props) {
	const [state, setState] = React.useState(initialState);
	const { appId } = useMountState();

	React.useEffect(() => {
		onStateChange(state);
	}, [state, onStateChange]);

	const { layout, data, showBorders, borderSpacing, showOptionBar } = state;
	const gridX = getGridX(layout);
	const gridY = getGridY(layout);

	React.useEffect(() => {
		function handleOptionBarToggle(eventAppId: string) {
			if (appId === eventAppId) {
				setState((prevState) => {
					return {
						...prevState,
						showOptionBar: !prevState.showOptionBar,
					};
				});
			}
		}
		//@ts-expect-error not native Obsidian event
		app.workspace.on(EVENT_OPTION_BAR_TOGGLE, handleOptionBarToggle);
		return () => {
			app.workspace.off(EVENT_OPTION_BAR_TOGGLE, handleOptionBarToggle);
		};
	}, [appId]);

	React.useEffect(() => {
		function handleBorderToggle(eventAppId: string) {
			if (appId === eventAppId) {
				setState((prevState) => {
					return {
						...prevState,
						showBorders: !prevState.showBorders,
					};
				});
			}
		}
		//@ts-expect-error not native Obsidian event
		app.workspace.on(EVENT_BORDER_TOGGLE, handleBorderToggle);
		return () => {
			app.workspace.off(EVENT_BORDER_TOGGLE, handleBorderToggle);
		};
	}, [appId]);

	return (
		<div
			className="Dashboards__app"
			css={css`
				display: flex;
				flex-direction: column;
				width: 100%;
				height: 100%;
			`}
		>
			{showOptionBar && (
				<OptionBar
					borderSpacing={borderSpacing}
					layout={layout}
					onLayoutChange={(value) =>
						setState((prevState) => {
							return {
								...prevState,
								layout: value,
							};
						})
					}
					onToggleBorder={() =>
						setState((prevState) => {
							return {
								...prevState,
								showBorders: !prevState.showBorders,
							};
						})
					}
					onBorderSpacingChange={(value) =>
						setState((prevState) => {
							return {
								...prevState,
								borderSpacing: value,
							};
						})
					}
				/>
			)}
			<Table
				data={data}
				borderSpacing={borderSpacing}
				showBorders={showBorders}
				gridX={gridX}
				gridY={gridY}
				onAddContainer={(container) => {
					setState((prevState) => {
						return {
							...prevState,
							data: [...prevState.data, container],
						};
					});
				}}
				onRemoveContainer={(id) => {
					setState((prevState) => {
						return {
							...prevState,
							data: prevState.data.filter(
								(container) => container.id !== id
							),
						};
					});
				}}
			/>
		</div>
	);
}
