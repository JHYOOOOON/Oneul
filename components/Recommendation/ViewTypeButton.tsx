import { IoAlbumsOutline } from "react-icons/io5";
import { RiListUnordered } from "react-icons/ri";
import styled from "styled-components";
import cx from "classnames";

import { VIEW_TYPE } from "@/types";

type ViewTypeButton = {
	viewType: VIEW_TYPE;
	handleViewType: (value: VIEW_TYPE) => void;
};

export function ViewTypeButton({ viewType, handleViewType }: ViewTypeButton) {
	return (
		<Wrapper>
			<StyledButton className={cx({ active: viewType === "list" })} onClick={() => handleViewType("list")}>
				<RiListUnordered />
				<Title>리스트</Title>
			</StyledButton>
			<StyledButton className={cx({ active: viewType === "album" })} onClick={() => handleViewType("album")}>
				<IoAlbumsOutline />
				<Title>앨범</Title>
			</StyledButton>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	border-radius: 5px;
	overflow: hidden;
`;

const StyledButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 3px;
	font-family: inherit;
	font-size: ${({ theme }) => theme.textSize.sm}rem;
	padding: 7px 10px;
	border: none;
	cursor: pointer;
	&.active,
	&:hover {
		color: ${({ theme }) => theme.color.white};
	}
	&.active {
		background-color: ${({ theme }) => theme.color.primary100};
	}
	&:hover {
		background-color: ${({ theme }) => theme.color.primary};
	}
`;

const Title = styled.p`
	${({ theme }) => theme.mediaQuery.mobile} {
		display: none;
	}
`;
