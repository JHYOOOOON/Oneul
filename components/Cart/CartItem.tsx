import { useState } from "react";
import { HiMinus } from "react-icons/hi";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";

import { ListItem, Maybe } from "@/components";
import { withCartItems } from "@/state";

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
		<ListItem
			name={cartItem!.name}
			artists={cartItem!.artists}
			album={cartItem!.album}
			duration_ms={cartItem!.duration_ms}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<Maybe
				test={hovered}
				truthy={
					<Button title={`${cartItem?.name} 삭제하기`} onClick={handleDeleteItem}>
						<HiMinus />
					</Button>
				}
				falsy={<Index>{index}</Index>}
			/>
		</ListItem>
	);
};

export default CartItem;

const Index = styled.p`
	text-align: center;
	font-size: ${({ theme }) => theme.textSize.sm}rem;
`;

const Button = styled.button`
	border: none;
	background: none;
	padding: 0;
	cursor: pointer;
`;
