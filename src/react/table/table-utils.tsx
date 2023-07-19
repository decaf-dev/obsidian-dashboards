import { LayoutOptions } from "src/shared/types";

export const getNumContainersX = (layout: LayoutOptions) => {
	switch (layout) {
		case LayoutOptions.ONE_BY_TWO:
			return 1;
		case LayoutOptions.ONE_BY_THREE:
			return 1;
		case LayoutOptions.TWO_BY_ONE:
			return 2;
		case LayoutOptions.TWO_BY_TWO:
			return 2;
		case LayoutOptions.TWO_BY_THREE:
			return 2;
		case LayoutOptions.THREE_BY_ONE:
			return 3;
		case LayoutOptions.THREE_BY_TWO:
			return 3;
		case LayoutOptions.THREE_BY_THREE:
			return 3;
		default:
			throw new Error("Unsupported layout option");
	}
};

export const getNumContainersY = (layout: LayoutOptions) => {
	switch (layout) {
		case LayoutOptions.ONE_BY_TWO:
			return 2;
		case LayoutOptions.ONE_BY_THREE:
			return 3;
		case LayoutOptions.TWO_BY_ONE:
			return 1;
		case LayoutOptions.TWO_BY_TWO:
			return 2;
		case LayoutOptions.TWO_BY_THREE:
			return 3;
		case LayoutOptions.THREE_BY_ONE:
			return 1;
		case LayoutOptions.THREE_BY_TWO:
			return 2;
		case LayoutOptions.THREE_BY_THREE:
			return 3;
		default:
			throw new Error("Unsupported layout option");
	}
};
