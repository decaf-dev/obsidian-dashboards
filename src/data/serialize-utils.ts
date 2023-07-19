/**
 * Combines app state objects.
 * If a key exists in both objects, the value of the second object will be used.
 * If a key exists in the first object but not the second, the key will be removed.
 * @param defaultState
 * @param loadedState
 */
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const combineStateObjects = (defaultState: any, loadedState: any) => {
	// Create a new object with the properties of obj1
	const result = { ...defaultState };

	for (const key in loadedState) {
		// Skip the plugin version of the loaded state
		// We want to set the plugin version of the default state
		if (key === "pluginVersion") continue;
		result[key] = loadedState[key];
	}

	for (const key in loadedState) {
		if (!(key in defaultState)) {
			// Remove the key if it doesn't exist in the second object
			delete result[key];
		}
	}
	return result;
};
