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
				<StyledUl id="recommendation-list">
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
				</StyledUl>
			}
			falsy={null}
		/>
	);
}

const StyledUl = styled.ul`
	border: 1px solid ${({ theme }) => theme.color.primary400};
	border-radius: 3px;
	overflow: hidden;
`;

const Index = styled.p`
	text-align: center;
	font-size: ${({ theme }) => theme.textSize.sm}rem;
`;
