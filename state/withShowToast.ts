import { selector } from "recoil";

import { showToast } from "./atom";

export const withShowToast = selector<boolean>({
	key: "selector/withShowToast",
	get: ({ get }) => get(showToast),
	set: ({ set }, newValue) => set(showToast, newValue),
});
