import { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";

import { TopButton } from "@/components";
import { Input, Result } from "@/components/Search";
import { Cart } from "@/components/Cart";
import { LogoutButton } from "@/components";
import { RestAPI, removeAccessToken } from "@/lib";
import { MAX_ITEM_LEN, ROUTES } from "@/constants";
import { Description, PageWrapper, Title } from "@/styles";
import { withUserId } from "@/state";
const Loader = dynamic(() => import("../components/Loader"));

export default function Search() {
	const router = useRouter();
	const [isLoadingResult, setIsLoadingResult] = useState(false);
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

	const handleLoadingResult = useCallback((isLoading: boolean) => {
		setIsLoadingResult(isLoading);
	}, []);

	const handleLoadingRecommend = useCallback((isLoading: boolean) => {
		setIsLoadingRecommend(isLoading);
	}, []);

	return (
		<>
			<Head>
				<title>Search | Oneul</title>
			</Head>
			<PageWrapper>
				{isLoadingRecommend && <Loader size="full" position="center" />}
				<LogoutButton />
				<Title>곡 선택하기</Title>
				<Description>
					즐겨듣는 곡을 선택해주세요(최대 {MAX_ITEM_LEN}개).
					<br />
					담은 곡은 하단의 담은 목록에서 확인 가능합니다.
				</Description>
				<Input handleLoading={handleLoadingResult} />
				<Result isLoading={isLoadingResult} />
				<Cart handleLoading={handleLoadingRecommend} />
				<TopButton />
			</PageWrapper>
		</>
	);
}
