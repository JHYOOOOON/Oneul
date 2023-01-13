import { useState } from "react";
import styled, { css } from "styled-components";
import { useRecoilValue } from "recoil";
import { RxHamburgerMenu } from "react-icons/rx";

import Maybe from "../components/Maybe";
import { recommendations } from "../lib/api";
import CartItem from "./CartItem";
import { withCartItemIds } from "../recoil";

const SelectedSection = () => {
	const [isOpened, setIsOpened] = useState(false);
	const selectedItemIds = useRecoilValue(withCartItemIds);

	const handleRecomendation = async () => {
		const res = await recommendations(selectedItemIds);
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
				<RecommendationButtonWrapper>
					<RecommendationButton title="추천받기" onClick={handleRecomendation}>
						추천곡 확인
					</RecommendationButton>
				</RecommendationButtonWrapper>
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
	transition: max-height 0.3s;
	${({ isOpened }) =>
		isOpened
			? css`
					max-height: 0px;
			  `
			: css`
					max-height: 700px;
			  `}
`;

const EmptyWrapper = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 200px;
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
