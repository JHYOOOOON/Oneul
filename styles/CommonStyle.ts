import styled, { css } from "styled-components";

export const Title = styled.h1`
	font-size: ${({ theme }) => theme.textSize.xxxl}rem;
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	margin-bottom: 7px;
`;

export const Description = styled.p`
	margin-bottom: 15px;
	font-size: ${({ theme }) => theme.textSize.sm}rem;
	color: ${({ theme }) => theme.color.black100};
	line-height: 1.15;
`;

export const PageWrapper = styled.div`
	position: relative;
	padding: min(7%, 70px) min(9%, 90px);
`;

export const Button = styled.button`
	border: none;
	padding: 7px 10px;
	border-radius: 5px;
	transition: background-color 0.2s;
	font-size: ${({ theme }) => theme.textSize.base}rem;
	background-color: ${({ theme }) => theme.color.primary100};
	color: ${({ theme }) => theme.color.white};
	cursor: pointer;
	&:hover {
		background-color: ${({ theme }) => theme.color.primary};
	}
`;

export const SimpleButton = css`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 2px;
	padding: 0;
	background: transparent;
	border: none;
	cursor: pointer;
	color: ${({ theme }) => theme.color.black200};
	font-size: ${({ theme }) => theme.textSize.xs}rem;
	&:hover {
		color: ${({ theme }) => theme.color.black};
	}
`;
