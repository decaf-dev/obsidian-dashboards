import { css } from "@emotion/react";
import Container from "../container/container";
import { Container as ContainerType } from "src/shared/state/types";

interface Props {
	showBorders: boolean;
	borderSpacing: string;
	data: ContainerType[];
	numContainersX: number;
	numContainersY: number;
	onAddContainer: (value: ContainerType) => void;
	onRemoveContainer: (id: string) => void;
}

export default function Table({
	borderSpacing,
	showBorders,
	data,
	numContainersX,
	numContainersY,
	onAddContainer,
	onRemoveContainer,
}: Props) {
	return (
		<table
			css={css`
				width: 100%;
				height: 100%;
				border-spacing: ${borderSpacing};
			`}
		>
			<tbody>
				{Array.from({ length: numContainersY }).map((_, y) => (
					<tr
						key={y}
						css={css`
							height: ${100 / numContainersY}%;
						`}
					>
						{Array.from({ length: numContainersX }).map((_, x) => {
							const position = x + y * numContainersX;
							const container = data.find(
								(container) => container.position === position
							);
							return (
								<td
									key={x}
									css={css`
										width: ${100 / numContainersX}%;
										padding: 0;
									`}
								>
									<Container
										showBorders={showBorders}
										container={container}
										position={position}
										numContainersY={numContainersY}
										onAddContainer={onAddContainer}
										onRemoveContainer={onRemoveContainer}
									/>
								</td>
							);
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
}
