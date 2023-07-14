import { CURRENT_PLUGIN_VERSION } from "./constants";
import {
	AppState,
	Container,
	ContainerType,
	LayoutOptions,
} from "../shared/types";

export const createDefaultAppState = (): AppState => {
	return {
		pluginVersion: CURRENT_PLUGIN_VERSION,
		layout: LayoutOptions.TWO_BY_TWO,
		data: [],
	};
};

export const createContainer = (
	type: ContainerType,
	content: string
): Container => {
	return {
		id: "",
		position: 0,
		type,
		content,
		isVisible: true,
	};
};
