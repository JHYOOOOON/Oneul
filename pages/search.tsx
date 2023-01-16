import { useEffect } from "react";
import { useRouter } from "next/router";

import Input from "../components/Input";
import ResultSection from "../components/ResultSection";
import SelectedSection from "../components/SelectedSection";
import { isAccessTokenExist } from "../lib";
import { MAX_ITEM_LEN } from "../constants";
import { Description, PageWrapper, Title } from "../styles/CommonStyle";

export default function Search() {
	const router = useRouter();

	useEffect(() => {
		if (isAccessTokenExist() === false) {
			router.push("/");
		}
	}, []);

	return (
		<PageWrapper>
			<Title>곡 선택하기</Title>
			<Description>
				즐겨듣는 곡을 선택해주세요(최대 {MAX_ITEM_LEN}개).
				<br />
				담은 곡은 하단의 담은 목록에서 확인 가능합니다.
			</Description>
			<Input />
			<ResultSection />
			<SelectedSection />
		</PageWrapper>
	);
}
