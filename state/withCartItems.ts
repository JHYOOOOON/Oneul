import { DefaultValue, selectorFamily } from "recoil";

import { cartItemIds, cartItems } from "./atom";
import { CartItemsType } from "./types";

export const withCartItems = selectorFamily<CartItemsType, string>({
	key: "selector/withCartItems",
	get:
		(id) =>
		({ get }) =>
			get(cartItems(id)),
	set:
		(id) =>
		({ set, reset }, newValue) => {
			if (newValue instanceof DefaultValue) {
				reset(cartItems(id));
				set(cartItemIds, (prev) => prev.filter((todoId) => todoId !== id));
				return;
			}
			set(cartItems(id), newValue);
			set(cartItemIds, (prev) => Array.from(new Set([...prev, id])));
		},
});
