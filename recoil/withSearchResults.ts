import { selector } from "recoil";
import { searchResults } from "./atom";
import { searchResultsType } from "./types";

const withSearchResults = selector<searchResultsType>({
	key: "selector/withSearchResults",
	get: ({ get }) => get(searchResults),
	set: ({ set }, newValue) => set(searchResults, newValue),
});

export default withSearchResults;
