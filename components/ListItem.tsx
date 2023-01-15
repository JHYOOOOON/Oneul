import styled from "styled-components";

import { searchItemType } from "../recoil/types";
import formatTime from "../utils/msToTime";

type ListItemType = Pick<searchItemType, "name" | "artists" | "album" | "duration_ms"> & {
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	children: React.ReactNode;
};

const ListItem = ({ onMouseEnter, onMouseLeave, children, name, artists, album, duration_ms }: ListItemType) => {
	return (
		<Wrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			{children}
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

export default ListItem;

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
