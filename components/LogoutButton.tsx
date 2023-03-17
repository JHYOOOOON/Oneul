import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { removeAccessToken } from "@/lib";
import { ROUTES } from "@/constants";

function LogoutButton() {
	const router = useRouter();

	const handleLogout = () => {
		removeAccessToken();
		router.replace(ROUTES.HOME);
	};

	return <StyledButton onClick={handleLogout}>로그아웃</StyledButton>;
}

export default LogoutButton;

const StyledButton = styled.button`
	position: fixed;
	top: 0.6rem;
	right: 1rem;
	background: transparent;
	border: none;
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
`;
