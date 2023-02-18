import { useRecoilValue } from "recoil";

import { Maybe } from "@/components";
import { ResultItem } from "@/components/Search";
import { withSearchResults, withSearchValue } from "@/state";
import styled from "styled-components";

const Result = () => {
	const searchValue = useRecoilValue(withSearchValue);
	const searchResult = useRecoilValue(withSearchResults);

	return (
		<div>
			<Maybe
				test={searchResult === null}
				truthy={null}
				falsy={
					<div>
						{searchValue && <SearchTitle>"{searchValue}" 검색 결과</SearchTitle>}
						<Maybe
							test={searchResult?.length === 0}
							truthy={<div>결과 없음</div>}
							falsy={<ResultItem searchResult={searchResult} />}
						/>
					</div>
				}
			/>
		</div>
	);
};

export default Result;

const SearchTitle = styled.h2`
	font-size: ${({ theme }) => theme.textSize.xl}rem;
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	margin-bottom: 12px;
`;
