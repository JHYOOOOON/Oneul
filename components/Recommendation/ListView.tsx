import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { withRecommendationItems } from "@/state";
import { ListItem, Maybe } from "..";

type ListViewProps = {
	isActive: boolean;
};

export function ListView({ isActive }: ListViewProps) {
	const recommendationItems = useRecoilValue(withRecommendationItems);

	return (
		<Maybe
			test={isActive}
			truthy={
				<List id="recommendation-list">
					{recommendationItems.map((item, index) => (
						<ListItem
							key={`recommendation_${index}`}
							name={item.name}
							artists={item.artists}
							album={item.album}
							duration_ms={item.duration_ms}
						>
							{<Index>{index + 1}</Index>}
						</ListItem>
					))}
				</List>
			}
			falsy={null}
		/>
	);
}

const List = styled.ul`
	overflow: auto;
`;

const Index = styled.p`
	width: 20px;
	font-family: "Moirai" !important;
	font-size: ${({ theme }) => theme.textSize.lg}rem;
	text-align: center;
`;
