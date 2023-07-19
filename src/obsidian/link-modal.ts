import { App, Modal } from "obsidian";

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
		contentEl.createEl("h4", { text: "Add link" });

		const containerEl = contentEl.createDiv();
		containerEl.style.display = "flex";
		containerEl.style.flexDirection = "column";
		containerEl.style.gap = "var(--size-4-4)";

		this.renderInputEl(containerEl);
		this.renderButtonEl(containerEl);
	}

	onClose() {
		this.contentEl.empty();
	}

	private renderInputEl(containerEl: HTMLElement) {
		this.inputEl = containerEl.createEl("input");
		this.inputEl.type = "text";
		this.inputEl.style.padding = "var(--size-2-2) var(--size-4-2)";
		this.inputEl.style.fontSize = "16px";
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
