import { App, WorkspaceLeaf } from "obsidian";

import DashboardsApp from "./dashboards-app";
import { AppState } from "src/shared/state/types";
import MountProvider from "./mount-provider";

interface Props {
	app: App;
	reactAppId: string;
	leaf: WorkspaceLeaf;
	initialState: AppState;
	onStateChange: (value: AppState) => void;
}

export default function Main({
	app,
	reactAppId,
	leaf,
	initialState,
	onStateChange,
}: Props) {
	return (
		<MountProvider leaf={leaf} reactAppId={reactAppId} app={app}>
			<DashboardsApp
				initialState={initialState}
				onStateChange={onStateChange}
			/>
		</MountProvider>
	);
}
