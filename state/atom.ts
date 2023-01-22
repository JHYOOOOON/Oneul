import { atom, atomFamily } from "recoil";
import { START_PAGE } from "../constants";
import { cartItemsType, recommendationType, searchResultsType, toastType } from "./types";

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

export const page = atom<number>({
	key: "atom/page",
	default: START_PAGE,
});

export const toast = atom<toastType>({
	key: "atom/toast",
	default: {
		text: "",
		id: "",
	},
});

export const showToast = atom<boolean>({
	key: "atom/showToast",
	default: false,
});
