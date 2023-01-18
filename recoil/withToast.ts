import { selector } from "recoil";

import { showToast, toast } from "./atom";

export const withToast = selector<string>({
	key: "selector/withToast",
	get: ({ get }) => get(toast),
	set: ({ set }, newValue) => {
		set(showToast, true);
		set(toast, newValue);
	},
});
