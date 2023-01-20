import { useRouter } from "next/router";
import { IoChevronBackOutline } from "react-icons/io5";
import styled from "styled-components";

const BackButton = () => {
	const router = useRouter();
	return (
		<StyledButton onClick={() => router.push("/search")} title="뒤로가기">
			<IoChevronBackOutline />
		</StyledButton>
	);
};

export default BackButton;

const StyledButton = styled.button`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: none;
	position: absolute;
	top: 30px;
	left: 30px;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	font-size: ${({ theme }) => theme.textSize.xxl}rem;
	background-color: ${({ theme }) => theme.color.primary200};
	color: ${({ theme }) => theme.color.white};
	box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
	transition: background-color 0.2s;
	cursor: pointer;
	&:hover {
		background-color: ${({ theme }) => theme.color.primary100};
	}
`;
