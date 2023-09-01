import { useRouter } from "next/router";
import { IoChevronBackOutline } from "react-icons/io5";
import styled from "styled-components";

import { SimpleButton } from "@/styles";
import { ROUTES } from "@/constants";

export function BackButton() {
	const router = useRouter();

	const handleClick = () => {
		if (history.length > 0) {
			router.back();
			return;
		}
		router.push(ROUTES.MAIN);
	};

	return (
		<StyledButton onClick={handleClick} title="뒤로가기">
			<IoChevronBackOutline />
			<p>뒤로가기</p>
		</StyledButton>
	);
}

const StyledButton = styled.button`
	position: absolute;
	top: 0.6rem;
	left: 1rem;
	${SimpleButton}
`;
