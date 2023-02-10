import { useEffect, useState } from "react";
import { RiArrowUpSLine } from "react-icons/ri";
import styled from "styled-components";
import { throttle } from "lodash";
import cx from "classnames";

const TopButton = () => {
	const [isShow, setIsShow] = useState(false);

	useEffect(() => {
		const handleScroll = throttle(() => {
			if (window.scrollY < 500) {
				setIsShow(false);
			} else {
				setIsShow(true);
			}
		}, 500);
		document.addEventListener("scroll", handleScroll);
		return () => document.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<StyledButton className={cx({ isShow })} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
			<RiArrowUpSLine />
		</StyledButton>
	);
};

export default TopButton;

const StyledButton = styled.button`
	position: fixed;
	bottom: min(10%, 50px);
	right: min(10%, 50px);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: none;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	padding-bottom: 5px;
	font-size: ${({ theme }) => theme.textSize.xxl}rem;
	background-color: ${({ theme }) => theme.color.primary200};
	color: ${({ theme }) => theme.color.white};
	box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
	opacity: 0;
	transition: background-color, opacity 0.2s;
	visibility: hidden;
	cursor: pointer;
	&.isShow {
		opacity: 1;
		visibility: visible;
	}
	&:hover {
		background-color: ${({ theme }) => theme.color.primary100};
	}
`;
