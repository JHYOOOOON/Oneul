import styled from "styled-components";

import { searchItemType } from "@/state";
import { formatTime } from "@/utils";

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
			<AlbumTitle>{album.name}</AlbumTitle>
			<Time>{formatTime(duration_ms)}</Time>
		</Wrapper>
	);
};

export default ListItem;

const Wrapper = styled.li`
	display: grid;
	grid-template-columns: 20px 6fr 2.2fr minmax(30px, 45px);
	align-items: center;
	gap: 10px;
	padding: 10px 10px;
	&:nth-child(2n) {
		background-color: ${({ theme }) => `${theme.color.primary400}50`};
	}
	&:hover {
		background-color: ${({ theme }) => `${theme.color.primary400}`};
	}
`;

const AlbumImage = styled.img`
	width: 50px;
	height: 50px;
	object-fit: cover;
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
	line-height: 1.15;
	font-size: ${({ theme }) => theme.textSize.lg}rem;
`;

const Name = styled.p`
	font-size: ${({ theme }) => theme.textSize.sm}rem;
`;

const AlbumTitle = styled.p`
	line-height: 1.15;
	font-size: ${({ theme }) => theme.textSize.sm}rem;
`;

const Time = styled.p`
	line-height: 1.15;
	font-size: ${({ theme }) => theme.textSize.sm}rem;
`;
