import { useRecoilState, useSetRecoilState } from "recoil";

import { removeAccessToken, search } from "../../lib";
import { withSearchResults, withSearchValue } from "../../recoil";

const SEARCH_ITEM_LIMIT = 20;

const useSearch = () => {
	const [searchValue, setSearchValue] = useRecoilState(withSearchValue);
	const setSearchResults = useSetRecoilState(withSearchResults);

	const getSearchDatas = async (query: string, page: number = 0) => {
		try {
			const {
				data: {
					tracks: { items },
				},
			} = await search(query, page * SEARCH_ITEM_LIMIT);
			if (page === 0) {
				setSearchResults(items);
			} else {
				setSearchResults((prev) => (prev === null ? items : [...prev, ...items]));
			}
		} catch (error: any) {
			if (error.response.status === 401) {
				// removeAccessToken();
			}
		}
	};

	return {
		searchValue,
		setSearchValue,
		getSearchDatas,
	};
};

export default useSearch;
