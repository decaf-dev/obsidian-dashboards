import { Notice, Plugin, TFolder } from "obsidian";
import {
	CURRENT_PLUGIN_VERSION,
	DASHBOARDS_VIEW,
	FILE_EXTENSION,
} from "./data/constants";
import DashboardsView from "./obsidian/dashboards-view";

interface DashboardsSettings {
	pluginVersion: string;
}

const DEFAULT_SETTINGS: DashboardsSettings = {
	pluginVersion: CURRENT_PLUGIN_VERSION,
};

export default class DashboardsPlugin extends Plugin {
	settings: DashboardsSettings;

	async onload() {
		await this.loadSettings();

		this.registerView(DASHBOARDS_VIEW, (leaf) => new DashboardsView(leaf));
		this.registerExtensions([FILE_EXTENSION], DASHBOARDS_VIEW);

		this.addRibbonIcon("gauge", "Create new dashboard", async () => {
			await this.newDashboardFile();
		});

		this.registerEvents();
		this.registerCommands();

		// this.addSettingTab(new DashboadsSettingsTab(this.app, this));
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
								await this.newDashboardFile(file.path);
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
				await this.newDashboardFile();
			},
		});
	}

	private newDashboardFile(path?: string) {
		new Notice("Not implemented yet");
	}
}
