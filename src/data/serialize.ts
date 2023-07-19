import { AppState } from "src/shared/state/types";
import { combineStateObjects } from "./serialize-utils";

/**
 * Deserializes the app state from JSON
 * @param data The data loaded from the dashboard file
 */
export const deserializeAppState = (
	data: string,
	options?: {
		defaultState: AppState;
	}
) => {
	const parsedState = JSON.parse(data);
	const { defaultState } = options ?? {};

	if (defaultState !== undefined) {
		const updatedState = combineStateObjects(
			defaultState,
			parsedState
		) as AppState;
		return updatedState;
	}

	return parsedState;
};

/**
 * Serializes the app state into JSON
 * @param state The app state
 */
export const serializeAppState = (state: AppState) => {
	return JSON.stringify(state, null, 2);
};
