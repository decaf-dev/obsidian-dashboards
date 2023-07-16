import { WorkspaceLeaf } from "obsidian";

import App from "./app";
import { AppState } from "src/shared/state/types";
import MountProvider from "./mount-provider";

interface Props {
	leaf: WorkspaceLeaf;
	initialState: AppState;
	onStateChange: (value: AppState) => void;
}

export default function Main({ leaf, initialState, onStateChange }: Props) {
	return (
		<MountProvider leaf={leaf}>
			<App initialState={initialState} onStateChange={onStateChange} />
		</MountProvider>
	);
}
