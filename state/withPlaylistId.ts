import { selector } from "recoil";

import { playlistId } from "./atom";

export const withPlaylistId = selector<string>({
	key: "selector/withPlaylistId",
	get: ({ get }) => get(playlistId),
	set: ({ set }, newValue) => set(playlistId, newValue),
});
