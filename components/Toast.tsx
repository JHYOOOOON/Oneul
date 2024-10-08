import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled, { css, keyframes } from "styled-components";

import { withShowToast, withToast } from "@/state";
import { useToast } from "./hooks";

export function ToastConatiner() {
	const toast = useRecoilValue(withToast);

	return <>{toast.length > 0 && toast.map((item) => <Toast key={item.id} id={item.id} text={item.text} />)}</>;
}

type ToastProps = {
	id: string;
	text: string;
};

const TOAST_SHOW_TIME = 1500;

const Toast = React.memo(({ id, text }: ToastProps) => {
	const [show, setShow] = useRecoilState(withShowToast);
	const { removeToast } = useToast();

	useEffect(() => {
		const timerId = setTimeout(() => {
			setShow(false);
			removeToast(id);
		}, TOAST_SHOW_TIME);
		return () => {
			clearTimeout(timerId);
		};
	}, []);

	return (
		<Wrapper show={show}>
			<p>{text}</p>
		</Wrapper>
	);
});

const moveBottomToTop = keyframes`
	0% {
		bottom: 5%;
		opacity: 0;
	}
	15% {
		bottom: 7%;
		opacity: 1;
	}
	85% {
		bottom: 7%;
		opacity: 1;
	}
	100% {
		bottom: 5%;
		opacity: 0;
	}
`;

const Wrapper = styled.div<{ show: boolean }>`
	position: fixed;
	left: 50%;
	width: max-content;
	max-width: 80%;
	transform: translate(-50%, -50%);
	padding: 15px 25px;
	border-radius: 5px;
	background-color: rgba(0, 0, 0, 0.7);
	font-size: ${({ theme }) => theme.textSize.xl}rem;
	color: ${({ theme }) => theme.color.white};
	opacity: 0;
	transition: all 0.2s;
	animation: ${moveBottomToTop} 1.5s linear forwards;
	line-height: 1.2;
	word-break: keep-all;
	z-index: 1000;
	${({ show }) =>
		show &&
		css`
			opacity: 1;
		`}
`;
