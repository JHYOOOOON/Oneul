import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { Maybe } from "@/components";
import { withSearchResults, withSearchValue } from "@/state";
import { NotFound, ResultItem } from ".";

export function Result() {
	const searchValue = useRecoilValue(withSearchValue);
	const searchResult = useRecoilValue(withSearchResults);

	return (
		<Maybe
			test={searchResult === null}
			truthy={null}
			falsy={
				<Wrapper>
					{searchValue && <SearchTitle>"{searchValue}" 검색 결과</SearchTitle>}
					<Maybe
						test={searchResult?.length === 0}
						truthy={<NotFound />}
						falsy={<ResultItem searchResult={searchResult} />}
					/>
				</Wrapper>
			}
		/>
	);
}

const SearchTitle = styled.h2`
	font-size: ${({ theme }) => theme.textSize.xl}rem;
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	margin-bottom: 12px;
`;

const Wrapper = styled.div`
	position: relative;
	min-height: 500px;
`;
