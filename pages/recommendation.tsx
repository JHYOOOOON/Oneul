import { useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import styled from "styled-components";

import { BackButton, DownloadButton, List, ViewTypeButton } from "@/components/Recommendation";
import { removeAccessToken, RestAPI } from "@/lib";
import { withRecommendationItems } from "@/state";
import { Description, PageWrapper, Title } from "@/styles";
import { VIEW_TYPE } from "@/types";
import { ROUTES } from "@/constants";

export default function Recommendation() {
	const router = useRouter();
	const recommendationItems = useRecoilValue(withRecommendationItems);
	const [viewType, setViewType] = useState<VIEW_TYPE>("list");
	useQuery({
		queryKey: "checkValid",
		queryFn: async () => await RestAPI.isTokenValid(),
		retry: 0,
		onSuccess: () => {
			if (recommendationItems.length === 0) {
				router.push(ROUTES.SEARCH);
			}
		},
		onError: () => {
			removeAccessToken();
			router.push(ROUTES.HOME);
		},
	});

	return (
		<PageWrapper>
			<TitleWrapper>
				<BackButton />
				<Title>추천곡 리스트</Title>
				<StyledDescription>담은 곡들을 바탕으로 추천드리는 20곡입니다.</StyledDescription>
			</TitleWrapper>
			<Wrapper>
				<DownloadButton />
				<ViewTypeButton viewType={viewType} handleViewType={setViewType} />
			</Wrapper>
			<List viewType={viewType} />
		</PageWrapper>
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
