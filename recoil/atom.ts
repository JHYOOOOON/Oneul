import { atom } from "recoil";
import { searchResultsType } from "./types";

export const searchResults = atom<searchResultsType>({
	key: "atom/searchResults",
	default: null,
});
