import { TextFileView, WorkspaceLeaf } from "obsidian";
import { AppState } from "src/shared/types";
import { createRoot, Root } from "react-dom/client";
import {
	deserializeAppState,
	serializeAppState,
} from "src/data/serialize-app-state";
import { DASHBOARDS_VIEW } from "src/data/constants";
import Main from "src/react";

export default class DashboardsView extends TextFileView {
	private root: Root | null;

	data: string;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
		this.root = null;
		this.data = "";
	}

	async onOpen() {
		//This is the view content container
		const container = this.containerEl.children[1];
		this.root = createRoot(container);
	}

	async onClose() {
		if (this.root) {
			this.root.unmount();
			this.root = null;
		}
	}

	setViewData(data: string, clear: boolean): void {
		this.data = data;

		const state = deserializeAppState(data);
		if (clear) {
			//We need to set this in a timeout to prevent errors from React
			setTimeout(() => {
				if (this.root) {
					this.root.unmount();
					const container = this.containerEl.children[1];
					this.root = createRoot(container);
					this.renderApp(state);
				}
			}, 0);
		} else {
			this.renderApp(state);
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
					leaf={this.leaf}
					initialState={state}
					onStateChange={this.handleSaveLoomState}
				/>
			);
		}
	}

	private handleSaveLoomState = (state: AppState) => {
		const serialized = serializeAppState(state);
		this.data = serialized;

		//Request a save - every 2s
		this.requestSave();
	};
}
