import { App, WorkspaceLeaf } from "obsidian";
import React from "react";

const MountContext = React.createContext<{
	app: App;
	leaf: WorkspaceLeaf;
	reactAppId: string;
} | null>(null);

export const useMountState = () => {
	const value = React.useContext(MountContext);
	if (value === null) {
		throw new Error(
			"useMountState() called without a <MountProvider /> in the tree."
		);
	}

	return value;
};

interface Props {
	app: App;
	reactAppId: string;
	leaf: WorkspaceLeaf;
	children: React.ReactNode;
}

export default function MountProvider({
	reactAppId,
	leaf,
	app,
	children,
}: Props) {
	return (
		<MountContext.Provider value={{ reactAppId, leaf, app }}>
			{children}
		</MountContext.Provider>
	);
}
