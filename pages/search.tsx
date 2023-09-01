import { Suspense } from "react";
import { useSetRecoilState } from "recoil";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { Loader, TopButton } from "@/components";
import { Input, Result } from "@/components/Search";
import { Cart } from "@/components/Cart";
import { LogoutButton } from "@/components";
import { RestAPI, removeAccessToken } from "@/lib";
import { MAX_ITEM_LEN, ROUTES } from "@/constants";
import { Description, PageWrapper, Title } from "@/styles";
import { withUserId } from "@/state";
import styled from "styled-components";
import { BackButton } from "@/components/Recommendation";

export default function Search() {
	const router = useRouter();
	const setUserId = useSetRecoilState(withUserId);
	useQuery({
		queryKey: "checkValid",
		queryFn: async () => await RestAPI.isTokenValid(),
		retry: 0,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		onSuccess: (res) => {
			const {
				data: { id },
			} = res;
			setUserId(id);
		},
		onError: () => {
			removeAccessToken();
			router.push(ROUTES.HOME);
		},
	});

	return (
		<>
			<Head>
				<title>Search | Oneul</title>
			</Head>
			<Suspense fallback={<Loader position="center" size="full" />}>
				<PageWrapper>
					<BackButton />
					<LogoutButton />
					<Title>곡 선택하기</Title>
					<Description>
						즐겨듣는 곡을 선택해주세요(최대 {MAX_ITEM_LEN}개).
						<br />
						담은 곡은 하단의 담은 목록에서 확인 가능합니다.
					</Description>
					<Input />
					<Wrapper>
						<Suspense fallback={<Loader position="top" size="parent" />}>
							<Result />
							<Cart />
							<TopButton />
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
