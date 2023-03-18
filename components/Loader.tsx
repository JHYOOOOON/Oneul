import React from "react";
import styled, { css } from "styled-components";

type sizeType = "full" | "parent";
type positionType = "center" | "top";

interface ILoading {
	size: sizeType;
	position: positionType;
}

function Loading({ size, position }: ILoading) {
	return (
		<Wrapper size={size} position={position}>
			<ImageWrapper>
				<img src="/assets/images/note.png" alt="note" />
				<img src="/assets/images/note.png" alt="note" />
				<img src="/assets/images/note.png" alt="note" />
			</ImageWrapper>
		</Wrapper>
	);
}

export default Loading;

const Wrapper = styled.div<{ size: sizeType; position: positionType }>`
	display: flex;
	justify-content: center;
	gap: 0.7rem;
	background-color: rgba(255, 255, 255, 0.8);
	z-index: 110;

	${({ size }) => {
		switch (size) {
			case "full":
				return css`
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				`;
			case "parent": {
				return css`
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				`;
			}
		}
	}}

	${({ position }) => {
		switch (position) {
			case "center":
				return css`
					align-items: center;
				`;
			case "top":
				return css`
					${ImageWrapper} {
						margin-top: 200px;
					}
				`;
		}
	}}
`;

const ImageWrapper = styled.div`
	img {
		width: 50px;
		height: 50px;
		animation: bounce 1.4s infinite ease-in-out both;
		&:nth-child(1) {
			animation-delay: -0.5s;
		}
		&:nth-child(2) {
			animation-delay: -1s;
		}
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(-10%);
		}

		44% {
			transform: translateY(10%);
		}
	}
`;
