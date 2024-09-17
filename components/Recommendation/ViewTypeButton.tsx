import { IoAlbumsOutline } from "react-icons/io5";
import { RiListUnordered } from "react-icons/ri";
import styled from "styled-components";

import { VIEW_TYPE } from "@/types";

type ViewTypeButton = {
	viewType: VIEW_TYPE;
	handleViewType: (value: VIEW_TYPE) => void;
};

export function ViewTypeButton({ viewType, handleViewType }: ViewTypeButton) {
	return (
		<>
			{viewType === "album" ? (
				<StyledButton title="목록으로 보기" onClick={() => handleViewType("list")}>
					<RiListUnordered />
				</StyledButton>
			) : (
				<StyledButton title="앨범사진으로 보기" onClick={() => handleViewType("album")}>
					<IoAlbumsOutline />
				</StyledButton>
			)}
		</>
	);
}

const StyledButton = styled.button`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	font-family: inherit;
	font-size: ${({ theme }) => theme.textSize.xl}rem;
	border: none;
	color: ${({ theme }) => theme.color.white};
	background-color: ${({ theme }) => theme.color.primary200};
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	transition: background 0.1s;
	&:hover {
		background-color: ${({ theme }) => theme.color.primary};
	}
	cursor: pointer;
	${({ theme }) => theme.mediaQuery.mobile} {
		width: 38px;
		height: 38px;
	}
`;
