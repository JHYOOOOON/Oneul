import styled from "styled-components";
import { ListItem } from "@/components";
import { useRecoilValue } from "recoil";

import { withRecommendationItems } from "@/state";

function List() {
	const recommendationItems = useRecoilValue(withRecommendationItems);

	return (
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
	);
}

export default List;

const StyledUl = styled.ul`
	border: 1px solid ${({ theme }) => theme.color.primary400};
	border-radius: 3px;
	overflow: hidden;
`;

const Index = styled.p`
	text-align: center;
	font-size: ${({ theme }) => theme.textSize.sm}rem;
`;
