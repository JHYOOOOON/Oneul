import styled, { css } from "styled-components";

export const Title = styled.h1`
	font-size: ${({ theme }) => theme.textSize.xxxl}rem;
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	margin-bottom: 10px;
`;

export const Description = styled.p`
	margin-bottom: 15px;
	font-size: ${({ theme }) => theme.textSize.sm}rem;
	color: ${({ theme }) => theme.color.black100};
	line-height: 1.15;
`;

export const PageWrapper = styled.div`
	flex: 1;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	overflow: hidden;
`;

export const Button = styled.button<{
	$size?: "sm" | "md" | "lg";
	$fullWidth?: boolean;
	$variant?: "primary" | "empty" | "simple";
}>`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4px;
	border: none;
	border-radius: 3px;
	transition: background-color 0.1s;
	cursor: pointer;
	${({ $fullWidth }) =>
		$fullWidth &&
		css`
			width: 100%;
		`}
	${({ $variant }) => {
		switch ($variant) {
			case "empty": {
				return css`
					border-radius: 0;
					background-color: ${({ theme }) => theme.color.white};
					color: ${({ theme }) => theme.color.black100};
					font-weight: 600;
					&:hover,
					&:active {
						background-color: ${({ theme }) => theme.color.primary300};
					}
				`;
			}
			case "simple": {
				return css`
					border-radius: 0;
					background-color: ${({ theme }) => theme.color.primary400};
					color: ${({ theme }) => theme.color.black100};
					font-weight: 600;
					&:hover,
					&:active {
						background-color: ${({ theme }) => theme.color.primary300};
					}
				`;
			}
			default: {
				return css`
					background-color: ${({ theme }) => theme.color.primary100};
					color: ${({ theme }) => theme.color.white};
					&:hover,
					&.active {
						background-color: ${({ theme }) => theme.color.primary};
					}
				`;
			}
		}
	}}
	${({ $size }) => {
		switch ($size) {
			case "md": {
				return css`
					padding: 15px 20px;
					font-size: ${({ theme }) => theme.textSize.md}rem;
				`;
			}
			case "lg": {
				return css`
					padding: 15px 20px;
					font-size: ${({ theme }) => theme.textSize.lg}rem;
				`;
			}

			default: {
				return css`
					padding: 7px 10px;
					font-size: ${({ theme }) => theme.textSize.sm}rem;
				`;
			}
		}
	}}
`;

export const SimpleButton = css`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 4px;
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
