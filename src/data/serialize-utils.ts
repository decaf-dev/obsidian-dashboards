/**
 * Combines two objects.
 * If a key exists in both objects, the value of the second object will be used.
 * If a key exists in the first object but not the second, the key will be removed.
 * @param obj1
 * @param obj2
 */
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const combineObjects = (defaultObj: any, newObj: any) => {
	// Create a new object with the properties of obj1
	const result = { ...defaultObj };

	for (const key in newObj) {
		result[key] = newObj[key];
	}

	for (const key in newObj) {
		if (!(key in defaultObj)) {
			// Remove the key if it doesn't exist in the second object
			delete result[key];
		}
	}
	return result;
};
