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
						<ListItem key={`recommendation_${index}`}>
							<ListItem.Index>{index + 1}</ListItem.Index>
							<ListItem.SongInform album={item.album} name={item.name} artists={item.artists} />
							<ListItem.AlbumTitle album={item.album} />
							<ListItem.Duration duration_ms={item.duration_ms} />
						</ListItem>
					))}
				</List>
			}
			falsy={null}
		/>
	);
}

const List = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

const Index = styled.p`
	width: 20px;
	font-family: "Moirai" !important;
	font-size: ${({ theme }) => theme.textSize.lg}rem;
	text-align: center;
`;
