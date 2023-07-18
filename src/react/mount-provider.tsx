import { WorkspaceLeaf } from "obsidian";
import React from "react";

const MountContext = React.createContext<{
	leaf: WorkspaceLeaf;
	appId: string;
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
	appId: string;
	leaf: WorkspaceLeaf;
	children: React.ReactNode;
}

export default function MountProvider({ appId, leaf, children }: Props) {
	return (
		<MountContext.Provider value={{ appId, leaf }}>
			{children}
		</MountContext.Provider>
	);
}
