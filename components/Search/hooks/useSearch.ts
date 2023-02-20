import { useRecoilState, useSetRecoilState } from "recoil";

import { removeAccessToken, RestAPI } from "@/lib";
import { searchItemType, withSearchResults, withSearchValue } from "@/state";
import { useInfiniteQuery } from "react-query";
import { SEARCH_ITEM_LIMIT } from "@/constants";

const useSearch = () => {
	const [searchValue, setSearchValue] = useRecoilState(withSearchValue);
	const setSearchResults = useSetRecoilState(withSearchResults);
	const { refetch, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
		["search", searchValue],
		({ pageParam = 0 }) => RestAPI.search(searchValue, pageParam),
		{
			retry: 0,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			getNextPageParam: (lastPage, _) => {
				return lastPage.data.tracks.offset + SEARCH_ITEM_LIMIT;
			},
			onSuccess: (data) => {
				if (data.pageParams.length === 1) {
					setSearchResults(data.pages[0].data.tracks.items);
				} else {
					setSearchResults((prev) => [
						...(prev as searchItemType[]),
						...data.pages[data.pages.length - 1].data.tracks.items,
					]);
				}
			},
			onError: (error: any) => {
				if (error.response.status === 401) {
					removeAccessToken();
				}
			},
		}
	);

	return {
		searchValue,
		setSearchValue,
		getSearchDatas: refetch,
		fetchNextPage,
		isFetchingNextPage,
	};
};

export default useSearch;
