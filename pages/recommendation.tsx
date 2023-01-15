import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useRouter } from "next/router";

import ListItem from "../components/ListItem";
import { isAccessTokenExist } from "../lib/auth";
import { withRecommendationItems } from "../recoil";

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
		<Wrapper>
			<Title>추천곡 리스트</Title>
			<Description>담은 곡들을 바탕으로 추천드리는 20곡입니다.</Description>
			{recommendationItems.map((item, index) => (
				<ListItem name={item.name} artists={item.artists} album={item.album} duration_ms={item.duration_ms}>
					{<Index>{index}</Index>}
				</ListItem>
			))}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	position: relative;
	padding: 25px 40px;
`;

const Title = styled.h1`
	font-size: ${({ theme }) => theme.textSize.xxl}rem;
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	margin-bottom: 5px;
`;

const Description = styled.p`
	margin-bottom: 15px;
	font-size: ${({ theme }) => theme.textSize.sm}rem;
`;

const Index = styled.p`
	text-align: center;
	font-size: ${({ theme }) => theme.textSize.sm}rem;
`;
