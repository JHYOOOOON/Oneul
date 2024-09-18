import styled from "styled-components";

export function NotFound() {
	return (
		<Wrapper>
			<ImageWrapper>
				<img src="/assets/images/typeA.png" alt="green note character on the cloud" />
				<Description>
					<p>검색 결과가 없어요.</p>
					<p>
						다른 검색어를 입력하시거나,
						<br />
						검색어에 오탈자가 없는지 확인해보세요.
					</p>
				</Description>
				<img src="/assets/images/typeB.png" alt="blue note character on the cloud" />
			</ImageWrapper>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	position: relative;
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 10px;
	padding: 20px 0;
`;

const ImageWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	position: relative;
	flex: 1;
	margin: 0 auto;

	img {
		position: absolute;
		animation: bounce 2s infinite ease-in-out both;
		width: 40%;
		&:first-child {
			top: 2%;
			left: 0%;
			animation-delay: -0.5s;
			max-width: 150px;
		}
		&:last-child {
			bottom: 3%;
			right: 2%;
			animation-delay: -1s;
			max-width: 180px;
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
	word-break: keep-all;
	font-size: ${({ theme }) => theme.textSize.sm}rem;
	color: ${({ theme }) => theme.color.black200};
	p:first-child {
		font-size: ${({ theme }) => theme.textSize.lg}rem;
		margin-bottom: 5px;
		color: ${({ theme }) => theme.color.black100};
	}
`;
