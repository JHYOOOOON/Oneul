import { useRouter } from "next/router";
import { IoChevronBackOutline } from "react-icons/io5";
import styled from "styled-components";

import { ROUTES } from "@/constants";
import { SimpleButton } from "@/styles";

export function BackButton() {
	const router = useRouter();
	return (
		<StyledButton onClick={() => router.push(ROUTES.SEARCH)} title="뒤로가기">
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
