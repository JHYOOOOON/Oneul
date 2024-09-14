import Head from "next/head";
import { Suspense } from "react";
import styled from "styled-components";

import { Loader, TopButton, Input, Result, Cart } from "@/components";
import { MAX_ITEM_LEN } from "@/constants";
import { Description, PageWrapper, Title } from "@/styles";
import { useValidation } from "@/components/hooks";

export default function Search() {
	useValidation();

	return (
		<>
			<Head>
				<title>Search | Oneul</title>
			</Head>
			<Suspense fallback={<Loader position="center" size="full" />}>
				<PageWrapper>
					<ContentWrapper>
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
					</ContentWrapper>
				</PageWrapper>
			</Suspense>
		</>
	);
}

const Wrapper = styled.div`
	position: relative;
	flex: 1;
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;
