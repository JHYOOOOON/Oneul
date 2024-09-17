import React, { Dispatch, SetStateAction } from "react";
import { RiPlayListFill } from "react-icons/ri";
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

	return (
		<Button $variant="simple" $size="md" $fullWidth onClick={savePlaylist}>
			<RiPlayListFill />
			플리 저장
		</Button>
	);
}
