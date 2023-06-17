import { selector } from "recoil";

import { cartItemIds } from "./atom";
import { idsType } from "./types";

export const withCartItemIds = selector<idsType>({
	key: "selector/withCartItemIds",
	get: ({ get }) => get(cartItemIds),
	set: ({ set }, newValue) => set(cartItemIds, newValue),
});
