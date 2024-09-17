import { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import { useRouter } from "next/router";
import { BsCart, BsMusicNoteBeamed } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa6";

import { ListItem, Loader, Card } from "@/components";
import { useTopArtists, useValidation } from "@/components/hooks";
import { ROUTES } from "@/constants";
import { Button, PageWrapper, WrapperPaddingX } from "@/styles";
import { removeAccessToken, RestAPI } from "@/lib";
import { useQuery } from "react-query";
import { RecommendationType } from "@/state";
import Link from "next/link";

export default function Main() {
	const router = useRouter();
	const [topTracks, setTopTracks] = useState<RecommendationType>([]);
	const { getTopArtists, topArtists } = useTopArtists({ limit: 5 });
	useValidation();

	useQuery({
		queryKey: ["topTracks"],
		queryFn: async () => await RestAPI.topTracks("short_term", 3),
		retry: 0,
		refetchOnWindowFocus: false,
		refetchOnMount: true,
		onSuccess: (res) => {
			const {
				data: { items },
			} = res;
			setTopTracks(items);
		},
		onError: () => {
			removeAccessToken();
			router.push(ROUTES.HOME);
		},
	});

	useEffect(() => {
		getTopArtists();
	}, []);

	return (
		<>
			<Head>
				<title>메인 | Oneul</title>
			</Head>
			<Suspense fallback={<Loader position="center" size="full" />}>
				<StyledPageWrapper>
					<h1 hidden>메인</h1>
					<Wrapper>
						<div>
							<Title>추천 곡 찾기</Title>
							<Description>좋아하는 곡을 기반으로 추천 곡을 받아볼 수 있어요</Description>
							<StyledButton onClick={() => router.push(ROUTES.SEARCH)}>
								<BsCart />곡 담으러 가기
							</StyledButton>
						</div>
						<div>
							<Image src="/assets/images/listening.jpg" alt="" />
							<Source>
								Designed by <Link href="https://www.freepik.com/">Freepik</Link>
							</Source>
						</div>
					</Wrapper>
					<TopTrack>
						<TitleWrapper>
							<div>
								<Title>많이 들은 곡</Title>
								<Description>
									최근에 많이 들은 곡을 확인하고,
									<br />
									이를 바탕으로 추천 곡을 받아볼 수 있어요
								</Description>
								<Inform>※ 예시는 최근 1개월 기준</Inform>
							</div>
							<div>
								<StyledButton onClick={() => router.push(ROUTES.RECENT)}>
									<BsMusicNoteBeamed />
									전체보기
								</StyledButton>
							</div>
						</TitleWrapper>
						<List>
							{topTracks &&
								topTracks.map((track, index) => (
									<ListItem key={track.name}>
										<ListItem.Index>{index + 1}</ListItem.Index>
										<ListItem.SongInform
											album={track.album}
											artists={track.artists}
											name={track.name}
											uri={track.uri}
										/>
										<ListItem.AlbumTitle album={track.album} />
										<ListItem.Duration duration_ms={track.duration_ms} />
									</ListItem>
								))}
							{/* <Gradation /> */}
						</List>
					</TopTrack>
					<TopArtist>
						<TitleWrapper>
							<div>
								<Title>인기 아티스트</Title>
								<Description>최근에 즐겨 찾은 아티스트를 볼 수 있어요</Description>
								<Inform>※ 예시는 최근 1개월 기준</Inform>
							</div>
							<div>
								<StyledButton onClick={() => router.push(ROUTES.ARTIST)}>
									<FaMicrophone />
									전체보기
								</StyledButton>
							</div>
						</TitleWrapper>
						<ArtistList>
							{topArtists.map((artists, index) => (
								<Card key={artists.id} {...artists} rank={index + 1} />
							))}
							<Gradation />
						</ArtistList>
					</TopArtist>
				</StyledPageWrapper>
			</Suspense>
		</>
	);
}

const StyledPageWrapper = styled(PageWrapper)`
	padding: min(20%, 30px) 0;
	${WrapperPaddingX}
	overflow:scroll;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const StyledButton = styled(Button)`
	width: fit-content;
	margin-top: 15px;
	border-radius: 30px;
`;

const Source = styled.p`
	font-size: ${({ theme }) => theme.textSize.xxs}rem;
	text-align: right;
	margin-top: -10px;
	color: ${({ theme }) => theme.color.black200};
`;

const Wrapper = styled.div`
	padding-top: 15px;
	padding-bottom: 25px;
	display: flex;
	justify-content: space-between;
`;

const TopArtist = styled(Wrapper)`
	flex-direction: column;
	gap: 5px;
`;

const TopTrack = styled(Wrapper)`
	flex-direction: column;
	gap: 5px;
	button {
		margin: 0 auto;
		margin-top: 10px;
	}
`;

const TitleWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	> div:last-child {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
`;

const Title = styled.h2`
	font-size: ${({ theme }) => theme.textSize.xxxl}rem;
	font-weight: 700;
	color: ${({ theme }) => theme.color.black100};
	margin-bottom: 8px;
	justify-content: center;
`;

const Description = styled.p`
	font-size: ${({ theme }) => theme.textSize.sm}rem;
	color: ${({ theme }) => theme.color.black200};
	word-break: keep-all;
	line-height: 1.3;
`;

const Inform = styled.p`
	line-height: 1.3;
	font-size: ${({ theme }) => theme.textSize.xxs}rem;
	margin-top: 1px;
	color: ${({ theme }) => theme.color.gray100};
	word-break: keep-all;
`;

const Image = styled.img`
	margin-top: -10px;
	width: 100%;
	max-width: 200px;
`;

const List = styled.ul`
	position: relative;
	margin-top: 7px;
`;

const ArtistList = styled.ul`
	position: relative;
	display: flex;
	gap: 10px;
	overflow: hidden;
	padding: 10px 0;
	li {
		min-width: 130px;
	}
`;

const Gradation = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	width: 50%;
	height: 100%;
	background: linear-gradient(270deg, rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 0) 100%);
`;
