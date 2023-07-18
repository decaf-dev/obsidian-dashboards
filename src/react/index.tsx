import { WorkspaceLeaf } from "obsidian";

import App from "./app";
import { AppState } from "src/shared/state/types";
import MountProvider from "./mount-provider";

interface Props {
	appId: string;
	leaf: WorkspaceLeaf;
	initialState: AppState;
	onStateChange: (value: AppState) => void;
}

export default function Main({
	appId,
	leaf,
	initialState,
	onStateChange,
}: Props) {
	return (
		<MountProvider leaf={leaf} appId={appId}>
			<App initialState={initialState} onStateChange={onStateChange} />
		</MountProvider>
	);
}
