import { selector } from "recoil";

import { cartItemIds } from "./atom";
import { IdsType } from "./types";

export const withCartItemIds = selector<IdsType>({
	key: "selector/withCartItemIds",
	get: ({ get }) => get(cartItemIds),
	set: ({ set }, newValue) => set(cartItemIds, newValue),
});
