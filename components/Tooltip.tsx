import styled, { css } from "styled-components";

type Position = "top" | "bottom" | "left" | "right";

interface ITooltip {
	position?: Position;
	children: React.ReactNode;
	contents: React.ReactNode;
}

export function Tooltip({ position = "bottom", children, contents }: ITooltip) {
	return (
		<Wrapper>
			{children}
			<Contents position={position}>{contents}</Contents>
		</Wrapper>
	);
}

/* TODO left/right/top 스타일링 */
const Contents = styled.div<{ position: Position }>`
	max-width: 200px;
	display: none;
	position: absolute;
	padding: 7px 10px;
	border-radius: 3px;
	background-color: ${({ theme }) => `${theme.color.gray400}`};
	word-break: keep-all;
	font-size: ${({ theme }) => theme.textSize.xs}rem;
	box-shadow: ${({ theme }) => `${theme.color.gray300}`} 0px 1px 2px 0px;
	line-height: 1.2;
	z-index: 100;
	${({ position }) => {
		switch (position) {
			case "bottom":
				return css`
					top: calc(100% + 10px);
					&::before {
						content: "";
						position: absolute;
						top: -8px;
						left: 50%;
						transform: translateX(-50%);
						margin: 0 auto;
						width: 0;
						height: 0;
						border-right: 8px solid transparent;
						border-bottom: 8px solid ${({ theme }) => `${theme.color.gray400}`};
						border-left: 8px solid transparent;
					}
				`;
			default:
				return;
		}
	}}
`;

const Wrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	&:hover ${Contents} {
		display: block;
	}
`;
