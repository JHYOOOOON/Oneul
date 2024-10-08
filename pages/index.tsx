import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styled, { keyframes } from "styled-components";

import { LoginButton } from "@/components/Home";
import { PageWrapper } from "@/styles";
import { useValidation } from "@/components/hooks";
import { ROUTES } from "@/constants";
import Link from "next/link";

export default function Home() {
	const router = useRouter();
	useValidation(() => {
		router.push(ROUTES.MAIN);
	});

	/**
	 * 뒤로/앞으로가기 이동 막음
	 */
	useEffect(() => {
		history.pushState(null, "", router.asPath);
		window.addEventListener("popstate", () => {
			history.pushState(null, "", router.asPath);
		});
	}, []);

	return (
		<>
			<Head>
				<title>로그인 | Oneul</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta
					name="description"
					content="내가 좋아하는 음악을 기반으로 새로운 음악을 추천받아보세요. 스포티파이에서 많이 들은 곡으로도 추천 받을 수 있어요."
				/>
				<meta
					name="keywords"
					content="노래 추천, 음악 추천, 스포티파이, Spotify, 오늘, 취향 노래 추천, 많이 들은 곡, 좋아하는 아티스트"
				/>
				<meta property="og:url" content="https://oneul.vercel.app" />
				<meta property="og:site_name" content="오늘" />
				<meta
					property="og:description"
					content="내가 좋아하는 음악을 기반으로 새로운 음악을 추천받아보세요. 스포티파이에서 많이 들은 곡으로도 추천 받을 수 있어요."
				/>
				<meta property="og:title" content="오늘 | Oneul" />
				<meta property="og:image" content="https://oneul.vercel.app/assets/images/logo.png" />
			</Head>
			<Wrapper>
				<Image src="/assets/images/band.jpg" alt="" />
				<Source>
					Designed by <Link href="https://www.freepik.com/">Freepik</Link>
				</Source>
				<h1 hidden>로그인</h1>
				<Title>오늘,</Title>
				<Description>
					좋아하는 곡을 바탕으로
					<br />
					취향에 맞는 음악을 추천 받아보세요
				</Description>
				<Inform>
					※ <strong>오늘</strong>은 스포티파이 API를 이용한 서비스로, 서비스 이용을 위해 스포티파이 계정이 필요해요
				</Inform>
				<ButtonWrapper>
					<LoginButton />
				</ButtonWrapper>
			</Wrapper>
		</>
	);
}

const Wrapper = styled(PageWrapper)`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	padding: 0 40px;
	padding-top: min(20%, 70px);
	box-sizing: border-box;
	line-height: 1.2;
`;

const slideInFromLeft = keyframes`
	from {
		opacity: 0;
		transform: translateX(-3%);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
`;

const Source = styled.p`
	font-size: ${({ theme }) => theme.textSize.xs}rem;
	text-align: right;
	opacity: 0;
	animation: 1.2s ease-in 0s ${slideInFromLeft} forwards;
	margin-top: 5px;
	margin-bottom: 25px;
	color: ${({ theme }) => theme.color.black200};
`;

const Title = styled.p`
	font-size: ${({ theme }) => theme.textSize.sxl}rem;
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	word-break: keep-all;
	opacity: 0;
	animation: 1.2s ease-in 0.3s ${slideInFromLeft} forwards;
	color: ${({ theme }) => theme.color.black100};
`;

const Description = styled.p`
	font-size: ${({ theme }) => theme.textSize.lg}rem;
	margin-top: 10px;
	word-break: keep-all;
	opacity: 0;
	line-height: 1.3;
	animation: 1.2s ease-in 0.6s ${slideInFromLeft} forwards;
	color: ${({ theme }) => theme.color.black200};
`;

const Inform = styled.p`
	line-height: 1.3;
	font-size: ${({ theme }) => theme.textSize.sm}rem;
	margin-top: 3px;
	opacity: 0;
	animation: 1.2s ease-in 0.6s ${slideInFromLeft} forwards;
	color: ${({ theme }) => theme.color.gray200};
	word-break: keep-all;
	strong {
		font-weight: ${({ theme }) => theme.fontWeight.bold};
	}
`;

const Image = styled.img`
	width: 100%;
	opacity: 0;
	animation: 1.2s ease-in 0s ${slideInFromLeft} forwards;
	margin: 0 auto;
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 25px;
	height: fit-content;
	opacity: 0;
	animation: 1.2s ease-in 1s ${slideInFromLeft} forwards;
`;
