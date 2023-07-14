import { AppState } from "src/data/types";
import { CURRENT_PLUGIN_VERSION } from "./constants";

export const deserializeAppState = (data: string) => {
	const parsedState = JSON.parse(data);
	parsedState.pluginVersion = CURRENT_PLUGIN_VERSION;
	return parsedState;
};

export const serializeAppState = (state: AppState) => {
	return JSON.stringify(state, null, 2);
};
