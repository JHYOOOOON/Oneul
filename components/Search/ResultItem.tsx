import { useCallback, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { MAX_ITEM_LEN } from "@/constants";
import { withCartItemIds, searchResultsType } from "@/state";
import { useSearch } from "@/components/Search/hooks";
import { Card } from "@/components/Search";

type ResultType = {
	searchResult: searchResultsType;
};

const ResultItem = ({ searchResult }: ResultType) => {
	const cartItemIds = useRecoilValue(withCartItemIds);
	const observeTargetRef = useRef<HTMLLIElement | null>(null);
	const { fetchNextPage, searchValue, isFetchingNextPage } = useSearch();

	/* 다음 페이지 데이터 가져오기 위함 */
	useEffect(() => {
		if (!observeTargetRef.current) return;
		const io = new IntersectionObserver((entries, _) => {
			if (entries[0].isIntersecting && isFetchingNextPage === false) {
				fetchNextPage();
			}
		});
		io.observe(observeTargetRef.current);
		return () => io.disconnect();
	}, [searchValue]);

	const isMoreSelectAvailable = useCallback(() => {
		if (cartItemIds.length === MAX_ITEM_LEN) {
			alert(`곡은 최대 ${MAX_ITEM_LEN}개까지만 담을 수 있습니다`);
			return true;
		}
		return false;
	}, [cartItemIds]);

	const isExist = (id: string) => cartItemIds.includes(id);

	return (
		<StyledUl>
			{searchResult?.map((item, index) => (
				<Card
					key={`searchResult_${index}`}
					id={item.id}
					index={index + 1}
					name={item.name}
					artists={item.artists}
					album={item.album}
					duration_ms={item.duration_ms}
					isMoreSelectAvailable={isMoreSelectAvailable}
					isExist={isExist}
				/>
			))}
			<li ref={observeTargetRef}></li>
		</StyledUl>
	);
};

export default ResultItem;

const StyledUl = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
	row-gap: 25px;
	column-gap: 20px;
	overflow: hidden;
	${({ theme }) => theme.mediaQuery.mobile} {
		grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
	}
`;
