import Head from "next/head";
import { Suspense } from "react";
import styled from "styled-components";

import { Loader, TopButton, Input, Result, Cart } from "@/components";
import { MAX_ITEM_LEN } from "@/constants";
import { Description, PageWrapper, Title, WrapperPaddingX } from "@/styles";
import { useValidation } from "@/components/hooks";

export default function Search() {
	useValidation();

	return (
		<>
			<Head>
				<title>노래 고르기 | Oneul</title>
			</Head>
			<Suspense fallback={<Loader position="center" size="full" />}>
				<PageWrapper>
					<ContentWrapper>
						<Title>노래 고르기</Title>
						<Description>
							즐겨듣는 노래를 담아주세요(최대 {MAX_ITEM_LEN}개).
							<br />
							담은 곡은 하단의 노래주머니에서 확인 가능해요 🧺
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
	flex: 1;
	overflow: hidden;
`;

const ContentWrapper = styled.div`
	padding: 30px 0;
	${WrapperPaddingX}
	display: flex;
	flex-direction: column;
	height: 100%;
`;
