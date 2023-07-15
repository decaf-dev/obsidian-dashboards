import { WorkspaceLeaf } from "obsidian";
import React from "react";

const MountContext = React.createContext<WorkspaceLeaf | null>(null);

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
	leaf: WorkspaceLeaf;
	children: React.ReactNode;
}

export default function MountProvider({ leaf, children }: Props) {
	return (
		<MountContext.Provider value={leaf}>{children}</MountContext.Provider>
	);
}
