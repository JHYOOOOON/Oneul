import { selector } from "recoil";

import { searchValue } from "./atom";

export const withSearchValue = selector<string>({
	key: "selector/withSearchValue",
	get: ({ get }) => get(searchValue),
	set: ({ set }, newValue) => set(searchValue, newValue),
});
