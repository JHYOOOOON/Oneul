import React from "react";
import { useRecoilValue } from "recoil";
import Head from "next/head";
import styled from "styled-components";

import { PrevListenView } from "@/components/Recommendation";
import { Description, PageWrapper, Title, WrapperPaddingX } from "@/styles";
import { useValidation } from "@/components/hooks";
import { withPlaylistId } from "@/state/withPlaylistId";

export default function Prelisten() {
	const playlistId = useRecoilValue(withPlaylistId);
	useValidation();

	return (
		<>
			<Head>
				<title>추천 목록 | Oneul</title>
			</Head>
			<PageWrapper>
				<ContentWrapper>
					<TitleWrapper>
						<Title>미리 듣기</Title>
						<StyledDescription>맛보기 스푼으로 추천 곡을 찍먹해봐요 😋</StyledDescription>
					</TitleWrapper>
					<PrevListenView playlistId={playlistId} />
				</ContentWrapper>
			</PageWrapper>
		</>
	);
}

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

const TitleWrapper = styled.div`
	${WrapperPaddingX}
	padding-top: 30px;
	margin-bottom: 10px;
`;

const StyledDescription = styled(Description)`
	margin-bottom: 0;
`;
