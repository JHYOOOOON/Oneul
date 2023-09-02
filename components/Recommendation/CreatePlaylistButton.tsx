import React, { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";

import { useSavePlaylist } from "@/components/hooks";
import { withRecommendationItems } from "@/state";
import { Button } from "@/styles";
import { VIEW_TYPE } from "@/types";

type CreatePlaylistButtonProps = {
	handleCreatedPlaylistId: Dispatch<SetStateAction<string>>;
	handleViewType: Dispatch<SetStateAction<VIEW_TYPE>>;
};

export function CreatePlaylistButton({ handleCreatedPlaylistId, handleViewType }: CreatePlaylistButtonProps) {
	const recommendationItems = useRecoilValue(withRecommendationItems);
	const { save } = useSavePlaylist();

	const savePlaylist = async () => {
		const callback = (playlistId: string) => {
			handleCreatedPlaylistId(playlistId);
			handleViewType("prev-listen");
		};
		const uris = recommendationItems.map((item) => item.uri);
		await save("ᕷ₊· 𝑶𝒏𝒆𝒖𝒍 ◡̎ ·₊ᕷ", uris, callback);
	};

	return <Button onClick={savePlaylist}>플레이리스트 저장</Button>;
}
