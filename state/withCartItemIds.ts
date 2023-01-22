import { selector } from "recoil";

import { cartItemIds } from "./atom";

export const withCartItemIds = selector<string[]>({
	key: "selector/withCartItemIds",
	get: ({ get }) => get(cartItemIds),
	set: ({ set }, newValue) => set(cartItemIds, newValue),
});
