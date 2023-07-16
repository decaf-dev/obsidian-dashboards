import { AppState } from "src/shared/state/types";
import { CURRENT_PLUGIN_VERSION } from "./constants-obsidian";
import { createAppState } from "../shared/state/state-factory";
import { combineObjects } from "./serialize-utils";

/**
 * Deserializes the app state from JSON
 * @param data The data loaded from the dashboard file
 */
export const deserializeAppState = (data: string) => {
	const parsedState = JSON.parse(data);
	parsedState.pluginVersion = CURRENT_PLUGIN_VERSION;

	const defaultState = createAppState();
	const updatedState = combineObjects(defaultState, parsedState) as AppState;
	return updatedState;
};

/**
 * Serializes the app state into JSON
 * @param state The app state
 */
export const serializeAppState = (state: AppState) => {
	return JSON.stringify(state, null, 2);
};
