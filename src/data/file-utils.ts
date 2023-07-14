import {
	DASHBOARD_FILE_EXTENSION,
	DEFAULT_DASHBOARD_FILE_NAME,
	EXTENSION_REGEX,
} from "./constants";

export const splitFileExtension = (
	filePath: string
): [string, string] | null => {
	if (filePath.match(EXTENSION_REGEX)) {
		const periodIndex = filePath.lastIndexOf(".");
		return [
			filePath.substring(0, periodIndex),
			filePath.substring(periodIndex),
		];
	}
	return null;
};

export const getDefaultDashboardFileName = (): string => {
	return `${DEFAULT_DASHBOARD_FILE_NAME}.${DASHBOARD_FILE_EXTENSION}`;
};

export const getFilePath = (folderPath: string, fileName: string) => {
	if (folderPath === "") return fileName;
	return folderPath + "/" + fileName;
};
