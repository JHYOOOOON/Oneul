import { useEffect, useMemo, useState } from "react";
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
interface ICart {
	handleLoading: (isLoading: boolean) => void;
}

const Cart = ({ handleLoading }: ICart) => {
	const router = useRouter();
	const [isOpened, setIsOpened] = useState(false);
	const selectedItemIds = useRecoilValue(withCartItemIds);
	const setRecommendationItems = useSetRecoilState(withRecommendationItems);
	const isSelectedMax = useMemo(() => selectedItemIds.length === MAX_ITEM_LEN, [selectedItemIds]);
	const { addToast } = useToast();
	const { refetch, isFetching } = useQuery({
		queryKey: "recommendations",
		queryFn: async () => {
			const splitedItemIds = [];
			for (let index = 0; index < selectedItemIds.length; index += RECOMMENDATION_SEED_LIMIT) {
				splitedItemIds.push(selectedItemIds.slice(index, index + RECOMMENDATION_SEED_LIMIT));
			}
			return Promise.all(splitedItemIds.map((ids) => RestAPI.recommendations(ids))).then((data) => data);
		},
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

	useEffect(() => {
		handleLoading(isFetching);
	}, [isFetching]);

	/* 최대로 담았을 때 자동으로 열리도록 함 */
	useEffect(() => {
		if (isSelectedMax) {
			setIsOpened(true);
		}
	}, [isSelectedMax]);

	const handleRecommendation = () => refetch();

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
		<StyledSection>
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
										<CartItem key={`selectedItem_${id}`} id={id} index={index + 1} />
									))}
								</ItemWrapper>
							}
						/>
					}
				/>
				{selectedItemIds.length > 0 && (
					<ButtonWrapper>
						<AllDeleteButton title="전체 삭제" onClick={removeAllItems}>
							전체 삭제
						</AllDeleteButton>
						<RecommendationButton
							title="추천받기"
							onClick={handleRecommendation}
							className={cx({ active: isSelectedMax })}
						>
							추천곡 확인
						</RecommendationButton>
					</ButtonWrapper>
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

const AllDeleteButton = styled(Button)`
	background-color: ${({ theme }) => theme.color.red100};
	&:hover {
		background-color: ${({ theme }) => theme.color.red};
	}
`;

const RecommendationButton = styled(Button)`
	border: 1px solid ${({ theme }) => theme.color.primary100};
	&.active {
		animation: ${borderAnimation} 1.5s ease-in-out infinite;
	}
`;
