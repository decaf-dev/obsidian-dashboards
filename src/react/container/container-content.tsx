import { getMarkdownFromContainerContent } from "src/react/container/render-utils";
import { Container } from "src/shared/types";
import IconButton from "../icon-button/icon-button";
import { useMountState } from "../mount-provider";
import { RenderMarkdown } from "./render-markdown";

interface Props {
	container: Container;
	isCtrlDown: boolean;
	isHovered: boolean;
	numContainersY: number;
	onRemoveClick: () => void;
}

export default function ContainerContent({
	isCtrlDown,
	isHovered,
	container,
	numContainersY,
	onRemoveClick,
}: Props) {
	const leaf = useMountState();

	if (leaf === null)
		throw new Error("Container component must be mounted in a leaf");

	const markdown = getMarkdownFromContainerContent(
		container.type,
		container.content
	);

	return (
		<>
			{isCtrlDown && isHovered && (
				<IconButton
					tooltip="Remove"
					iconId="x"
					onClick={() => onRemoveClick()}
				/>
			)}
			<RenderMarkdown
				leaf={leaf}
				markdown={markdown}
				numContainersY={numContainersY}
			/>
		</>
	);
}
