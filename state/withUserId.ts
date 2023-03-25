import { selector } from "recoil";

import { userId } from "./atom";

export const withUserId = selector<string>({
	key: "selector/withUserId",
	get: ({ get }) => get(userId),
	set: ({ set }, newValue) => {
		set(userId, newValue);
	},
});
