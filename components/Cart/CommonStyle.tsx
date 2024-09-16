import styled from "styled-components";

import { Button } from "@/styles";

export const ButtonWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 20px;
`;

export const DeleteButton = styled(Button)`
	background-color: ${({ theme }) => theme.color.red100};
	color: ${({ theme }) => theme.color.white};
	font-size: ${({ theme }) => theme.textSize.xs}rem;
	border-radius: 3px;
	&:hover {
		background-color: ${({ theme }) => theme.color.red};
	}
`;
