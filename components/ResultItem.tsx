import { useState } from "react";
import styled from "styled-components";
import { HiPlus } from "react-icons/hi";

import { searchItemType } from "../recoil/types";
import formatTime from "../utils/msToTime";
import Maybe from "./Maybe";

type ResultItemType = Pick<searchItemType, "id" | "name" | "artists" | "album" | "duration_ms"> & {
	index: number;
};

const ResultItem = ({ id, index, name, artists, album, duration_ms }: ResultItemType) => {
	const [hovered, setHovered] = useState(false);

	return (
		<Wrapper onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
			<Maybe
				test={hovered}
				truthy={
					<Button title={`${name} 담기`}>
						<HiPlus />
					</Button>
				}
				falsy={<Index>{index}</Index>}
			/>
			<SongInfo>
				<AlbumImage src={album.images[1].url} alt={name} />
				<SongWrapper>
					<Title>{name}</Title>
					<Name>{artists.map((artists) => artists.name).join(", ")}</Name>
				</SongWrapper>
			</SongInfo>
			<p>{album.name}</p>
			<p>{formatTime(duration_ms)}</p>
		</Wrapper>
	);
};

export default ResultItem;

const Wrapper = styled.li`
	display: grid;
	grid-template-columns: 20px 6fr 3fr minmax(50px, 1fr);
	align-items: center;
	gap: 10px;
	height: 60px;
	padding-left: 10px;
	&:not(:last-child) {
		margin-bottom: 10px;
	}
	&:hover {
		background-color: rgba(0, 0, 0, 0.05);
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
