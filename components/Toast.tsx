import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled, { css } from "styled-components";

import { withShowToast, withToast } from "../recoil";

const Toast = () => {
	const [show, setShow] = useRecoilState(withShowToast);
	const toast = useRecoilValue(withToast);

	useEffect(() => {
		const id = setTimeout(() => {
			setShow(false);
		}, 1500);
		return () => {
			clearTimeout(id);
		};
	}, [show, toast]);

	return (
		<Wrapper show={show}>
			<p>{toast}</p>
		</Wrapper>
	);
};

export default Toast;

const Wrapper = styled.div<{ show: boolean }>`
	position: fixed;
	top: 10%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 15px 25px;
	border-radius: 5px;
	background-color: rgba(0, 0, 0, 0.7);
	font-size: ${({ theme }) => theme.textSize.xl}rem;
	color: ${({ theme }) => theme.color.white};
	opacity: 0;
	transition: all 0.2s;
	${({ show }) =>
		show &&
		css`
			opacity: 1;
		`}
`;
