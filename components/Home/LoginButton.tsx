import Image from "next/image";
import styled from "styled-components";

import { authorizeUser } from "@/lib";

function LoginButton() {
	return (
		<SpotifyLoginButton onClick={authorizeUser}>
			<Image src="/assets/images/spotify-logo.png" alt="스포티파이 로고" width="25" height="25" />
			<p>스포티파이로 로그인</p>
		</SpotifyLoginButton>
	);
}

export default LoginButton;

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
`;
