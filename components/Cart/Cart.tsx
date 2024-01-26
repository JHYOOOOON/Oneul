import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useRecoilValue } from "recoil";
import { RxHamburgerMenu } from "react-icons/rx";

import { Maybe } from "@/components";
import {
	CartItem,
	DeleteViewButtons,
	IsDeletePickViewType,
	NormalViewButtons,
	PickedDeleteItemsType,
} from "@/components/Cart";
import { withCartItemIds } from "@/state";
import { MAX_ITEM_LEN } from "@/constants";

export function Cart() {
	const [isOpened, setIsOpened] = useState(false);
	const [isDeletePickView, setIsDeletePickView] = useState<IsDeletePickViewType>(false);
	const [pickedDeleteItems, setPickedDeleteItems] = useState<PickedDeleteItemsType>([]);
	const selectedItemIds = useRecoilValue(withCartItemIds);
	const isSelectedMax = useMemo(() => selectedItemIds.length === MAX_ITEM_LEN, [selectedItemIds]);
	const cartRef = useRef<HTMLDivElement>(null);

	/* 카트 바깥영역 클릭 시, 닫힘처리 */
	// TODO 카트 내부 - 클릭 시에 닫히는 문제 개선 필요
	// useEffect(() => {
	// 	const handleCloseCart = (event: MouseEvent) => {
	// 		const target = event.target as HTMLElement;
	// 		if (target.closest("#cart") === null) {
	// 			setIsOpened(false);
	// 		}
	// 	};

	// 	document.addEventListener("click", handleCloseCart);
	// 	return () => document.removeEventListener("click", handleCloseCart);
	// }, []);

	/* 최대로 담았을 때 자동으로 열리도록 함 */
	useEffect(() => {
		if (isSelectedMax) {
			setIsOpened(true);
		}
	}, [isSelectedMax]);

	/* 닫혔을 때 선택삭제 뷰, 담긴 아이템 초기화 */
	useEffect(() => {
		if (isOpened === false) {
			setIsDeletePickView(false);
			setPickedDeleteItems([]);
		}
	}, [isOpened]);

	const handleSaveDeleteItem = useCallback((id: string) => {
		setPickedDeleteItems((prevValue) =>
			prevValue.includes(id) ? prevValue.filter((item) => item !== id) : [...prevValue, id]
		);
	}, []);

	return (
		<StyledSection id="cart" ref={cartRef}>
			<StyledButton onClick={() => setIsOpened((prevValue) => !prevValue)}>
				<RxHamburgerMenu />
				담은 목록 [{selectedItemIds.length}]
			</StyledButton>
			<SelectedItemWrapper isOpened={isOpened}>
				<Maybe
					test={selectedItemIds?.length === 0}
					truthy={
						<EmptyWrapper>
							<p>텅 비었네요</p>
						</EmptyWrapper>
					}
					falsy={
						<>
							<ItemWrapper>
								{selectedItemIds?.map((id, index) => (
									<CartItem
										key={`selectedItem_${id}`}
										id={id}
										index={index + 1}
										isDeleteView={isDeletePickView}
										isDeletePick={pickedDeleteItems.includes(id)}
										handleSaveDeleteItem={handleSaveDeleteItem}
									/>
								))}
							</ItemWrapper>
							<Maybe
								test={isDeletePickView}
								truthy={
									<DeleteViewButtons
										selectedItemIds={selectedItemIds}
										pickedDeleteItems={pickedDeleteItems}
										setPickedDeleteItems={setPickedDeleteItems}
										setIsDeletePickView={setIsDeletePickView}
									/>
								}
								falsy={
									<NormalViewButtons
										selectedItemIds={selectedItemIds}
										setIsDeletePickView={setIsDeletePickView}
										setCartOpened={setIsOpened}
										isSelectedMax={isSelectedMax}
									/>
								}
							/>
						</>
					}
				/>
			</SelectedItemWrapper>
		</StyledSection>
	);
}

const StyledSection = styled.div`
	position: fixed;
	right: 50px;
	bottom: 0;
	max-width: 80%;
	width: 550px;
	background-color: white;
	border-radius: 10px 10px 0 0;
	overflow: hidden;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	z-index: 100;
	${({ theme }) => theme.mediaQuery.mobile} {
		max-width: auto;
		width: 95%;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
	}
`;

const StyledButton = styled.button`
	display: flex;
	align-items: center;
	gap: 5px;
	width: 100%;
	background-color: ${({ theme }) => theme.color.primary100};
	border: none;
	color: white;
	text-align: left;
	padding: 7px 10px;
	font-size: ${({ theme }) => theme.textSize.base}rem;
	transition: all 0.2s;
	&:hover {
		background-color: ${({ theme }) => theme.color.primary};
	}
	svg {
		font-size: ${({ theme }) => theme.textSize.xl}rem;
	}
`;

const SelectedItemWrapper = styled.div<{ isOpened: boolean }>`
	display: flex;
	flex-direction: column;
	${({ isOpened }) =>
		isOpened
			? css`
					max-height: 700px;
					transition: max-height 1s ease-out;
			  `
			: css`
					max-height: 0px;
			  `}
`;

const EmptyWrapper = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 250px;
`;

const ItemWrapper = styled.ul`
	height: max-content;
	max-height: 380px;
	overflow: auto;
	&::-webkit-scrollbar-thumb {
		border-radius: 100px;
	}
	&::-webkit-scrollbar-track {
		background-color: red;
	}
`;
