import { useRecoilState, useSetRecoilState } from "recoil";

import { removeAccessToken, RestAPI } from "../../lib";
import { withSearchResults, withSearchValue } from "../../recoil";

const useSearch = () => {
	const [searchValue, setSearchValue] = useRecoilState(withSearchValue);
	const setSearchResults = useSetRecoilState(withSearchResults);

	const getSearchDatas = async (query: string, page: number = 0) => {
		try {
			const {
				data: {
					tracks: { items },
				},
			} = await RestAPI.search(query, page);
			if (page === 0) {
				setSearchResults(items);
			} else {
				setSearchResults((prev) => (prev === null ? items : [...prev, ...items]));
			}
		} catch (error: any) {
			if (error.response.status === 401) {
				removeAccessToken();
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
