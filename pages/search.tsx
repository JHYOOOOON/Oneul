import { Suspense, useCallback, useState } from "react";
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

export default function Search() {
	const router = useRouter();
	const [isLoadingRecommend, setIsLoadingRecommend] = useState(false);
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

	const handleLoadingRecommend = useCallback((isLoading: boolean) => {
		setIsLoadingRecommend(isLoading);
	}, []);

	return (
		<>
			<Head>
				<title>Search | Oneul</title>
			</Head>
			<Suspense fallback={<Loader position="center" size="full" />}>
				<PageWrapper>
					{isLoadingRecommend && <Loader size="full" position="center" />}
					<LogoutButton />
					<Title>곡 선택하기</Title>
					<Description>
						즐겨듣는 곡을 선택해주세요(최대 {MAX_ITEM_LEN}개).
						<br />
						담은 곡은 하단의 담은 목록에서 확인 가능합니다.
					</Description>
					<Input />
					<Result />
					<Cart handleLoading={handleLoadingRecommend} />
					<TopButton />
				</PageWrapper>
			</Suspense>
		</>
	);
}
