import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled, { css, keyframes } from "styled-components";
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import { useQuery } from "react-query";
import { RxHamburgerMenu } from "react-icons/rx";
import cx from "classnames";

import { Maybe } from "@/components";
import { CartItem } from "@/components/Cart";
import { withCartItemIds, withCartItems, withRecommendationItems } from "@/state";
import { RestAPI, removeAccessToken } from "@/lib";
import { MAX_ITEM_LEN, RECOMMENDATIONS_KEY, RECOMMENDATION_SEED_LIMIT, ROUTES } from "@/constants";
import { Button, Theme } from "@/styles";
import { useToast } from "../hooks";

const Cart = () => {
	const router = useRouter();
	const [isOpened, setIsOpened] = useState(false);
	const [isDeletePickView, setIsDeletePickView] = useState(false);
	const [pickedDeleteItems, setPickedDeleteItems] = useState<string[]>([]);
	const [selectAll, setSelectAll] = useState(false);
	const selectedItemIds = useRecoilValue(withCartItemIds);
	const setRecommendationItems = useSetRecoilState(withRecommendationItems);
	const isSelectedMax = useMemo(() => selectedItemIds.length === MAX_ITEM_LEN, [selectedItemIds]);
	const { addToast } = useToast();
	const cartRef = useRef<HTMLDivElement>(null);
	const { refetch } = useQuery({
		queryKey: "recommendations",
		queryFn: async () => {
			const splitedItemIds = [];
			for (let index = 0; index < selectedItemIds.length; index += RECOMMENDATION_SEED_LIMIT) {
				splitedItemIds.push(selectedItemIds.slice(index, index + RECOMMENDATION_SEED_LIMIT));
			}
			return Promise.all(splitedItemIds.map((ids) => RestAPI.recommendations(ids))).then((data) => data);
		},
		suspense: true,
		enabled: false,
		retry: 0,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		onSuccess: (result) => {
			const tracks = result.reduce((acc, cur) => acc.concat(cur.data.tracks), []);
			setRecommendationItems(tracks);
			localStorage.setItem(RECOMMENDATIONS_KEY, JSON.stringify(tracks));
			router.push(ROUTES.RECOMMENDATION);
		},
		onError: (error: any) => {
			console.log(`[handleRecommendationError]: ${error}`);
			if (error.response.status === 401) {
				removeAccessToken();
				router.push(ROUTES.HOME);
			}
		},
	});

	/* 카트 바깥영역 클릭 시, 닫힘처리 */
	useEffect(() => {
		const handleCloseCart = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (target.closest("#cart") === null) {
				setIsOpened(false);
			}
		};

		document.addEventListener("click", handleCloseCart);
		return () => document.removeEventListener("click", handleCloseCart);
	}, []);

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

	const handleRecommendation = () => refetch();

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

	const handleClickDeletePick = () => setIsDeletePickView(true);

	const handleSaveDeleteItem = useCallback((id: string) => {
		setPickedDeleteItems((prevValue) =>
			prevValue.includes(id) ? prevValue.filter((item) => item !== id) : [...prevValue, id]
		);
	}, []);

	const removeAllItems = useRecoilCallback(
		({ reset }) =>
			() => {
				selectedItemIds.forEach((id) => {
					reset(withCartItems(id));
				});
				reset(withCartItemIds);
				setIsOpened(false);
				addToast("전체 삭제되었습니다.");
			},
		[]
	);

	return (
		<StyledSection id="cart" ref={cartRef}>
			<StyledButton onClick={() => setIsOpened((prevValue) => !prevValue)}>
				<RxHamburgerMenu />
				담은 목록
			</StyledButton>
			<SelectedItemWrapper isOpened={isOpened}>
				<Maybe
					test={selectedItemIds === null}
					truthy={null}
					falsy={
						<Maybe
							test={selectedItemIds?.length === 0}
							truthy={
								<EmptyWrapper>
									<p>텅 비었네요</p>
								</EmptyWrapper>
							}
							falsy={
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
							}
						/>
					}
				/>
				{selectedItemIds.length > 0 && (
					<Maybe
						test={isDeletePickView}
						truthy={
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
						}
						falsy={
							<ButtonWrapper>
								<div>
									<DeletePickButton title="선택 삭제" onClick={handleClickDeletePick}>
										선택 삭제
									</DeletePickButton>
									<DeleteButton title="전체 삭제" onClick={removeAllItems}>
										전체 삭제
									</DeleteButton>
								</div>
								<RecommendationButton
									title="추천받기"
									onClick={handleRecommendation}
									className={cx({ active: isSelectedMax })}
								>
									추천곡 확인
								</RecommendationButton>
							</ButtonWrapper>
						}
					/>
				)}
			</SelectedItemWrapper>
		</StyledSection>
	);
};

export default Cart;

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

const borderAnimation = keyframes`
	from {
		border-color: ${Theme.color.primary100};
	}
	to {
		border-color: ${Theme.color.primary400};
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
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 20px;
`;

const DeleteButton = styled(Button)`
	background-color: ${({ theme }) => theme.color.red100};
	&:hover {
		background-color: ${({ theme }) => theme.color.red};
	}
`;

const CancelDeleteView = styled(Button)`
	margin-right: 5px;
	background-color: ${({ theme }) => theme.color.gray100};
	&:hover {
		background-color: ${({ theme }) => theme.color.gray};
	}
`;

const DeletePickButton = styled(DeleteButton)`
	margin-right: 5px;
`;

const RecommendationButton = styled(Button)`
	border: 1px solid ${({ theme }) => theme.color.primary100};
	&.active {
		animation: ${borderAnimation} 1.5s ease-in-out infinite;
	}
`;
