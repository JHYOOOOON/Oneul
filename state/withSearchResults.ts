import { selector } from "recoil";

import { searchResults } from "./atom";
import { SearchResultsType } from "./types";

export const withSearchResults = selector<SearchResultsType>({
	key: "selector/withSearchResults",
	get: ({ get }) => get(searchResults),
	set: ({ set }, newValue) => set(searchResults, newValue),
});
