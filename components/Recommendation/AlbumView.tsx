import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { withRecommendationItems } from "@/state";
import { Maybe } from "..";

type AlbumViewProps = {
	isActive: boolean;
};

export function AlbumView({ isActive }: AlbumViewProps) {
	const recommendationItems = useRecoilValue(withRecommendationItems);

	return (
		<Maybe
			test={isActive}
			truthy={
				<AlbumUl id="recommendation-list">
					{recommendationItems.map((item, index) => (
						<StyledLi key={`recommendation_${index}`}>
							<img src={item.album.images[1].url} alt={item.name} />
						</StyledLi>
					))}
				</AlbumUl>
			}
			falsy={null}
		/>
	);
}

const AlbumUl = styled.ul`
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	grid-template-rows: auto 1fr;
	overflow: hidden;
	background-color: ${({ theme }) => theme.color.primary400};
`;

const StyledLi = styled.li`
	&:first-child {
		grid-column: 1 / span 5; /* 3개의 열 차지 */
		grid-row: 1 / span 4; /* 3개의 행 차지 */
	}

	&:nth-child(2) {
		grid-column: 6 / span 3;
		grid-row: 1 / span 2;
	}

	&:nth-child(3) {
		grid-column: 6 / span 2;
		grid-row: 3 / span 2;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;
