import { App, Modal } from "obsidian";
import { deserializeAppState } from "src/data/serialize";
import { getGridX, getGridY } from "src/react/table/table-utils";
import { AppState, Container } from "src/shared/state/types";
import { updateContainerPosition } from "../modal/array-utils";

import "./styles.css";

interface AssignedRowElement extends HTMLDivElement {
	cleanUp?: () => void;
}

export default class LayoutModal extends Modal {
	inputEl?: HTMLTextAreaElement;
	state: AppState;
	onStateSave: (value: AppState) => void;

	constructor(
		app: App,
		data: string,
		onStateSave: (value: AppState) => void
	) {
		super(app);
		this.onStateSave = onStateSave;

		this.state = deserializeAppState(data);
	}

	onOpen(): void {
		const { contentEl } = this;
		contentEl.addClass("Dashboards__layout-modal");

		const { layout, data } = this.state;
		const gridX = getGridX(layout);
		const gridY = getGridY(layout);
		const gridLength = gridX * gridY;

		contentEl.createEl("h2", { text: "Rearrange Grid" });

		this.renderAssigned(contentEl, data, gridLength);
		this.renderUnassigned(contentEl, data, gridLength);
	}

	private renderAssigned(
		contentEl: HTMLElement,
		data: Container[],
		gridLength: number
	) {
		const dataCopy = [...data];
		const sortedContainers = dataCopy
			.sort((a, b) => a.position - b.position)
			.filter((container) => container.position <= gridLength - 1);
		this.renderTitle(contentEl, "Assigned");

		const containerEl = this.renderRowContainer(contentEl);
		for (let i = 0; i < gridLength; i++) {
			const container = sortedContainers.find(
				(container) => container.position == i
			);
			this.renderRow(
				containerEl,
				i,
				container ? container.id : null,
				container ? container.content : null
			);
		}
	}

	private renderUnassigned(
		contentEl: HTMLElement,
		data: Container[],
		gridLength: number
	) {
		const dataCopy = [...data];
		const sortedContainers = dataCopy
			.sort((a, b) => a.position - b.position)
			.filter((container) => container.position > gridLength - 1);
		this.renderTitle(contentEl, "Unassigned");

		const containerEl = this.renderRowContainer(contentEl);
		for (const container of sortedContainers) {
			this.renderRow(
				containerEl,
				container.position,
				container.id,
				container.content
			);
		}
	}

	private renderTitle(contentEl: HTMLElement, title: string) {
		contentEl.createEl("h4", { text: title });
	}

	private renderRowContainer(contentEl: HTMLElement) {
		const containerEl = contentEl.createDiv();
		return containerEl;
	}

	private renderRow(
		contentEl: HTMLElement,
		position: number,
		id: string | null,
		content: string | null
	) {
		const handleDragStart = (e: DragEvent) => {
			const dataTransfer = e.dataTransfer;
			if (dataTransfer) dataTransfer.setData("text/plain", id!);
		};

		const handleDropOver = (e: DragEvent) => {
			e.preventDefault();
		};

		const handleDrop = (e: DragEvent) => {
			e.preventDefault();
			const eventContainerId = e.dataTransfer?.getData("text");
			if (!eventContainerId) return;
			//We dropped the item in the same place
			if (eventContainerId === id) return;

			const stateCopy = structuredClone(this.state);
			const { data } = stateCopy;
			stateCopy.data = updateContainerPosition(
				data,
				eventContainerId,
				position
			);
			this.onStateSave(stateCopy);
			this.state = stateCopy;
			this.onClose();
			this.onOpen();
		};

		const rowEl: AssignedRowElement = contentEl.createDiv({
			cls: "Dashboards__assigned-row",
		});
		const containerEl = rowEl.createDiv();

		if (id) {
			rowEl.draggable = true;
			rowEl.addClass("Dashboards__draggable");
			rowEl.addEventListener("dragstart", handleDragStart);
		}
		rowEl.addEventListener("dragover", handleDropOver);
		rowEl.addEventListener("drop", handleDrop);
		rowEl.cleanUp = () => {
			rowEl.removeEventListener("dragstart", handleDragStart);
			rowEl.removeEventListener("dragover", handleDropOver);
			rowEl.removeEventListener("drop", handleDrop);
		};

		containerEl.createDiv({ text: position.toString() });
		containerEl.createEl("p", {
			text: content ? content : "Empty",
		});
	}

	onClose() {
		this.contentEl
			.querySelectorAll(".Dashboards__assigned-row")
			.forEach((el: AssignedRowElement) => {
				el.cleanUp?.();
			});
		this.contentEl.empty();
	}
}
