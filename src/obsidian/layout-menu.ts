import { Menu, Point } from "obsidian";

interface Callbacks {
	onToggleBorder: () => void;
}

export const showLayoutMenu = (point: Point, { onToggleBorder }: Callbacks) => {
	const menu = new Menu();

	menu.setUseNativeMenu(false);
	menu.addItem((item) => {
		item.setTitle("Toggle Border");
		item.onClick(() => onToggleBorder());
	});
	menu.showAtPosition(point);
};
