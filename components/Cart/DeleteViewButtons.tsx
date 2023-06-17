import { Dispatch, SetStateAction, useCallback, useState } from "react";
import styled from "styled-components";
import { useRecoilCallback } from "recoil";

import { Button } from "@/styles";
import { ButtonWrapper, DeleteButton } from "./CommonStyle";
import { idsType, withCartItemIds, withCartItems } from "@/state";
import { IsDeletePickViewType, PickedDeleteItemsType } from ".";
import { useToast } from "../hooks";

interface IDeleteViewButtons {
	selectedItemIds: idsType;
	pickedDeleteItems: PickedDeleteItemsType;
	setPickedDeleteItems: Dispatch<SetStateAction<PickedDeleteItemsType>>;
	setIsDeletePickView: Dispatch<SetStateAction<IsDeletePickViewType>>;
}

function DeleteViewButtons({
	selectedItemIds,
	setIsDeletePickView,
	pickedDeleteItems,
	setPickedDeleteItems,
}: IDeleteViewButtons) {
	const [selectAll, setSelectAll] = useState(false);
	const { addToast } = useToast();

	const handleSelectAll = useCallback(() => {
		// 전체 선택된 상태
		if (selectAll) {
			setPickedDeleteItems([]);
			setSelectAll(false);
		} else {
			setPickedDeleteItems(selectedItemIds);
			setSelectAll(true);
		}
	}, [selectAll, selectedItemIds]);

	const cancelDeleteView = () => {
		setPickedDeleteItems([]);
		setIsDeletePickView(false);
	};

	const removePickedItems = useRecoilCallback(
		({ set, reset }) =>
			() => {
				pickedDeleteItems.forEach((id) => {
					reset(withCartItems(id));
				});
				const filteredCartItems = selectedItemIds.filter((item) => pickedDeleteItems.includes(item) === false);
				set(withCartItemIds, filteredCartItems);
				setPickedDeleteItems([]);
				setIsDeletePickView(false);
				addToast("선택하신 곡들이 삭제되었습니다.");
			},
		[selectedItemIds, pickedDeleteItems]
	);

	return (
		<ButtonWrapper>
			<Button title={selectAll ? "전체 해제" : "전체 선택"} onClick={handleSelectAll}>
				{selectAll ? "전체 해제" : "전체 선택"}
			</Button>
			<div>
				<CancelDeleteView title="취소" onClick={cancelDeleteView}>
					취소
				</CancelDeleteView>
				<DeleteButton title="삭제" onClick={removePickedItems}>
					삭제
				</DeleteButton>
			</div>
		</ButtonWrapper>
	);
}

export default DeleteViewButtons;

const CancelDeleteView = styled(Button)`
	margin-right: 5px;
	background-color: ${({ theme }) => theme.color.gray100};
	&:hover {
		background-color: ${({ theme }) => theme.color.gray};
	}
`;
