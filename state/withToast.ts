import { selector } from "recoil";

import { showToast, toast } from "./atom";
import { ToastType } from "./types";

export const withToast = selector<ToastType>({
	key: "selector/withToast",
	get: ({ get }) => get(toast),
	set: ({ set }, newValue) => {
		set(showToast, true);
		set(toast, newValue);
	},
});
