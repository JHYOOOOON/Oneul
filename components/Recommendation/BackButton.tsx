import { useRouter } from "next/router";
import { IoChevronBackOutline } from "react-icons/io5";
import styled from "styled-components";

import { ROUTES } from "@/constants";

const BackButton = () => {
	const router = useRouter();
	return (
		<StyledButton onClick={() => router.push(ROUTES.SEARCH)} title="뒤로가기">
			<IoChevronBackOutline />
			<p>뒤로가기</p>
		</StyledButton>
	);
};

export default BackButton;

const StyledButton = styled.button`
	position: absolute;
	top: -35px;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 2px;
	padding: 0;
	border: none;
	color: ${({ theme }) => theme.color.black200};
	background-color: transparent;
	cursor: pointer;
`;
