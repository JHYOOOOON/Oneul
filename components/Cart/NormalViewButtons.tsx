import { Dispatch, SetStateAction } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import cx from "classnames";

import { Button, Theme } from "@/styles";
import { RestAPI, removeAccessToken } from "@/lib";
import { idsType, withCartItemIds, withCartItems, withRecommendationItems } from "@/state";
import { RECOMMENDATIONS_KEY, RECOMMENDATION_SEED_LIMIT, ROUTES } from "@/constants";
import { ButtonWrapper, DeleteButton } from "./CommonStyle";
import { useToast } from "../hooks";

interface INormalViewButtons {
	selectedItemIds: idsType;
	setIsDeletePickView: Dispatch<SetStateAction<boolean>>;
	setCartOpened: Dispatch<SetStateAction<boolean>>;
	isSelectedMax: boolean;
}

function NormalViewButtons({ selectedItemIds, setIsDeletePickView, setCartOpened, isSelectedMax }: INormalViewButtons) {
	const router = useRouter();
	const { addToast } = useToast();
	const setRecommendationItems = useSetRecoilState(withRecommendationItems);
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

	const handleRecommendation = () => refetch();

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

export default NormalViewButtons;

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
