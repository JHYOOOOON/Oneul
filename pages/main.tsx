import { Suspense, useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import { useRouter } from "next/router";
import { BsCart } from "react-icons/bs";
import { BsMusicNoteBeamed } from "react-icons/bs";

import { ListItem, Loader } from "@/components";
import { useValidation } from "@/components/hooks";
import { ROUTES } from "@/constants";
import { Button, PageWrapper } from "@/styles";
import { removeAccessToken, RestAPI } from "@/lib";
import { useQuery } from "react-query";
import { RecommendationType } from "@/state";
import Link from "next/link";

export default function Main() {
	const router = useRouter();
	const [topTracks, setTopTracks] = useState<RecommendationType>([]);
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
								<BsCart />
								노래 담으러 가기
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
						<Title>많이 들은 곡</Title>
						<Description>
							최근에 많이 들은 곡을 확인하고,
							<br />
							이를 바탕으로 추천 곡을 받아볼 수 있어요
						</Description>
						<Inform>※ 예시는 최근 1개월 기준 Top 3</Inform>
						<List>
							{topTracks &&
								topTracks.map((track, index) => (
									<ListItem key={track.name}>
										<ListItem.Index>{index + 1}</ListItem.Index>
										<ListItem.SongInform
											album={track.album}
											artists={track.artists}
											name={track.name}
											external_urls={track.external_urls}
										/>
										<ListItem.AlbumTitle album={track.album} />
										<ListItem.Duration duration_ms={track.duration_ms} />
									</ListItem>
								))}
							{/* <Gradation /> */}
						</List>
						<StyledButton onClick={() => router.push(ROUTES.RECENT)}>
							<BsMusicNoteBeamed />
							전체보기
						</StyledButton>
					</TopTrack>
				</StyledPageWrapper>
			</Suspense>
		</>
	);
}

const StyledPageWrapper = styled(PageWrapper)`
	padding-top: min(20%, 30px);
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
	padding: 20px 10px;
	display: flex;
	justify-content: space-between;
`;

const TopTrack = styled(Wrapper)`
	flex-direction: column;
	gap: 5px;
	button {
		margin: 0 auto;
		margin-top: 10px;
	}
`;

const Title = styled.h2`
	font-size: ${({ theme }) => theme.textSize.xxxl}rem;
	font-weight: 700;
	color: ${({ theme }) => theme.color.black100};
	margin-bottom: 6px;
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

const Gradation = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 40%;
	background: linear-gradient(0deg, rgba(255, 255, 255, 0.9) 0%, rgba(0, 0, 0, 0) 100%);
`;
