import { TextFileView, WorkspaceLeaf } from "obsidian";
import { AppState } from "src/shared/state/types";
import { createRoot, Root } from "react-dom/client";
import { v4 as uuidv4 } from "uuid";

import { deserializeAppState, serializeAppState } from "src/data/serialize";
import {
	DASHBOARDS_VIEW,
	EVENT_BORDER_TOGGLE,
	EVENT_OPTION_BAR_TOGGLE,
} from "src/shared/constants";
import Main from "src/react";
import LayoutModal from "./modal/layout-modal";

export default class DashboardsView extends TextFileView {
	private root: Root | null;
	private appId: string;

	data: string;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
		this.root = null;
		this.data = "";
		this.appId = uuidv4();
	}

	async onOpen() {
		//This is the view content container

		this.addAction("eye-off", "Hide option bar", () => {
			app.workspace.trigger(EVENT_OPTION_BAR_TOGGLE, this.appId);
		});
		this.addAction("maximize", "Toggle border", () => {
			app.workspace.trigger(EVENT_BORDER_TOGGLE, this.appId);
		});
		this.addAction("layout-grid", "Rearrange grid", () => {
			new LayoutModal(this.app, this.data, (value) =>
				this.handleSaveState(value, true)
			).open();
		});
	}

	async onClose() {
		if (this.root) {
			this.root.unmount();
			this.root = null;
		}
	}

	setViewData(data: string, clear: boolean): void {
		this.data = data;

		if (clear) {
			//We need to set this in a timeout to prevent errors from React
			setTimeout(() => {
				if (this.root) {
					this.root.unmount();
				}
				const container = this.containerEl.children[1];
				this.root = createRoot(container);

				const state = deserializeAppState(data);
				this.renderApp(state);
			}, 0);
		}
	}

	clear(): void {
		this.data = "{}";
	}

	getViewData(): string {
		return this.data;
	}

	getViewType() {
		return DASHBOARDS_VIEW;
	}

	getDisplayText() {
		const fileName = this.file?.name;
		if (fileName) {
			const extensionIndex = fileName.lastIndexOf(".");
			return fileName.substring(0, extensionIndex);
		}
		return "";
	}

	private renderApp(state: AppState) {
		if (this.root) {
			this.root.render(
				<Main
					appId={this.appId}
					leaf={this.leaf}
					initialState={state}
					onStateChange={(value) =>
						this.handleSaveState(value, false)
					}
				/>
			);
		}
	}

	private handleSaveState = (state: AppState, isExternal: boolean) => {
		const serialized = serializeAppState(state);
		this.setViewData(serialized, isExternal);
		//Request a save - every 2s
		this.requestSave();
	};
}
