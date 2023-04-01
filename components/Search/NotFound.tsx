import styled from "styled-components";

function NotFound() {
	return (
		<Wrapper>
			<ImageWrapper>
				<img src="/assets/images/typeA.png" alt="green note character on the cloud" />
				<Description>
					검색 결과가 없습니다.
					<br />
					다른 검색어를 입력하시거나, 검색어에 오탈자가 없는지 확인해보세요.
				</Description>
				<img src="/assets/images/typeB.png" alt="blue note character on the cloud" />
			</ImageWrapper>
		</Wrapper>
	);
}

export default NotFound;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 400px;
	gap: 10px;
	padding: 20px 0;
`;

const ImageWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-width: 320px;
	max-width: 700px;
	position: relative;
	flex: 1;
	margin: 0 auto;

	img {
		position: absolute;
		animation: bounce 2s infinite ease-in-out both;
		width: 50%;
		&:first-child {
			top: 2%;
			left: 0%;
			animation-delay: -0.5s;
			max-width: 180px;
		}
		&:last-child {
			bottom: 3%;
			right: 2%;
			animation-delay: -1s;
			max-width: 200px;
		}
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(-3%);
		}

		44% {
			transform: translateY(3%);
		}
	}
`;

const Description = styled.p`
	text-align: center;
	line-height: 1.2;
	font-size: ${({ theme }) => theme.textSize.lg}rem;
	word-break: keep-all;
`;
