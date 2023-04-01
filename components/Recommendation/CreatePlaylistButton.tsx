import React, { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";

import { withRecommendationItems, withUserId } from "@/state";
import { Button } from "@/styles";
import { RestAPI } from "@/lib";
import { useToast } from "../hooks";
import { VIEW_TYPE } from "@/types";

type CreatePlaylistButtonProps = {
	handleCreatedPlaylistId: Dispatch<SetStateAction<string>>;
	handleViewType: Dispatch<SetStateAction<VIEW_TYPE>>;
};

function CreatePlaylistButton({ handleCreatedPlaylistId, handleViewType }: CreatePlaylistButtonProps) {
	const userId = useRecoilValue(withUserId);
	const recommendationItems = useRecoilValue(withRecommendationItems);
	const { addToast } = useToast();

	const savePlaylist = async () => {
		try {
			const date = new Date().toDateString();
			const body = {
				name: "ᕷ₊· 𝑶𝒏𝒆𝒖𝒍 ◡̎ ·₊ᕷ",
				description: `${date}`,
			};
			const {
				data: { id },
			} = await RestAPI.createPlaylist(userId, body);
			const uris = recommendationItems.map((item) => item.uri);
			await RestAPI.addTracksPlaylist(id, { uris });
			handleCreatedPlaylistId(id);
			addToast("플레이리스트가 추가되었습니다.");
			handleViewType("prev-listen");
		} catch (error: any) {
			addToast("알 수 없는 오류가 발생했습니다.");
		}
	};

	return <Button onClick={savePlaylist}>플레이리스트에 추가</Button>;
}

export default CreatePlaylistButton;
