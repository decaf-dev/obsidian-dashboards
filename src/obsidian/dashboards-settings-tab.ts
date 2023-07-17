import { PluginSettingTab, App, Setting, setIcon } from "obsidian";
import DashboardsPlugin from "src/main";

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
		attachmentsFolderDesc.createSpan({}, (span) => {
			span.innerHTML =
				// eslint-disable-next-line quotes
				'Create dashboards in the attachments folder defined in the Obsidian settings.<br><br>This can be changed in <span style="color: var(--text-accent);">Files & Links -> Default location for new attachments</span><br><br>Otherwise, the folder location below will be used.';
		});

		const setting = new Setting(containerEl)
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
		const settingContainerEl = setting.controlEl;
		const div = document.createElement("div");
		setIcon(div, "lock");
		settingContainerEl.insertBefore(div, settingContainerEl.firstChild);

		//Folder location
		const defaultLocationDesc = new DocumentFragment();
		defaultLocationDesc.createSpan({}, (span) => {
			span.innerHTML =
				"Where newly created dashboards are placed. Default location is the vault root folder, if not specified.";
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
