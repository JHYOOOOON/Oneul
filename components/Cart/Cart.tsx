import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useRecoilValue } from "recoil";
import { PiMusicNoteSimpleFill } from "react-icons/pi";
import cx from "classnames";

import { ListItem, Maybe } from "@/components";
import { CartItem, IsDeletePickViewType, NormalViewButtons, PickedDeleteItemsType } from "@/components/Cart";
import { withCartItemIds } from "@/state";
import { MAX_ITEM_LEN } from "@/constants";
import { Theme } from "@/styles";

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
		<StyledSection id="cart" ref={cartRef} $isOpened={isOpened}>
			<StyledButton
				className={cx({ active: selectedItemIds.length > 0 })}
				onClick={() => setIsOpened((prevValue) => !prevValue)}
			>
				<PiMusicNoteSimpleFill />
				노래주머니
				<Maybe test={selectedItemIds.length > 0} truthy={<p>{selectedItemIds.length}</p>} falsy={null} />
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
							<ListItem.Header>
								<ListItem.HeaderIndex />
								<ListItem.HeaderTitle />
								<ListItem.HeaderButton />
							</ListItem.Header>
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
							<NormalViewButtons
								selectedItemIds={selectedItemIds}
								setIsDeletePickView={setIsDeletePickView}
								setCartOpened={setIsOpened}
								isSelectedMax={isSelectedMax}
							/>
						</>
					}
				/>
			</SelectedItemWrapper>
		</StyledSection>
	);
}

const StyledSection = styled.div<{ $isOpened: boolean }>`
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
	background-color: ${({ theme }) => theme.color.white};
	border-radius: 20px 20px 0 0;
	z-index: 100;
	transition: max-height 0.6s;
	${({ $isOpened }) =>
		$isOpened
			? css`
					max-height: 400px;
			  `
			: css`
					max-height: 34px;
			  `}
`;

const borderAnimation = keyframes`
	from {
		border-color: ${Theme.color.primary};
	}
	to {
		border-color: ${Theme.color.primary200};
	}
`;

const StyledButton = styled.button`
	display: flex;
	align-items: center;
	gap: 2px;
	width: 100%;
	border: none;
	text-align: left;
	padding: 8px 10px;
	border-radius: 20px 20px 0 0;
	background-color: ${({ theme }) => theme.color.primary400};
	font-size: ${({ theme }) => theme.textSize.sm}rem;
	transition: all 0.2s;
	cursor: pointer;
	&:hover {
		background-color: ${({ theme }) => theme.color.primary300};
	}
	&.active {
		animation: ${borderAnimation} 1.5s ease-in-out infinite;
	}
	svg {
		font-size: ${({ theme }) => theme.textSize.lg}rem;
	}
	p {
		color: ${({ theme }) => theme.color.primary};
		font-weight: 700;
	}
`;

const SelectedItemWrapper = styled.div<{ isOpened: boolean }>`
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow: hidden;
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
	flex: 1;
	overflow: auto;
	padding-bottom: 20px;
	&::-webkit-scrollbar {
		display: none;
	}
	li:nth-child(2n) {
		background-color: ${({ theme }) => theme.color.primary400}35;
	}
	li:last-child::after {
		content: none;
	}
`;
