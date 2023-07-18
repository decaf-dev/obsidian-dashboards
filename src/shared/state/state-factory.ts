import { CURRENT_PLUGIN_VERSION } from "../../data/constants-obsidian";
import { AppState, Container, ContainerType, LayoutOptions } from "./types";
import { v4 as uuid } from "uuid";

/**
 * Creates a new app state with the current plugin version
 */
export const createAppState = (): AppState => {
	return {
		pluginVersion: CURRENT_PLUGIN_VERSION,
		layout: LayoutOptions.TWO_BY_TWO,
		data: [],
		showBorders: true,
		showOptionBar: true,
		borderSpacing: "20px",
	};
};

/**
 * Creates a new container
 * @param type The container type
 * @param position The position of the container in the grid
 * @param content The content of the container, which will be rendered as markdown
 */
export const createContainer = (
	type: ContainerType,
	position: number,
	content: string
): Container => {
	return {
		id: uuid(),
		position,
		type,
		content,
	};
};
