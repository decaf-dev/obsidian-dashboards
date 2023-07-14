import { Plugin, TFolder, normalizePath } from "obsidian";
import {
	CURRENT_PLUGIN_VERSION,
	DASHBOARDS_VIEW,
	DASHBOARD_FILE_EXTENSION,
} from "./data/constants";
import DashboardsView from "./obsidian/dashboards-view";
import { createDashboardFile } from "./data/dashboard-file";
import DashboadsSettingsTab from "./obsidian/dashboards-settings-tab";

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
			await this.handleCreateDashboardFile();
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
	}

	private registerCommands() {
		this.addCommand({
			id: "databoards-create",
			name: "Create dashboard",
			callback: async () => {
				await this.handleCreateDashboardFile();
			},
		});
	}

	private handleCreateDashboardFile(contextMenuFolderPath?: string) {
		const folderPath = this.findDashboardFolderPath(contextMenuFolderPath);
		createDashboardFile(folderPath);
	}

	private findDashboardFolderPath(contextMenuFolderPath?: string) {
		let folderPath = "/";

		if (contextMenuFolderPath) {
			folderPath = contextMenuFolderPath;
		} else if (this.settings.createInObsidianAttachmentFolder) {
			folderPath = (this.app.vault as any).getConfig(
				"attachmentFolderPath"
			);
		} else {
			folderPath = this.settings.customFolderForNewFiles;
		}
		const normalized = normalizePath(folderPath);
		if (normalized === ".") return "/";
		return normalized;
	}
}
