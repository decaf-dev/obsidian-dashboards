import { Notice } from "obsidian";
import { createFile, createFolder } from "./file-operations";
import { serializeAppState } from "./serialize-app-state";
import { getDefaultDashboardFileName, getFilePath } from "./file-utils";
import { createDefaultAppState } from "./app-state-factory";

export const createDashboardFile = async (options?: {
	folderPath?: string;
}) => {
	const { folderPath = "" } = options ?? {};
	try {
		//Create folder if it doesn't exist
		if (folderPath !== "") {
			if (app.vault.getAbstractFileByPath(folderPath) == null)
				await createFolder(folderPath);
		}

		const fileName = getDefaultDashboardFileName();
		const state = createDefaultAppState();
		const serialized = serializeAppState(state);
		const filePath = getFilePath(folderPath, fileName);

		return await createFile(filePath, serialized);
	} catch (err) {
		new Notice("Could not create dashboard file");
		throw err;
	}
};
