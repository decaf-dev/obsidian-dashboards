import { Notice } from "obsidian";
import { createFile, createFolderIfNotExists } from "./file-operations";
import { serializeAppState } from "./serialize-app-state";
import { getDashboardFilePath } from "./file-utils";
import { createDefaultAppState } from "./app-state-factory";

export const createDashboardFile = async (options?: {
	folderPath?: string;
}) => {
	const { folderPath = "" } = options ?? {};
	try {
		await createFolderIfNotExists(folderPath);

		const state = createDefaultAppState();
		const serialized = serializeAppState(state);
		const filePath = getDashboardFilePath(folderPath);
		return await createFile(filePath, serialized);
	} catch (err) {
		new Notice("Could not create dashboard file");
		throw err;
	}
};
