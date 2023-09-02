import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";

import { LogoutButton, Maybe } from "@/components";
import {
	AlbumView,
	BackButton,
	CreatePlaylistButton,
	DownloadButton,
	ListView,
	PrevListenButton,
	PrevListenView,
	ViewTypeButton,
} from "@/components/Recommendation";
import { withRecommendationItems } from "@/state";
import { Description, PageWrapper, Title } from "@/styles";
import { VIEW_TYPE } from "@/types";
import { RECOMMENDATIONS_KEY, ROUTES } from "@/constants";
import { useValidation } from "@/components/hooks";

export default function Recommendation() {
	const router = useRouter();
	const [recommendationItems, setRecommendationItems] = useRecoilState(withRecommendationItems);
	const [viewType, setViewType] = useState<VIEW_TYPE>("list");
	const [createdPlaylistId, setCreatedPlaylistId] = useState<string>("");
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
					<StyledDescription>담은 곡들을 바탕으로 추천드리는 곡 목록입니다.</StyledDescription>
				</TitleWrapper>
				<Wrapper>
					<LeftButtonWrapper>
						<Maybe
							test={createdPlaylistId.length === 0}
							truthy={
								<CreatePlaylistButton handleCreatedPlaylistId={setCreatedPlaylistId} handleViewType={setViewType} />
							}
							falsy={<PrevListenButton handleViewType={setViewType} isActive={viewType === "prev-listen"} />}
						/>
						{viewType !== "prev-listen" && <DownloadButton />}
					</LeftButtonWrapper>
					<ViewTypeButton viewType={viewType} handleViewType={setViewType} />
				</Wrapper>
				<ListView isActive={viewType === "list"} />
				<AlbumView isActive={viewType === "album"} />
				<PrevListenView isActive={viewType === "prev-listen"} playlistId={createdPlaylistId} />
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

const LeftButtonWrapper = styled.div`
	display: flex;
	gap: 5px;
`;
