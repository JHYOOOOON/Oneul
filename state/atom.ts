import { atom, atomFamily } from "recoil";
import { CartItemsType, IdsType, RecommendationType, SearchResultsType, ToastType } from "./types";

export const searchResults = atom<SearchResultsType>({
	key: "atom/searchResults",
	default: null,
});

export const cartItems = atomFamily<CartItemsType, string>({
	key: "atom/cartItems",
	default: null,
});

export const cartItemIds = atom<IdsType>({
	key: "atom/cartItemIds",
	default: [],
});

export const recommendationItems = atom<RecommendationType>({
	key: "atom/recommendationItems",
	default: [],
});

export const searchValue = atom<string>({
	key: "atom/searchValue",
	default: "",
});

export const toast = atom<ToastType>({
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
