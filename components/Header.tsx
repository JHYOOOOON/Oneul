import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

import { getAccessToken } from "@/lib";
import { LogoutButton } from "./LogoutButton";

export function Header() {
	const { pathname } = useRouter();
	const [isUser, setIsUser] = useState(false);

	useEffect(() => {
		setIsUser(Boolean(getAccessToken()));
	}, [pathname]);

	return (
		<StyledHeader>
			<Link href={pathname === "/" ? "/" : "/main"}>
				<Logo src="/assets/images/logo.png" />
			</Link>
			{isUser ? <LogoutButton /> : null}
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
