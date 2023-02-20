import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { TopButton } from "@/components";
import { Input, Result } from "@/components/Search";
import { Cart } from "@/components/Cart";
import { RestAPI, removeAccessToken } from "@/lib";
import { MAX_ITEM_LEN, ROUTES } from "@/constants";
import { Description, PageWrapper, Title } from "@/styles";
import Head from "next/head";

export default function Search() {
	const router = useRouter();
	useQuery({
		queryKey: "checkValid",
		queryFn: async () => await RestAPI.isTokenValid(),
		retry: 0,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
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
			<PageWrapper>
				<Title>곡 선택하기</Title>
				<Description>
					즐겨듣는 곡을 선택해주세요(최대 {MAX_ITEM_LEN}개).
					<br />
					담은 곡은 하단의 담은 목록에서 확인 가능합니다.
				</Description>
				<Input />
				<Result />
				<Cart />
				<TopButton />
			</PageWrapper>
		</>
	);
}
