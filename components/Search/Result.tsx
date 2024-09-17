import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import { Maybe } from "@/components";
import { withSearchResults, withSearchValue } from "@/state";
import { NotFound, ResultItem } from ".";
import { useQuery } from "react-query";
import { RestAPI, removeAccessToken } from "@/lib";

export function Result() {
	const searchValue = useRecoilValue(withSearchValue);
	const [searchResult, setSearchResults] = useRecoilState(withSearchResults);
	useQuery({
		queryKey: ["search", searchValue],
		queryFn: async () => await RestAPI.search(searchValue),
		suspense: true,
		retry: 0,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		enabled: searchValue.length > 0,
		onSuccess: (data) => {
			setSearchResults(data.data.tracks.items);
		},
		onError: (error: any) => {
			if (error.response.status === 401) {
				removeAccessToken();
			}
		},
	});

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
	display: flex;
	flex-direction: column;
	height: 100%;
	min-height: 500px;
	overflow: hidden;
`;
