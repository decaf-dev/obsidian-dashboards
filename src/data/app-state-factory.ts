import { CURRENT_PLUGIN_VERSION } from "./constants";
import { AppState, ContainerType, LayoutOptions } from "./types";
import { v4 as uuid } from "uuid";

export const createDefaultAppState = (): AppState => {
	return {
		pluginVersion: CURRENT_PLUGIN_VERSION,
		layout: LayoutOptions.TWO_BY_TWO,
		data: [
			{
				id: uuid(),
				position: 0,
				type: ContainerType.LINK,
				content: "",
				isVisible: true,
			},
			{
				id: uuid(),
				position: 0,
				type: ContainerType.LINK,
				content: "",
				isVisible: true,
			},
			{
				id: uuid(),
				position: 0,
				type: ContainerType.LINK,
				content: "",
				isVisible: true,
			},
			{
				id: uuid(),
				position: 0,
				type: ContainerType.LINK,
				content: "",
				isVisible: true,
			},
		],
	};
};
