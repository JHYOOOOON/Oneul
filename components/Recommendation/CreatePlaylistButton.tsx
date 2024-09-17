import React from "react";
import { RiPlayListFill } from "react-icons/ri";
import { useRecoilValue } from "recoil";

import { useSavePlaylist } from "@/components/hooks";
import { withRecommendationItems } from "@/state";
import { Button } from "@/styles";

type CreatePlaylistButtonProps = {
	handleCreatedPlaylistId: (id: string) => void;
};

export function CreatePlaylistButton({ handleCreatedPlaylistId }: CreatePlaylistButtonProps) {
	const recommendationItems = useRecoilValue(withRecommendationItems);
	const { save } = useSavePlaylist();

	const savePlaylist = async () => {
		const callback = (playlistId: string) => {
			handleCreatedPlaylistId(playlistId);
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
