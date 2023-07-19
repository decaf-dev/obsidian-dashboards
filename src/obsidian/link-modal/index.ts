import { App, Modal } from "obsidian";

import "./styles.css";

type SaveCallback = (value: string) => void;

export default class LinkModal extends Modal {
	inputEl?: HTMLInputElement;
	onSave: SaveCallback;

	constructor(app: App, onSave: SaveCallback) {
		super(app);
		this.onSave = onSave;
	}

	onOpen(): void {
		const { contentEl } = this;
		contentEl.addClass("Dashboards__link-modal");
		contentEl.createEl("h2", { text: "Add link" });

		const containerEl = contentEl.createDiv();
		this.renderInputEl(containerEl);
		this.renderButtonEl(containerEl);
	}

	onClose() {
		this.contentEl.empty();
	}

	private renderInputEl(containerEl: HTMLElement) {
		this.inputEl = containerEl.createEl("input", { type: "text" });
		this.inputEl.focus();
	}

	private renderButtonEl(containerEl: HTMLElement) {
		const buttonEl = containerEl.createEl("button", {
			text: "Save",
		});
		buttonEl.addEventListener("click", () => {
			const value = this.inputEl?.value;
			if (value) {
				this.onSave(value);
				this.close();
			}
		});
	}
}
