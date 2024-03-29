import { useRecoilState, useSetRecoilState } from "recoil";

import { removeAccessToken, RestAPI } from "@/lib";
import { SearchItemType, withSearchResults, withSearchValue } from "@/state";
import { useInfiniteQuery } from "react-query";
import { SEARCH_ITEM_LIMIT } from "@/constants";

export const useSearch = () => {
	const [searchValue, setSearchValue] = useRecoilState(withSearchValue);
	const setSearchResults = useSetRecoilState(withSearchResults);
	const { refetch, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
		["infiniteSearch", searchValue],
		({ pageParam = SEARCH_ITEM_LIMIT }) => RestAPI.search(searchValue, pageParam),
		{
			retry: 0,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			getNextPageParam: (lastPage, _) => {
				return lastPage.data.tracks.offset + SEARCH_ITEM_LIMIT;
			},
			onSuccess: (data) => {
				setSearchResults((prev) => [
					...(prev as SearchItemType[]),
					...data.pages[data.pages.length - 1].data.tracks.items,
				]);
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
