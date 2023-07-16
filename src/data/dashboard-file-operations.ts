import { Notice } from "obsidian";
import { createFile } from "./file-operations";
import { createFolderIfNotExists } from "./folder-operations";
import { serializeAppState } from "./serialize";
import { createAppState } from "../shared/state/state-factory";
import { getNewDashboardFilePath } from "./dashboard-file-utils";

/**
 * Creates a new dashboard file in the specified folder
 * @param folderPath The path to the folder where the dashboard file should be created
 * @returns
 */
export const createDashboardFile = async (folderPath: string) => {
	try {
		await createFolderIfNotExists(folderPath);

		const state = createAppState();
		const serialized = serializeAppState(state);
		const filePath = getNewDashboardFilePath(folderPath);
		return await createFile(filePath, serialized);
	} catch (err) {
		new Notice("Could not create dashboard file");
		throw err;
	}
};
