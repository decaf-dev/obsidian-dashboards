import { App } from "obsidian";
import { normalize } from "path";

/**
 * Returns the path of the folder where the dashboard file should be created.
 * @param contextMenuFolderPath The path received from the context menu. This can be null if the user did not right click on a folder.
 * @param options Options that determine where the dashboard file should be created.
 */
export const findDashboardFolderPath = (
	app: App,
	contextMenuFolderPath: string | null,
	options: {
		createInObsidianAttachmentFolder: boolean;
		customFolderForNewFiles: string;
	}
) => {
	const { createInObsidianAttachmentFolder, customFolderForNewFiles } =
		options;

	let folderPath = "/";
	if (contextMenuFolderPath) {
		folderPath = contextMenuFolderPath;
	} else if (createInObsidianAttachmentFolder) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		folderPath = (app.vault as any).getConfig("attachmentFolderPath");
	} else {
		folderPath = customFolderForNewFiles;
	}

	const normalized = normalize(folderPath);
	//It is possible that Obsidian will return a "." as the attachment folder path. In that case
	//we want to return the root folder path.
	if (normalized === ".") return "/";
	return normalized;
};
