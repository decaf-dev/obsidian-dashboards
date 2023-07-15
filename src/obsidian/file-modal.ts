import { App, FuzzySuggestModal, TFile } from "obsidian";

type SaveCallback = (value: TFile) => void;

export default class FileModal extends FuzzySuggestModal<TFile> {
	onSaveCallback: SaveCallback;

	constructor(app: App, onSaveCallback: SaveCallback) {
		super(app);
		this.onSaveCallback = onSaveCallback;
	}

	onOpen(): void {}

	onClose() {
		this.contentEl.empty();
	}

	getItems(): TFile[] {
		return app.vault.getFiles();
	}
	getItemText(item: TFile): string {
		return item.name;
	}
	onChooseItem(item: TFile, evt: MouseEvent | KeyboardEvent): void {
		this.onSaveCallback(item);
		this.close();
	}
}
