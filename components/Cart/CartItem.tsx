import React, { useState } from "react";
import { AiFillMinusCircle } from "react-icons/ai";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";

import { ListItem, Maybe } from "@/components";
import { withCartItems } from "@/state";

type CartItemType = {
	id: string;
	index: number;
	isDeleteView: boolean;
	isDeletePick: boolean;
	handleSaveDeleteItem: (id: string) => void;
};

export function CartItem({ id, index, isDeleteView, isDeletePick, handleSaveDeleteItem }: CartItemType) {
	const cartItem = useRecoilValue(withCartItems(id));
	const deleteCartItem = useResetRecoilState(withCartItems(id));

	const handleDeleteItem = () => {
		deleteCartItem();
	};

	return (
		<ListItem variant="simple">
			<Maybe
				test={isDeleteView}
				truthy={
					<input
						type="checkbox"
						checked={isDeletePick}
						onChange={() => {
							handleSaveDeleteItem(id);
						}}
					/>
				}
				falsy={<ListItem.Index>{index}</ListItem.Index>}
			/>

			<ListItem.SongInform album={cartItem!.album} name={cartItem!.name} artists={cartItem!.artists} />
			<ListItem.Remove onClick={handleDeleteItem} title={`${cartItem?.name} 삭제하기`} />
		</ListItem>
	);
}
