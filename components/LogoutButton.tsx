import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { MdOutlineLogout } from "react-icons/md";

import { removeAccessToken } from "@/lib";
import { ROUTES } from "@/constants";
import { SimpleButton } from "@/styles";

function LogoutButton() {
	const router = useRouter();

	const handleLogout = () => {
		removeAccessToken();
		router.replace(ROUTES.HOME);
	};

	return (
		<StyledButton onClick={handleLogout}>
			<p>로그아웃</p>
			<MdOutlineLogout />
		</StyledButton>
	);
}

export default LogoutButton;

const StyledButton = styled.button`
	position: fixed;
	top: 0.6rem;
	right: 1rem;
	${SimpleButton}
`;
