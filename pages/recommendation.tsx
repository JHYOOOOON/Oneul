import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";

import { Maybe } from "@/components";
import {
	AlbumView,
	CreatePlaylistButton,
	DownloadButton,
	ListView,
	PrevListenButton,
	ViewTypeButton,
} from "@/components/Recommendation";
import { withRecommendationItems } from "@/state";
import { Description, PageWrapper, Title, WrapperPaddingX } from "@/styles";
import { VIEW_TYPE } from "@/types";
import { RECOMMENDATIONS_KEY, ROUTES } from "@/constants";
import { useValidation } from "@/components/hooks";
import { withPlaylistId } from "@/state";

export default function Recommendation() {
	const router = useRouter();
	const [recommendationItems, setRecommendationItems] = useRecoilState(withRecommendationItems);
	const [viewType, setViewType] = useState<VIEW_TYPE>("list");
	const [playlistId, setPlaylistId] = useRecoilState(withPlaylistId);
	useValidation();

	/**
	 * 새로고침 시에도 데이터 유지 위함
	 * 이 url로 바로 타고 들어와도 이전 데이터가 보이긴 함
	 */
	useEffect(() => {
		if (recommendationItems) {
			const rawRecommendationItems = localStorage.getItem(RECOMMENDATIONS_KEY);
			if (rawRecommendationItems) {
				setRecommendationItems(JSON.parse(rawRecommendationItems));
			} else {
				router.push(ROUTES.MAIN);
			}
		}
	}, []);

	const handleCreatedPlaylistId = (id: string) => {
		setPlaylistId(id);
	};

	return (
		<>
			<Head>
				<title>추천 목록 | Oneul</title>
			</Head>
			<PageWrapper>
				<ContentWrapper>
					<TitleWrapper>
						<Title>추천 목록</Title>
						<StyledDescription>당신의 취향에 꼭 맞는 곡을 마주치길 바라요 🍃</StyledDescription>
					</TitleWrapper>
					<Wrapper>
						<ViewTypeButton viewType={viewType} handleViewType={setViewType} />
					</Wrapper>
					<ListWrapper>
						<ListView isActive={viewType === "list"} />
						<AlbumView isActive={viewType === "album"} />
					</ListWrapper>
					<ButtonWrapper>
						<DownloadButton />
						<Maybe
							test={playlistId.length === 0}
							truthy={<CreatePlaylistButton handleCreatedPlaylistId={handleCreatedPlaylistId} />}
							falsy={<PrevListenButton />}
						/>
					</ButtonWrapper>
				</ContentWrapper>
			</PageWrapper>
		</>
	);
}

const Wrapper = styled.div`
	position: absolute;
	bottom: 60px;
	right: 20px;
	z-index: 1;
`;

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

const ListWrapper = styled.div`
	flex: 1;
	overflow: auto;
	${WrapperPaddingX}
	padding-bottom: 30px;
	margin-bottom: 20px;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const TitleWrapper = styled.div`
	${WrapperPaddingX}
	padding-top: 30px;
	margin-bottom: 10px;
`;

const StyledDescription = styled(Description)`
	margin-bottom: 0;
`;

const ButtonWrapper = styled.div`
	width: 100%;
	display: flex;
	background-color: ${({ theme }) => theme.color.primary400};
`;
