import { Container } from "src/shared/state/types";

export const updateContainerPosition = (
	arr: Container[],
	id: string,
	newPosition: number
) => {
	//Get the object to be moved
	const obj = arr.find((obj) => obj.id === id);
	if (!obj) return arr;

	//Check if there's an object at the current position
	const objAtNewPosition = arr.find((obj) => obj.position === newPosition);

	// Update the position of the object to be moved
	obj.position = newPosition;

	// If there's no object at the new position, return the array
	if (!objAtNewPosition) return arr;

	return updatePositions(arr, id, newPosition);
};

const updatePositions = (arr: Container[], id: string, newPosition: number) => {
	const arrCopy = [...arr];
	let lastPosition = newPosition;
	let lastId = id;

	// Increment the position of all objects after the new object
	for (let i = 0; i < arrCopy.length; i++) {
		const obj = arrCopy[i];
		const { position } = obj;
		if (position === lastPosition && obj.id !== lastId) {
			const newPosition = lastPosition + 1;
			lastPosition = newPosition;
			lastId = obj.id;
			obj.position = newPosition;
			updatePositions(arrCopy, lastId, newPosition); // Recursive call
		}
	}

	return arrCopy;
};
