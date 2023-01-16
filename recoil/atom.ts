import { atom, atomFamily } from "recoil";
import { cartItemsType, recommendationType, searchResultsType } from "./types";

export const searchResults = atom<searchResultsType>({
	key: "atom/searchResults",
	default: null,
});

export const cartItems = atomFamily<cartItemsType, string>({
	key: "atom/cartItems",
	default: null,
});

export const cartItemIds = atom<string[]>({
	key: "atom/cartItemIds",
	default: [],
});

export const recommendationItems = atom<recommendationType>({
	key: "atom/recommendationItems",
	default: [],
});

export const searchValue = atom<string>({
	key: "atom/searchValue",
	default: "",
});
