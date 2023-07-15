import { App, Modal } from "obsidian";

type SaveCallback = (value: string) => void;

export default class CodeblockModal extends Modal {
	inputEl?: HTMLTextAreaElement;
	onSave: SaveCallback;

	constructor(app: App, onSave: SaveCallback) {
		super(app);
		this.onSave = onSave;
	}

	onOpen(): void {
		const { contentEl } = this;
		contentEl.createEl("h4", { text: "Add codeblock" });

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
		this.inputEl = containerEl.createEl("textarea");
		this.inputEl.style.height = "150px";
		this.inputEl.style.resize = "none";
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
