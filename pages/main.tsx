import { Suspense } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { Loader, Tooltip } from "@/components";
import { LogoutButton } from "@/components";
import { ROUTES } from "@/constants";
import { Button, PageWrapper } from "@/styles";
import styled from "styled-components";

export default function Main() {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Main | Oneul</title>
			</Head>
			<Suspense fallback={<Loader position="center" size="full" />}>
				<PageWrapper>
					<LogoutButton />
					<Wrapper>
						<Tooltip contents={<p>평소 즐겨듣는 곡을 담은 후, 해당 목록으로 추천곡을 받아볼 수 있습니다.</p>}>
							<StyledButton onClick={() => router.push(ROUTES.SEARCH)}>추천곡 찾기</StyledButton>
						</Tooltip>
						<Tooltip
							contents={<p>최근 몇 개월 내에 많이 들은 곡을 확인 후, 이를 바탕으로 추천곡을 받아볼 수 있습니다.</p>}
						>
							<StyledButton onClick={() => router.push(ROUTES.RECENT)}>많이 들은 곡</StyledButton>
						</Tooltip>
					</Wrapper>
				</PageWrapper>
			</Suspense>
		</>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.textSize.base}rem;
	margin-top: 10vh;
`;

const StyledButton = styled(Button)`
	width: 70%;
	max-width: 500px;
	min-width: 250px;
	padding: 20px 25px;
	font-size: ${({ theme }) => theme.textSize.xl}rem;
`;
