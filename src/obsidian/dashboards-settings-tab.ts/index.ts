import { PluginSettingTab, App, Setting } from "obsidian";
import DashboardsPlugin from "src/main";

import "./styles.css";

export default class DashboadsSettingsTab extends PluginSettingTab {
	plugin: DashboardsPlugin;

	constructor(app: App, plugin: DashboardsPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();
		this.renderFileSettings(containerEl);
	}

	private renderFileSettings(containerEl: HTMLElement) {
		new Setting(containerEl).setName("File").setHeading();

		//Attachments folder
		const attachmentsFolderDesc = new DocumentFragment();
		attachmentsFolderDesc.createDiv({
			text: "Create dashboards in the attachments folder defined in the Obsidian settings.",
		});
		attachmentsFolderDesc.createDiv({
			text: "Files & Links -> Default location for new attachments",
			cls: "Dashboards__setting-emphasize",
		});
		attachmentsFolderDesc.createEl("br");
		attachmentsFolderDesc.createDiv({
			text: "Otherwise, the folder location below will be used",
		});

		new Setting(containerEl)
			.setName("Create in attachments folder")
			.setDesc(attachmentsFolderDesc)
			.addToggle((cb) => {
				cb.setValue(
					this.plugin.settings.createInObsidianAttachmentFolder
				).onChange(async (value) => {
					this.plugin.settings.createInObsidianAttachmentFolder =
						value;
					await this.plugin.saveSettings();
					this.display();
				});
			});

		//Folder location
		const defaultLocationDesc = new DocumentFragment();
		defaultLocationDesc.createSpan({
			text: "Where newly created dashboards are placed. Default location is the vault root folder, if not specified.",
		});

		if (this.plugin.settings.createInObsidianAttachmentFolder === false) {
			new Setting(containerEl)
				.setName("Default location for new dashboards")
				.setDesc(defaultLocationDesc)
				.addText((cb) => {
					cb.setValue(
						this.plugin.settings.customFolderForNewFiles
					).onChange(async (value) => {
						this.plugin.settings.customFolderForNewFiles = value;
						await this.plugin.saveSettings();
					});
				});
		}
	}
}
