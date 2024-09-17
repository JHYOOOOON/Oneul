import React from "react";
import Link from "next/link";
import styled from "styled-components";

import { ArtistType } from "@/state/types";

type CardType = {
	rank: number;
	showRank?: boolean;
} & ArtistType;

export function Card({ name, images, uri, rank, showRank = true }: CardType) {
	return (
		<Wrapper>
			<StyledLink target="_blank" href={uri} title={`스포티파이 ${name} 페이지로 이동하기`}>
				<ImageWrapper>
					<AlbumImage src={images[1].url} alt={name} />
				</ImageWrapper>
				<SongWrapper>
					{name}
					{showRank && rank <= 3 ? <Rank>{rank}</Rank> : null}
				</SongWrapper>
			</StyledLink>
		</Wrapper>
	);
}

const Wrapper = styled.li`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
	min-width: 120px;
	min-height: 100%;
	height: max-content;
	border-radius: 4px;
	overflow: hidden;
	cursor: pointer;
	overflow: hidden;
	transition: all 0.2s;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
	${({ theme }) => theme.mediaQuery.mobile} {
		min-width: 60px;
	}
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: ${({ theme }) => theme.color.black100};
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
	padding-bottom: 13px;
	font-size: ${({ theme }) => theme.textSize.base}rem;
	word-break: keep-all;
	line-height: 1.2;
`;

const Rank = styled.p`
	position: absolute;
	bottom: 2px;
	right: 8px;
	font-family: "Moirai" !important;
	font-weight: 700;
	font-size: ${({ theme }) => theme.textSize.xxl}rem;
	color: ${({ theme }) => theme.color.primary100};
`;
