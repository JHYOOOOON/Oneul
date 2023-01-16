import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { ResultItem } from ".";
import { MAX_ITEM_LEN, START_PAGE } from "../constants";
import { withCartItemIds } from "../recoil";
import { searchResultsType } from "../recoil/types";
import { useSearch } from "./hooks";

type ResultType = {
	searchResult: searchResultsType;
};

const Result = ({ searchResult }: ResultType) => {
	const [page, setPage] = useState(START_PAGE);
	const cartItemIds = useRecoilValue(withCartItemIds);
	const observeTargetRef = useRef<HTMLLIElement | null>(null);
	const { getSearchDatas, searchValue } = useSearch();

	/* 다음 페이지 데이터 가져오기 위함 */
	useEffect(() => {
		if (!observeTargetRef.current) return;
		const io = new IntersectionObserver((entries, _) => {
			if (entries[0].isIntersecting) {
				getNextSearchResult();
			}
		});
		io.observe(observeTargetRef.current);
		return () => io.disconnect();
	}, []);

	/* 검색어 변경되면 시작페이지 값 초기화 */
	useEffect(() => {
		setPage(START_PAGE);
	}, [searchValue]);

	const getNextSearchResult = () => {
		getSearchDatas(searchValue, page);
		setPage((prev) => prev + 1);
	};

	const isMoreSelectAvailable = () => {
		if (cartItemIds.length === MAX_ITEM_LEN) {
			alert(`곡은 최대 ${MAX_ITEM_LEN}개까지만 담을 수 있습니다`);
			return true;
		}
		return false;
	};

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
