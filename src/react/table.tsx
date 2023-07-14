import { css } from "@emotion/react";
import Container from "./container";
import { Container as ContainerType } from "src/shared/types";
import { v4 as uuid } from "uuid";

interface Props {
	data: ContainerType[];
	numContainersX: number;
	numContainersY: number;
}

export default function Table({ data, numContainersX, numContainersY }: Props) {
	return (
		<table
			css={css`
				width: 100%;
				height: 100%;
				border-collapse: collapse;
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
								<td key={x}>
									<Container container={container} />
								</td>
							);
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
}
