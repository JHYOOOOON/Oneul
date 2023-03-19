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
							<img src={item.album.images[1].url} alt={item.name} />
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
