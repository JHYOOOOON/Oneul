import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useRouter } from "next/router";

import { ListItem } from "../components";
import { isAccessTokenExist } from "../lib";
import { withRecommendationItems } from "../recoil";
import { Description, PageWrapper, Title } from "../styles/CommonStyle";

export default function Recommendation() {
	const router = useRouter();
	const recommendationItems = useRecoilValue(withRecommendationItems);

	useEffect(() => {
		if (isAccessTokenExist() === false) {
			router.push("/");
		}
		if (recommendationItems.length === 0) {
			router.push("/search");
		}
	}, []);

	return (
		<PageWrapper>
			<Title>추천곡 리스트</Title>
			<Description>담은 곡들을 바탕으로 추천드리는 20곡입니다.</Description>
			{recommendationItems.map((item, index) => (
				<ListItem name={item.name} artists={item.artists} album={item.album} duration_ms={item.duration_ms}>
					{<Index>{index}</Index>}
				</ListItem>
			))}
		</PageWrapper>
	);
}

const Index = styled.p`
	text-align: center;
	font-size: ${({ theme }) => theme.textSize.sm}rem;
`;
