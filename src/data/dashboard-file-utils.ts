import { normalizePath } from "obsidian";
import {
	DASHBOARD_FILE_EXTENSION,
	NEW_DASHBOARD_FILE_NAME,
} from "./constants-file";

/**
 * Returns the default dashboard file name with the file extension.
 * @example
 * Untitled.dashboard
 */
const getNewDashboardFileName = (): string => {
	return NEW_DASHBOARD_FILE_NAME + "." + DASHBOARD_FILE_EXTENSION;
};

/**
 * Returns the path of a new dashboard file in the specified folder.
 * @param folderPath The path to the folder where the dashboard file should be created
 * @example
 * /path/to/folder/Untitled.dashboard
 */
export const getNewDashboardFilePath = (folderPath: string) => {
	const fileName = getNewDashboardFileName();
	return normalizePath(folderPath + "/" + fileName);
};
