import { App, Notice } from "obsidian";
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
export const createDashboardFile = async (
	app: App,
	folderPath: string,
	pluginVersion: string
) => {
	try {
		await createFolderIfNotExists(app, folderPath);

		const state = createAppState(pluginVersion);
		const serialized = serializeAppState(state);
		const filePath = getNewDashboardFilePath(folderPath);
		return await createFile(app, filePath, serialized);
	} catch (err) {
		new Notice("Could not create dashboard file");
		throw err;
	}
};
