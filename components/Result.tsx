import { useCallback, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { ResultItem } from ".";
import { MAX_ITEM_LEN } from "../constants";
import { withCartItemIds, withPage } from "../recoil";
import { searchResultsType } from "../recoil/types";
import { useSearch } from "./hooks";

type ResultType = {
	searchResult: searchResultsType;
};

const Result = ({ searchResult }: ResultType) => {
	const setPage = useSetRecoilState(withPage);
	const cartItemIds = useRecoilValue(withCartItemIds);
	const observeTargetRef = useRef<HTMLLIElement | null>(null);
	const { getSearchDatas, searchValue } = useSearch();

	/* 다음 페이지 데이터 가져오기 위함 */
	useEffect(() => {
		if (!observeTargetRef.current) return;
		const io = new IntersectionObserver((entries, _) => {
			if (entries[0].isIntersecting) {
				setPage((prev) => {
					getNextSearchResult(prev);
					return prev + 1;
				});
			}
		});
		io.observe(observeTargetRef.current);
		return () => io.disconnect();
	}, [searchValue]);

	const getNextSearchResult = (page: number) => getSearchDatas(searchValue, page);

	const isMoreSelectAvailable = useCallback(() => {
		if (cartItemIds.length === MAX_ITEM_LEN) {
			alert(`곡은 최대 ${MAX_ITEM_LEN}개까지만 담을 수 있습니다`);
			return true;
		}
		return false;
	}, [cartItemIds]);

	return (
		<StyledUl>
			{searchResult?.map((item, index) => (
				<ResultItem
					key={`searchResult_${index}`}
					id={item.id}
					index={index + 1}
					name={item.name}
					artists={item.artists}
					album={item.album}
					duration_ms={item.duration_ms}
					isMoreSelectAvailable={isMoreSelectAvailable}
				/>
			))}
			<li ref={observeTargetRef}></li>
		</StyledUl>
	);
};

export default Result;

const StyledUl = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fill, 180px);
	row-gap: 15px;
	column-gap: 20px;
	overflow: hidden;
`;
