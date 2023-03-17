import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import styled from "styled-components";

import { BackButton, DownloadButton, List, ViewTypeButton } from "@/components/Recommendation";
import { removeAccessToken, RestAPI } from "@/lib";
import { withRecommendationItems } from "@/state";
import { Description, PageWrapper, Title } from "@/styles";
import { VIEW_TYPE } from "@/types";
import { RECOMMENDATIONS_KEY, ROUTES } from "@/constants";
import LogoutButton from "@/components/LogoutButton";

export default function Recommendation() {
	const router = useRouter();
	const [recommendationItems, setRecommendationItems] = useRecoilState(withRecommendationItems);
	const [viewType, setViewType] = useState<VIEW_TYPE>("list");
	useQuery({
		queryKey: "checkValid",
		queryFn: async () => await RestAPI.isTokenValid(),
		retry: 0,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		onError: () => {
			removeAccessToken();
			router.push(ROUTES.HOME);
		},
	});

	/**
	 * 새로고침 시에도 데이터 유지 위함
	 * 이 url로 바로 타고 들어와도 이전 데이터가 보이긴 함
	 */
	useEffect(() => {
		if (!!recommendationItems) {
			const rawRecommendationItems = localStorage.getItem(RECOMMENDATIONS_KEY);
			if (rawRecommendationItems) {
				setRecommendationItems(JSON.parse(rawRecommendationItems));
			} else {
				router.push(ROUTES.SEARCH);
			}
		}
	}, []);

	return (
		<>
			<Head>
				<title>Recommendation | Oneul</title>
			</Head>
			<PageWrapper>
				<BackButton />
				<LogoutButton />
				<TitleWrapper>
					<Title>추천곡 리스트</Title>
					<StyledDescription>담은 곡들을 바탕으로 추천드리는 20곡입니다.</StyledDescription>
				</TitleWrapper>
				<Wrapper>
					<DownloadButton />
					<ViewTypeButton viewType={viewType} handleViewType={setViewType} />
				</Wrapper>
				<List viewType={viewType} />
			</PageWrapper>
		</>
	);
}

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 10px;
	margin-bottom: 15px;
`;

const TitleWrapper = styled.div`
	position: relative;
`;

const StyledDescription = styled(Description)`
	margin-bottom: 0;
`;
