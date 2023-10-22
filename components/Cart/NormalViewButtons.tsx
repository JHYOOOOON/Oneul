import { Dispatch, SetStateAction } from "react";
import { useRecoilCallback } from "recoil";
import styled, { keyframes } from "styled-components";
import cx from "classnames";

import { Button, Theme } from "@/styles";
import { IdsType, withCartItemIds, withCartItems } from "@/state";
import { ButtonWrapper, DeleteButton } from "./CommonStyle";
import { useRecommendation, useToast } from "../hooks";

interface INormalViewButtons {
	selectedItemIds: IdsType;
	setIsDeletePickView: Dispatch<SetStateAction<boolean>>;
	setCartOpened: Dispatch<SetStateAction<boolean>>;
	isSelectedMax: boolean;
}

export function NormalViewButtons({
	selectedItemIds,
	setIsDeletePickView,
	setCartOpened,
	isSelectedMax,
}: INormalViewButtons) {
	const { addToast } = useToast();
	const { getRecommendation } = useRecommendation({ selectedItemIds });

	const handleRecommendation = () => getRecommendation();

	const handleClickDeletePick = () => setIsDeletePickView(true);

	const removeAllItems = useRecoilCallback(
		({ reset }) =>
			() => {
				selectedItemIds.forEach((id) => {
					reset(withCartItems(id));
				});
				reset(withCartItemIds);
				setCartOpened(false);
				addToast("전체 삭제되었습니다.");
			},
		[]
	);

	return (
		<ButtonWrapper>
			<div>
				<DeletePickButton title="선택 삭제" onClick={handleClickDeletePick}>
					선택 삭제
				</DeletePickButton>
				<DeleteButton title="전체 삭제" onClick={removeAllItems}>
					전체 삭제
				</DeleteButton>
			</div>
			<RecommendationButton title="추천받기" onClick={handleRecommendation} className={cx({ active: isSelectedMax })}>
				추천곡 확인
			</RecommendationButton>
		</ButtonWrapper>
	);
}

const DeletePickButton = styled(DeleteButton)`
	margin-right: 5px;
`;

const borderAnimation = keyframes`
	from {
		border-color: ${Theme.color.primary100};
	}
	to {
		border-color: ${Theme.color.primary400};
	}
`;

const RecommendationButton = styled(Button)`
	border: 1px solid ${({ theme }) => theme.color.primary100};
	&.active {
		animation: ${borderAnimation} 1.5s ease-in-out infinite;
	}
`;
