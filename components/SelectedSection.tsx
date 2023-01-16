import { useState } from "react";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { RxHamburgerMenu } from "react-icons/rx";

import { Maybe } from "../components";
import CartItem from "./CartItem";
import { withCartItemIds, withRecommendationItems } from "../recoil";
import { recommendations, removeAccessToken } from "../lib";

const SelectedSection = () => {
	const router = useRouter();
	const [isOpened, setIsOpened] = useState(false);
	const selectedItemIds = useRecoilValue(withCartItemIds);
	const setRecommendationItems = useSetRecoilState(withRecommendationItems);

	const handleRecommendation = async () => {
		try {
			const {
				data: { tracks },
			} = await recommendations(selectedItemIds);
			setRecommendationItems(tracks);
			router.push("/recommendation");
		} catch (error: any) {
			console.log(`[handleRecommendationError]: ${error}`);
			if (error.response.status === 401) {
				removeAccessToken();
			}
		}
	};

	return (
		<StyledSection>
			<StyledButton onClick={() => setIsOpened(!isOpened)}>
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
										<CartItem key={id} id={id} index={index + 1} />
									))}
								</ItemWrapper>
							}
						/>
					}
				/>
				{selectedItemIds.length > 0 && (
					<RecommendationButtonWrapper>
						<RecommendationButton title="추천받기" onClick={handleRecommendation}>
							추천곡 확인
						</RecommendationButton>
					</RecommendationButtonWrapper>
				)}
			</SelectedItemWrapper>
		</StyledSection>
	);
};

export default SelectedSection;

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
`;

const RecommendationButtonWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 10px 20px;
`;

const RecommendationButton = styled.button`
	border: none;
	font-size: ${({ theme }) => theme.textSize.base}rem;
	padding: 7px 10px;
	border-radius: 5px;
	background-color: ${({ theme }) => theme.color.primary100};
	color: white;
	transition: all 0.2s;
	cursor: pointer;
	&:hover {
		background-color: ${({ theme }) => theme.color.primary};
	}
`;
