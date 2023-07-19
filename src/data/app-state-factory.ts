import { CURRENT_PLUGIN_VERSION } from "./constants";
import {
	AppState,
	Container,
	ContainerType,
	LayoutOptions,
} from "../shared/types";
import { v4 as uuid } from "uuid";

export const createDefaultAppState = (): AppState => {
	return {
		pluginVersion: CURRENT_PLUGIN_VERSION,
		layout: LayoutOptions.TWO_BY_TWO,
		data: [],
		showBorders: true,
	};
};

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
