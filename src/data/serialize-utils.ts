/**
 * Combines two objects.
 * If a key exists in both objects, the value of the second object will be used.
 * If a key exists in the first object but not the second, the key will be removed.
 * @param obj1
 * @param obj2
 */
export const combineObjects = (obj1: any, obj2: any) => {
	// Create a new object with the properties of obj1
	const result = { ...obj1 };

	for (const key in obj1) {
		if (!obj2.hasOwnProperty(key)) {
			// Remove the key if it doesn't exist in the second object
			delete result[key];
		}
	}

	for (const key in obj2) {
		result[key] = obj2[key];
	}
	return result;
};
