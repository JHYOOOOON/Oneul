import Head from "next/head";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { removeAccessToken, RestAPI } from "@/lib";
import { LoginButton } from "@/components/Home";
import { ROUTES } from "@/constants";
import { PageWrapper } from "@/styles";
import { useEffect } from "react";

export default function Home() {
	const router = useRouter();
	useQuery({
		queryKey: "checkValid",
		queryFn: async () => await RestAPI.isTokenValid(),
		retry: 0,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		onSuccess: () => {
			router.push(ROUTES.SEARCH);
		},
		onError: () => {
			removeAccessToken();
		},
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
				<title>Login | Oneul</title>
			</Head>
			<Wrapper>
				<TitleWrapper>
					<Title>새로운 음악을 찾고 있다면?</Title>
					<Description>
						평소 듣는 곡들을 바탕으로 내 취향저격 새로운 곡을 추천 받아보세요.
						<br />새 인생곡을 찾을 수 있는 기회일지도!
					</Description>
					<ButtonWrapper>
						<LoginButton />
					</ButtonWrapper>
				</TitleWrapper>
				<div>
					<Image src="/assets/images/main-image.png" alt="main image" />
				</div>
			</Wrapper>
		</>
	);
}

const Wrapper = styled(PageWrapper)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	flex: 1 0 10px;
	width: 100vw;
	height: 100vh;
	background: radial-gradient(circle at right, rgba(117, 184, 176, 1), rgba(215, 228, 233, 1));
	box-sizing: border-box;
	line-height: 1.2;
`;

const TitleWrapper = styled.div`
	margin-top: -5%;
`;

const slideInFromLeft = keyframes`
	from {
		opacity: 0;
		transform: translateX(-5%);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
`;

const slideInFromRight = keyframes`
	from {
		opacity: 0;
		transform: translateX(5%);
	}
	to {
		opacity: 1;
		transform: translateX(0);
	}
`;

const Title = styled.h1`
	font-size: ${({ theme }) => theme.textSize.sxl}rem;
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	word-break: keep-all;
	opacity: 0;
	animation: 1s ease-in 0s ${slideInFromLeft} forwards;
`;

const Description = styled.p`
	font-size: ${({ theme }) => theme.textSize.base}rem;
	margin-top: 7px;
	word-break: keep-all;
	opacity: 0;
	animation: 1s ease-in 0.3s ${slideInFromLeft} forwards;
`;

const Image = styled.img`
	max-width: 100%;
	width: 700px;
	opacity: 0;
	animation: 1s ease-in 1.5s ${slideInFromRight} forwards;
`;

const ButtonWrapper = styled.div`
	position: relative;
	margin-top: 20px;
	opacity: 0;
	animation: 1s ease-in 1s ${slideInFromLeft} forwards;
`;
