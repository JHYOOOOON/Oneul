import React, { MouseEvent } from "react";
import { useSetRecoilState } from "recoil";

import { SearchItemType } from "@/state/types";
import { withCartItems } from "@/state";
import { useToast } from "../hooks";
import { MAX_ITEM_LEN } from "@/constants";
import { ListItem } from "../ListItem";

type ResultItemType = Pick<SearchItemType, "id" | "name" | "artists" | "album" | "duration_ms" | "external_urls"> & {
	index: number;
	isMoreSelectAvailable: boolean;
	isExist: (id: string) => boolean;
};

export function Card({
	id,
	name,
	artists,
	external_urls,
	album,
	duration_ms,
	isMoreSelectAvailable,
	isExist,
}: ResultItemType) {
	const setCartItem = useSetRecoilState(withCartItems(id));
	const { addToast } = useToast();

	const handleSelectItem = (event: MouseEvent<HTMLButtonElement>) => {
		if (isMoreSelectAvailable) {
			alert(`노래는 최대 ${MAX_ITEM_LEN}개까지만 담을 수 있어요`);
		}
		if (isExist(id)) {
			addToast("이미 담겨있는 노래예요");
			return;
		}

		setCartItem({
			id,
			name,
			artists,
			album,
			duration_ms,
		});
		addToast("노래주머니에 쏙! 담겼어요");
		event.currentTarget.blur();
	};

	return (
		<ListItem>
			<ListItem.SongInform name={name} album={album} artists={artists} external_urls={external_urls} />
			<ListItem.AlbumTitle album={album} />
			<ListItem.Duration duration_ms={duration_ms} />
			<ListItem.Add title={`${name} 담기`} onClick={handleSelectItem} />
		</ListItem>
	);
}
