import { useCallback, useEffect, useMemo, useRef } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { MAX_ITEM_LEN } from "@/constants";
import { withCartItemIds, SearchResultsType } from "@/state";
import { useSearch } from "@/components/Search/hooks";
import { ResultList } from "@/components/Search";

type ResultType = {
	searchResult: SearchResultsType;
};

export function ResultItem({ searchResult }: ResultType) {
	const cartItemIds = useRecoilValue(withCartItemIds);
	const observeTargetRef = useRef<HTMLLIElement | null>(null);
	const scrollRef = useRef<HTMLUListElement | null>(null);
	const { fetchNextPage, searchValue, isFetchingNextPage } = useSearch();
	const isMoreSelectAvailable = useMemo(() => cartItemIds.length === MAX_ITEM_LEN, [cartItemIds]);

	/* 다음 페이지 데이터 가져오기 위함 */
	useEffect(() => {
		if (!observeTargetRef.current) return;
		const io = new IntersectionObserver((entries, _) => {
			if (entries[0].isIntersecting && isFetchingNextPage === false) {
				fetchNextPage();
			}
		});
		io.observe(observeTargetRef.current);

		if (!scrollRef.current) return;
		scrollRef.current.scrollTop = 0;

		return () => io.disconnect();
	}, [searchValue]);

	const isExist = useCallback((id: string) => cartItemIds.includes(id), [cartItemIds]);

	return (
		<StyledUl ref={scrollRef}>
			{searchResult?.map((item, index) => (
				<ResultList
					key={`searchResult_${index}`}
					id={item.id}
					index={index + 1}
					name={item.name}
					artists={item.artists}
					album={item.album}
					duration_ms={item.duration_ms}
					uri={item.uri}
					isMoreSelectAvailable={isMoreSelectAvailable}
					isExist={isExist}
				/>
			))}
			<li ref={observeTargetRef}></li>
		</StyledUl>
	);
}

const StyledUl = styled.ul`
	flex: 1;
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`;
