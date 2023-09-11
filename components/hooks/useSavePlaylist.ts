import { useState } from "react";
import { useRecoilValue } from "recoil";

import { RestAPI } from "@/lib";
import { withUserId } from "@/state";
import { useToast } from "./useToast";

export function useSavePlaylist() {
	const [playlistUrl, setPlaylistUrl] = useState("");
	const userId = useRecoilValue(withUserId);
	const { addToast } = useToast();

	const save = async (name: string, uris: string[], callback?: (playlistId: string) => void) => {
		try {
			const date = new Date().toDateString();
			const body = {
				name,
				description: `${date}`,
			};
			const {
				data: { id, uri },
			} = await RestAPI.createPlaylist(userId, body);
			await RestAPI.addTracksPlaylist(id, { uris });
			setPlaylistUrl(uri);
			addToast("플레이리스트가 저장되었습니다.");
			callback && callback(id);
		} catch (error: any) {
			addToast("알 수 없는 오류가 발생했습니다.");
		}
	};

	return { save, playlistUrl, setPlaylistUrl };
}
