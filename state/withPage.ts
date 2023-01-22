import { selector } from "recoil";

import { page } from "./atom";

export const withPage = selector<number>({
	key: "selector/withPage",
	get: ({ get }) => get(page),
	set: ({ set }, newValue) => set(page, newValue),
});
