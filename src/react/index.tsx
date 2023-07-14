import React from "react";
import { AppState } from "src/data/types";

interface Props {
	initialState: AppState;
	onStateChange: (state: AppState) => void;
}

export default function App({ initialState, onStateChange }: Props) {
	const [state, setState] = React.useState(initialState);

	React.useEffect(() => {
		onStateChange(state);
	}, [state]);

	return <div>{state.pluginVersion}</div>;
}
