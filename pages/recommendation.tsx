import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import styled from "styled-components";

import { BackButton, DownloadButton, List } from "@/components/Recommendation";
import { removeAccessToken, RestAPI } from "@/lib";
import { withRecommendationItems } from "@/state";
import { Description, PageWrapper, Title } from "@/styles";

export default function Recommendation() {
	const router = useRouter();
	const recommendationItems = useRecoilValue(withRecommendationItems);
	useQuery({
		queryKey: "checkValid",
		queryFn: async () => await RestAPI.isTokenValid(),
		retry: 0,
		onSuccess: () => {
			if (recommendationItems.length === 0) {
				router.push("/search");
			}
		},
		onError: () => {
			removeAccessToken();
			router.push("/");
		},
	});

	return (
		<PageWrapper>
			<Wrapper>
				<TitleWrapper>
					<BackButton />
					<Title>추천곡 리스트</Title>
					<StyledDescription>담은 곡들을 바탕으로 추천드리는 20곡입니다.</StyledDescription>
				</TitleWrapper>
				<DownloadButtonWrapper>
					<DownloadButton />
				</DownloadButtonWrapper>
			</Wrapper>
			<List />
		</PageWrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 15px;
`;

const TitleWrapper = styled.div`
	position: relative;
`;

const StyledDescription = styled(Description)`
	margin-bottom: 0;
`;

const DownloadButtonWrapper = styled.div`
	display: flex;
	align-items: flex-end;
`;
