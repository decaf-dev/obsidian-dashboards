export interface Container {
	id: string;
	type: ContainerType;
	position: number;
	content: string;
}

export enum ContainerType {
	LINK = "link",
	CODE_BLOCK = "code-block",
	FILE = "file",
}

export enum LayoutOptions {
	ONE_BY_TWO = "1x2",
	ONE_BY_THREE = "1x3",
	TWO_BY_ONE = "2x1",
	TWO_BY_TWO = "2x2",
	TWO_BY_THREE = "2x3",
	THREE_BY_ONE = "3x1",
	THREE_BY_TWO = "3x2",
	THREE_BY_THREE = "3x3",
}

export interface AppState {
	pluginVersion: string;
	showBorders: boolean;
	showOptionBar: boolean;
	layout: LayoutOptions;
	data: Container[];
	borderSpacing: string;
}
