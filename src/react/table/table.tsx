import { css } from "@emotion/react";
import Container from "../container/container";
import { Container as ContainerType } from "src/shared/state/types";

interface Props {
	showBorders: boolean;
	borderSpacing: string;
	data: ContainerType[];
	gridX: number;
	gridY: number;
	onAddContainer: (value: ContainerType) => void;
	onRemoveContainer: (id: string) => void;
}

export default function Table({
	borderSpacing,
	showBorders,
	data,
	gridX,
	gridY,
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
				{Array.from({ length: gridY }).map((_, y) => (
					<tr
						key={y}
						css={css`
							height: ${100 / gridY}%;
						`}
					>
						{Array.from({ length: gridX }).map((_, x) => {
							const position = x + y * gridX;
							const container = data.find(
								(container) => container.position === position
							);
							return (
								<td
									key={x}
									css={css`
										width: ${100 / gridX}%;
										padding: 0;
									`}
								>
									<Container
										showBorders={showBorders}
										container={container}
										position={position}
										gridY={gridY}
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
