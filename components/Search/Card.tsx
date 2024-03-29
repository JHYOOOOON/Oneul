import React, { MouseEvent } from "react";
import { useSetRecoilState } from "recoil";
import { HiPlus } from "react-icons/hi";
import styled, { css } from "styled-components";

import { SearchItemType } from "@/state/types";
import { withCartItems } from "@/state";
import { useToast } from "../hooks";
import { MAX_ITEM_LEN } from "@/constants";

type ResultItemType = Pick<SearchItemType, "id" | "name" | "artists" | "album" | "duration_ms"> & {
	index: number;
	isMoreSelectAvailable: boolean;
	isExist: (id: string) => boolean;
};

export function Card({ id, name, artists, album, duration_ms, isMoreSelectAvailable, isExist }: ResultItemType) {
	const setCartItem = useSetRecoilState(withCartItems(id));
	const { addToast } = useToast();

	const handleSelectItem = (event: MouseEvent<HTMLButtonElement>) => {
		if (isMoreSelectAvailable) {
			alert(`곡은 최대 ${MAX_ITEM_LEN}개까지만 담을 수 있습니다`);
		}
		if (isExist(id)) {
			addToast("이미 담겨있는 곡입니다.");
			return;
		}

		setCartItem({
			id,
			name,
			artists,
			album,
			duration_ms,
		});
		addToast("정상적으로 담겼습니다.");
		event.currentTarget.blur();
	};

	return (
		<Wrapper>
			<HoverWrapper>
				<StyledButton onClick={handleSelectItem} title={`${name} 담기`} aria-label={`${name} 담기`}>
					<HiPlus />
				</StyledButton>
			</HoverWrapper>
			<ImageWrapper>
				<AlbumImage src={album.images[1].url} alt={name} />
			</ImageWrapper>
			<SongWrapper>
				<Title>{name}</Title>
				<Name>{artists.map((artists) => artists.name).join(", ")}</Name>
			</SongWrapper>
		</Wrapper>
	);
}

const Wrapper = styled.li`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
	border-radius: 2px;
	overflow: hidden;
	cursor: pointer;
	overflow: hidden;
	transition: all 0.2s;
	box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px 0px;
`;

const CardShowStyle = css`
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 1;
	background-color: rgba(255, 255, 255, 0.5);
	transition: opacity 0.2s;
`;

const HoverWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;

	&:has(button:focus) {
		${CardShowStyle}
	}
	${Wrapper}:hover & {
		${CardShowStyle}
	}
`;

const StyledButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 35px;
	height: 35px;
	border: none;
	background-color: ${({ theme }) => theme.color.primary100};
	color: white;
	border-radius: 50%;
	cursor: pointer;
	font-size: ${({ theme }) => theme.textSize.lg}rem;
	transition: background-color 0.2s;
	&:hover {
		background-color: ${({ theme }) => theme.color.primary};
		color: white;
	}
`;

const ImageWrapper = styled.div`
	width: 100%;
	aspect-ratio: 1/1;
	overflow: hidden;
`;

const AlbumImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const SongWrapper = styled.section`
	padding: 7px 10px;
`;

const Title = styled.h2`
	font-size: ${({ theme }) => theme.textSize.base}rem;
	margin-bottom: 5px;
	word-break: keep-all;
	line-height: 1.15;
`;

const Name = styled.p`
	font-size: ${({ theme }) => theme.textSize.xs}rem;
	color: #333;
`;
