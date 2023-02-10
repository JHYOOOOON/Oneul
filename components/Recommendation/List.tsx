import styled from "styled-components";
import { ListItem } from "@/components";
import { useRecoilValue } from "recoil";

import { withRecommendationItems } from "@/state";
import { VIEW_TYPE } from "@/types";
import Maybe from "../Maybe";

type ListProps = {
	viewType: VIEW_TYPE;
};

function List({ viewType }: ListProps) {
	const recommendationItems = useRecoilValue(withRecommendationItems);

	return (
		<Maybe
			test={viewType === "list"}
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
			falsy={
				<AlbumUl id="recommendation-list">
					{recommendationItems.map((item, index) => (
						<StyledLi key={`recommendation_${index}`}>
							<img src={item.album.images[0].url} alt={item.name} />
						</StyledLi>
					))}
				</AlbumUl>
			}
		/>
	);
}

export default List;

const AlbumUl = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	border-radius: 3px;
	overflow: hidden;
`;

const StyledLi = styled.li`
	&:first-child {
		grid-column-start: 1;
		grid-column-end: 3;
		grid-row-start: 1;
		grid-row-end: 3;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const StyledUl = styled.ul`
	border: 1px solid ${({ theme }) => theme.color.primary400};
	border-radius: 3px;
	overflow: hidden;
`;

const Index = styled.p`
	text-align: center;
	font-size: ${({ theme }) => theme.textSize.sm}rem;
`;
