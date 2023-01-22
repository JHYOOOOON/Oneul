import { selector } from "recoil";

import { showToast, toast } from "./atom";
import { toastType } from "./types";

export const withToast = selector<toastType>({
	key: "selector/withToast",
	get: ({ get }) => get(toast),
	set: ({ set }, newValue) => {
		set(showToast, true);
		set(toast, newValue);
	},
});
