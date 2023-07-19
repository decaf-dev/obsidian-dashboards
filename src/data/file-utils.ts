import { EXTENSION_REGEX } from "./constants";

/**
 * Splits the file path into the path and the extension.
 * @param filePath The path to the file, including the filename and extension
 */
export const splitAtFileExtension = (
	filePath: string
): {
	path: string;
	extension: string;
} | null => {
	if (filePath.match(EXTENSION_REGEX)) {
		const periodIndex = filePath.lastIndexOf(".");
		return {
			path: filePath.substring(0, periodIndex),
			extension: filePath.substring(periodIndex),
		};
	}
	return null;
};
