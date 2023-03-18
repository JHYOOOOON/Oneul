import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { Maybe } from "@/components";
import { withSearchResults, withSearchValue } from "@/state";
const ResultItem = dynamic(() => import("../Search/ResultItem"));
const Loader = dynamic(() => import("../Loader"));

interface IResult {
	isLoading: boolean;
}

const Result = ({ isLoading }: IResult) => {
	const searchValue = useRecoilValue(withSearchValue);
	const searchResult = useRecoilValue(withSearchResults);

	return (
		<Maybe
			test={searchResult === null}
			truthy={null}
			falsy={
				<Wrapper>
					{isLoading && <Loader size="parent" position="top" />}
					{searchValue && <SearchTitle>"{searchValue}" 검색 결과</SearchTitle>}
					<Maybe
						test={searchResult?.length === 0}
						truthy={<div>결과 없음</div>}
						falsy={<ResultItem searchResult={searchResult} />}
					/>
				</Wrapper>
			}
		/>
	);
};

export default Result;

const SearchTitle = styled.h2`
	font-size: ${({ theme }) => theme.textSize.xl}rem;
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	margin-bottom: 12px;
`;

const Wrapper = styled.div`
	position: relative;
	min-height: 500px;
`;
