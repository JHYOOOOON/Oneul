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
	grid-template-columns: repeat(10, minmax(70px, 1fr));
	border-radius: 3px;
	overflow: hidden;
	${({ theme }) => theme.mediaQuery.tablet} {
		grid-template-columns: repeat(5, minmax(70px, 1fr));
	}
	${({ theme }) => theme.mediaQuery.mobile} {
		grid-template-columns: repeat(2, minmax(70px, 1fr));
	}
`;

const StyledLi = styled.li`
	aspect-ratio: 1/1;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;
