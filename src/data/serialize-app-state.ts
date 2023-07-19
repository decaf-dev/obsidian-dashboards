import { AppState } from "src/shared/types";
import { CURRENT_PLUGIN_VERSION } from "./constants";
import { createDefaultAppState } from "./app-state-factory";
import { combineObjects } from "./serialize-utils";

export const deserializeAppState = (data: string) => {
	const parsedState = JSON.parse(data);
	parsedState.pluginVersion = CURRENT_PLUGIN_VERSION;

	//Add new properties to the state here
	const defaultState = createDefaultAppState();
	return combineObjects(defaultState, parsedState) as AppState;
};

export const serializeAppState = (state: AppState) => {
	return JSON.stringify(state, null, 2);
};
