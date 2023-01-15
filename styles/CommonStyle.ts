import styled from "styled-components";

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
	padding: 40px 60px;
`;
