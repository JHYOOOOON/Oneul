import { useState } from "react";
import { HiMinus } from "react-icons/hi";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { withCartItems } from "../recoil";

import formatTime from "../utils/msToTime";
import Maybe from "./Maybe";

type CartItemType = {
	id: string;
	index: number;
};

const CartItem = ({ id, index }: CartItemType) => {
	const [hovered, setHovered] = useState(false);
	const cartItem = useRecoilValue(withCartItems(id));
	const deleteCartItem = useResetRecoilState(withCartItems(id));

	const handleDeleteItem = () => {
		deleteCartItem();
	};

	return (
		<Wrapper onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
			<Maybe
				test={hovered}
				truthy={
					<Button title={`${cartItem?.name} 삭제하기`} onClick={handleDeleteItem}>
						<HiMinus />
					</Button>
				}
				falsy={<Index>{index}</Index>}
			/>
			<SongInfo>
				<AlbumImage src={cartItem?.album.images[1].url} alt={cartItem?.name} />
				<SongWrapper>
					<Title>{cartItem?.name}</Title>
					<Name>{cartItem?.artists.map((artists) => artists.name).join(", ")}</Name>
				</SongWrapper>
			</SongInfo>
			<p>{cartItem?.album.name}</p>
			<p>{formatTime(cartItem!.duration_ms)}</p>
		</Wrapper>
	);
};

export default CartItem;

const Wrapper = styled.li`
	display: grid;
	grid-template-columns: 20px 6fr 2.5fr minmax(50px, 1fr);
	align-items: center;
	gap: 10px;
	height: 60px;
	padding: 2px 10px;
	&:nth-child(2n) {
		background-color: rgba(0, 0, 0, 0.05);
	}
	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`;

const Index = styled.p`
	text-align: center;
	font-size: ${({ theme }) => theme.textSize.sm}rem;
`;

const AlbumImage = styled.img`
	width: 50px;
	height: 50px;
`;

const SongInfo = styled.div`
	display: flex;
	gap: 10px;
`;

const SongWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 5px;
`;

const Title = styled.p`
	font-size: ${({ theme }) => theme.textSize.lg}rem;
`;

const Name = styled.p`
	font-size: ${({ theme }) => theme.textSize.sm}rem;
`;

const Button = styled.button`
	border: none;
	background: none;
	padding: 0;
	cursor: pointer;
`;
