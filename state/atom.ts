import { atom, atomFamily } from "recoil";
import { cartItemsType, idsType, recommendationType, searchResultsType, toastType } from "./types";

export const searchResults = atom<searchResultsType>({
	key: "atom/searchResults",
	default: null,
});

export const cartItems = atomFamily<cartItemsType, string>({
	key: "atom/cartItems",
	default: null,
});

export const cartItemIds = atom<idsType>({
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

export const toast = atom<toastType>({
	key: "atom/toast",
	default: [],
});

export const showToast = atom<boolean>({
	key: "atom/showToast",
	default: false,
});

export const userId = atom<string>({
	key: "atom/userId",
	default: "",
});
