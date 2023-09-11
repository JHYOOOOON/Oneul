import Head from "next/head";
import { useRouter } from "next/router";
import { Suspense, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

import { Loader, BackButton, LogoutButton, ListItem, Maybe } from "@/components";
import { RestAPI, removeAccessToken } from "@/lib";
import { ROUTES } from "@/constants";
import { Button, Description, PageWrapper, Title } from "@/styles";
import { RecommendationType } from "@/state";
import { useSavePlaylist, useToast, useValidation } from "@/components/hooks";

/* TODO 개선 어떻게 할지 생각 필요 */
const TIME_RANGE = {
	ONE_MONTH: "short_term",
	SIX_MONTH: "medium_term",
	ALL: "long_term",
};

type TIME_RANGE_TYPE = "short_term" | "medium_term" | "long_term";

export default function Search() {
	const router = useRouter();
	const [recentList, setRecentList] = useState<RecommendationType>([]);
	const [term, setTerm] = useState<TIME_RANGE_TYPE>("short_term");
	const { addToast } = useToast();
	const { save, playlistUrl, setPlaylistUrl } = useSavePlaylist();
	useValidation();

	useQuery({
		queryKey: ["topTracks", term],
		queryFn: async () => await RestAPI.topTracks(term),
		retry: 0,
		refetchOnWindowFocus: false,
		refetchOnMount: true,
		onSuccess: (res) => {
			const {
				data: { items },
			} = res;
			setRecentList(items);
		},
		onError: () => {
			removeAccessToken();
			router.push(ROUTES.HOME);
		},
	});

	const handleTermChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setTerm(event.target.value as TIME_RANGE_TYPE);
		setPlaylistUrl("");
	};

	const handleCreatePlaylist = async () => {
		try {
			const DATE = {
				[TIME_RANGE.ONE_MONTH]: "1개월",
				[TIME_RANGE.SIX_MONTH]: "6개월",
				[TIME_RANGE.ALL]: "전체기간",
			};
			const uris = recentList.map((item) => item.uri);
			save(`ᕷ₊· ${DATE[term]}동안 많이 들은 곡 | 𝑶𝒏𝒆𝒖𝒍 ·₊ᕷ`, uris);
		} catch (error: any) {
			addToast("알 수 없는 오류가 발생했습니다.");
		}
	};

	return (
		<>
			<Head>
				<title>Recent | Oneul</title>
			</Head>
			<Suspense fallback={<Loader position="center" size="full" />}>
				<PageWrapper>
					<BackButton />
					<LogoutButton />
					<Title>많이 들은 곡</Title>
					<Description>최근 몇 개월 간 많이 들은 곡을 확인할 수 있습니다.</Description>
					<Wrapper>
						<Suspense fallback={<Loader position="top" size="parent" />}>
							<HeaderWrapper>
								<SelectboxWrapper>
									<select defaultValue={TIME_RANGE.ONE_MONTH} onChange={handleTermChange}>
										<option value="short_term">최근 1개월</option>
										<option value="medium_term">최근 6개월</option>
										<option value="long_term">전체기간</option>
									</select>
								</SelectboxWrapper>
								<Maybe
									test={playlistUrl.length > 0}
									truthy={<Button onClick={() => window.open(playlistUrl)}>저장된 플레이리스트로 이동</Button>}
									falsy={<Button onClick={handleCreatePlaylist}>플레이리스트 저장</Button>}
								/>
							</HeaderWrapper>
							<StyledUl>
								{recentList.map((item, index) => (
									<ListItem
										key={`recent_${index}`}
										name={item.name}
										artists={item.artists}
										album={item.album}
										duration_ms={item.duration_ms}
									>
										<Index>{index + 1}</Index>
									</ListItem>
								))}
							</StyledUl>
						</Suspense>
					</Wrapper>
				</PageWrapper>
			</Suspense>
		</>
	);
}

const Wrapper = styled.div`
	position: relative;
`;

const HeaderWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const SelectboxWrapper = styled.div`
	display: flex;
	align-items: center;
`;

const StyledUl = styled.ul`
	margin-top: 10px;
	border: 1px solid ${({ theme }) => theme.color.primary400};
	border-radius: 3px;
	overflow: hidden;
`;

const Index = styled.p`
	text-align: center;
	font-size: ${({ theme }) => theme.textSize.sm}rem;
`;
