export const combineObjects = (obj1: any, obj2: any) => {
	const result = { ...obj1 }; // Create a new object with the properties of obj1

	for (const key in obj2) {
		if (obj2.hasOwnProperty(key)) {
			if (result.hasOwnProperty(key)) {
				// Override the value if the key exists in both objects
				result[key] = obj2[key];
			} else {
				// Remove the key if it doesn't exist in the first object
				delete result[key];
			}
		}
	}

	return result;
};
