import { Plugin, TFolder } from "obsidian";
import { DASHBOARD_FILE_EXTENSION } from "./data/constants-file";
import {
	CURRENT_PLUGIN_VERSION,
	DASHBOARDS_VIEW,
} from "./data/constants-obsidian";
import DashboardsView from "./obsidian/dashboards-view";
import { createDashboardFile } from "./data/dashboard-file-operations";
import DashboadsSettingsTab from "./obsidian/dashboards-settings-tab";
import { EVENT_CTRL_DOWN, EVENT_CTRL_UP } from "./shared/constants";
import { findDashboardFolderPath } from "./data/dashboard-folder-utils";

interface DashboardsSettings {
	createInObsidianAttachmentFolder: boolean;
	customFolderForNewFiles: string;
	pluginVersion: string;
}

const DEFAULT_SETTINGS: DashboardsSettings = {
	createInObsidianAttachmentFolder: false,
	customFolderForNewFiles: "",
	pluginVersion: CURRENT_PLUGIN_VERSION,
};

export default class DashboardsPlugin extends Plugin {
	settings: DashboardsSettings;

	async onload() {
		await this.loadSettings();

		this.registerView(DASHBOARDS_VIEW, (leaf) => new DashboardsView(leaf));
		this.registerExtensions([DASHBOARD_FILE_EXTENSION], DASHBOARDS_VIEW);

		this.addRibbonIcon("gauge", "Create new dashboard", async () => {
			await this.handleCreateDashboardFile(null);
		});

		this.registerEvents();
		this.registerCommands();

		this.addSettingTab(new DashboadsSettingsTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	private registerEvents() {
		this.registerEvent(
			this.app.workspace.on("file-menu", (menu, file) => {
				if (file instanceof TFolder) {
					menu.addItem((item) => {
						item.setTitle("New dashboard")
							.setIcon("document")
							.onClick(async () => {
								await this.handleCreateDashboardFile(file.path);
							});
					});
				}
			})
		);

		this.registerDomEvent(document, "keydown", (event) => {
			if (event.metaKey || event.ctrlKey) {
				app.workspace.trigger(EVENT_CTRL_DOWN, event);
			}
		});

		this.registerDomEvent(document, "keyup", (event) => {
			if (!event.metaKey && !event.ctrlKey) {
				app.workspace.trigger(EVENT_CTRL_UP, event);
			}
		});
	}

	private registerCommands() {
		this.addCommand({
			id: "databoards-create",
			name: "Create dashboard",
			callback: async () => {
				await this.handleCreateDashboardFile(null);
			},
		});
	}

	private handleCreateDashboardFile(contextMenuFolderPath: string | null) {
		const folderPath = findDashboardFolderPath(contextMenuFolderPath, {
			createInObsidianAttachmentFolder:
				this.settings.createInObsidianAttachmentFolder,
			customFolderForNewFiles: this.settings.customFolderForNewFiles,
		});
		createDashboardFile(folderPath);
	}
}
