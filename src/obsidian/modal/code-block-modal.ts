import { App, Modal } from "obsidian";

import "./code-block-modal.css";

type SaveCallback = (value: string) => void;

export default class CodeBlockModal extends Modal {
	inputEl?: HTMLTextAreaElement;
	onSave: SaveCallback;

	constructor(app: App, onSave: SaveCallback) {
		super(app);
		this.onSave = onSave;
	}

	onOpen(): void {
		const { contentEl } = this;
		contentEl.addClass("Dashboards__code-block-modal");
		contentEl.createEl("h2", { text: "Add code block" });

		const containerEl = contentEl.createDiv();

		this.renderInputEl(containerEl);
		this.renderButtonEl(containerEl);
	}

	onClose() {
		this.contentEl.empty();
	}

	private renderInputEl(containerEl: HTMLElement) {
		this.inputEl = containerEl.createEl("textarea");
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
