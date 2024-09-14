import styled from "styled-components";
import { LogoutButton } from "./LogoutButton";
import Link from "next/link";

export function Header() {
	return (
		<StyledHeader>
			<Link href="/main">
				<Logo src="/assets/images/logo.png" />
			</Link>
			<LogoutButton />
		</StyledHeader>
	);
}

const StyledHeader = styled.header`
	padding: 7px 10px;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	min-height: 40px;
	height: 40px;
	overflow: hidden;
	border-bottom: 1px solid ${({ theme }) => theme.color.gray400};
`;

const Logo = styled.img`
	height: 100%;
`;
