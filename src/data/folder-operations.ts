/**
 * Creates a new folder if it does not already exist otherwise returns a promise that resolves immediately
 * @param folderPath The path to the folder
 * @returns
 */
export const createFolderIfNotExists = async (
	folderPath: string
): Promise<void> => {
	if (app.vault.getAbstractFileByPath(folderPath) == null)
		return await app.vault.createFolder(folderPath);
	return Promise.resolve();
};
