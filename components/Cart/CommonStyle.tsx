import styled from "styled-components";

import { Button } from "@/styles";

export const ButtonWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 20px;
`;

export const DeleteButton = styled(Button)`
	background-color: ${({ theme }) => theme.color.red100};
	&:hover {
		background-color: ${({ theme }) => theme.color.red};
	}
`;
