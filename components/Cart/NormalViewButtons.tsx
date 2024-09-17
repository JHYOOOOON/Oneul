import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { FaRegThumbsUp } from "react-icons/fa";
import cx from "classnames";

import { Button } from "@/styles";
import { IdsType } from "@/state";
import { useRecommendation } from "../hooks";

interface INormalViewButtons {
	selectedItemIds: IdsType;
	setIsDeletePickView: Dispatch<SetStateAction<boolean>>;
	setCartOpened: Dispatch<SetStateAction<boolean>>;
	isSelectedMax: boolean;
}

export function NormalViewButtons({ selectedItemIds, isSelectedMax }: INormalViewButtons) {
	const { getRecommendation } = useRecommendation({ selectedItemIds });

	const handleRecommendation = () => getRecommendation();

	return (
		<Wrapper>
			<Button
				$variant="simple"
				$size="sm"
				$fullWidth
				title="추천받기"
				onClick={handleRecommendation}
				className={cx({ active: isSelectedMax })}
			>
				<FaRegThumbsUp />
				<div>
					담은&nbsp;<p>{selectedItemIds.length}</p>곡으로 추천 받기
				</div>
			</Button>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	min-height: 40px;
	div {
		display: flex;
		p {
			color: ${({ theme }) => theme.color.primary};
		}
	}
`;
