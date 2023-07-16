import { splitAtFileExtension } from "./file-utils";

const getFilePathWithIteration = (
	path: string,
	extension: string,
	numExisting: number
) => {
	const numIterations = numExisting > 0 ? " " + numExisting : "";
	const filePathWithIteration = path + numIterations + extension;
	return filePathWithIteration;
};

/**
 * Creates a new file with the specified data. If a file with the same name already exists, it will append a number to the end of the file name
 * @param filePath The path to the file
 * @param data The data to write to the file
 * @param numExisting The number of existing files with the same name
 * @returns
 */
export const createFile = async (
	filePath: string,
	data: string,
	numExisting = 0
): Promise<string> => {
	try {
		const split = splitAtFileExtension(filePath);
		if (split == null)
			throw new SyntaxError("File must include an extension");
		const { path, extension } = split;
		const filePathWithIteration = getFilePathWithIteration(
			path,
			extension,
			numExisting
		);

		await app.vault.create(filePathWithIteration, data);
		return filePathWithIteration;
	} catch (err: unknown) {
		const error = err as Error;

		if (error.message.includes("File already exists")) {
			return createFile(filePath, data, numExisting + 1);
		} else {
			throw err;
		}
	}
};
