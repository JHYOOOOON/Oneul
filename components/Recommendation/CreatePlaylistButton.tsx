import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { withRecommendationItems, withUserId } from "@/state";
import { Button } from "@/styles";
import { RestAPI } from "@/lib";
import { useToast } from "../hooks";

function CreatePlaylistButton() {
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
			addToast("플레이리스트가 추가되었습니다.");
		} catch (error: any) {
			addToast("알 수 없는 오류가 발생했습니다.");
		}
	};

	return <StyledButton onClick={savePlaylist}>플레이리스트에 추가</StyledButton>;
}

export default CreatePlaylistButton;

const StyledButton = styled(Button)`
	margin-right: 5px;
`;
