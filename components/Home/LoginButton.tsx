import Image from "next/image";
import styled from "styled-components";

import { authorizeUser } from "@/lib";

export function LoginButton() {
	return (
		<SpotifyLoginButton onClick={authorizeUser}>
			<Image src="/assets/images/spotify-logo.png" alt="스포티파이 로고" width="25" height="25" />
			<p>스포티파이로 로그인</p>
		</SpotifyLoginButton>
	);
}

const SpotifyLoginButton = styled.button`
	display: flex;
	align-items: center;
	gap: 5px;
	padding: 10px 15px;
	border-radius: 30px;
	border: none;
	cursor: pointer;
	background-color: ${({ theme }) => theme.color.green};
	color: ${({ theme }) => theme.color.white};
	font-size: ${({ theme }) => theme.textSize.lg}rem;
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	transition: background-color 0.2s;
	&:hover,
	&:focus {
		background-color: ${({ theme }) => theme.color.green100};
	}
	${({ theme }) => theme.mediaQuery.mobile} {
		padding: 5px 7px;
		padding-right: 13px;
		border-radius: 40px;
		gap: 4px;
	}
`;
