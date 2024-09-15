import styled, { css } from "styled-components";

import { SearchItemType } from "@/state";
import { formatTime } from "@/utils";
import React from "react";

type ListItemType = {
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	children: React.ReactNode;
};

export function ListItem({ onMouseEnter, onMouseLeave, children }: ListItemType) {
	return (
		<Wrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			{children}
		</Wrapper>
	);
}

const Index = ({ children }: React.PropsWithChildren) => <StyledIndex>{children}</StyledIndex>;

type SongInformType = Pick<SearchItemType, "name" | "artists" | "album">;

const SongInform = ({ album, name, artists }: SongInformType) => {
	return (
		<SongInfo>
			<AlbumImage src={album.images[2].url} alt={name} />
			<SongWrapper>
				<Title>{name}</Title>
				<Name>{artists.map((artists) => artists.name).join(", ")}</Name>
			</SongWrapper>
		</SongInfo>
	);
};

const AlbumTitle = ({ album }: Pick<SearchItemType, "album">) => (
	<StyledAlbumTitle title={album.name}>{album.name}</StyledAlbumTitle>
);

const Duration = ({ duration_ms }: Pick<SearchItemType, "duration_ms">) => <Time>{formatTime(duration_ms)}</Time>;

ListItem.Index = Index;
ListItem.SongInform = SongInform;
ListItem.AlbumTitle = AlbumTitle;
ListItem.Duration = Duration;

const StyledIndex = styled.p`
	width: 20px;
	font-family: "Moirai" !important;
	font-size: ${({ theme }) => theme.textSize.lg}rem;
	text-align: center;
`;

const Wrapper = styled.li`
	display: flex;
	align-items: center;
	gap: 7px;
	padding: 7px 10px;
	border-radius: 10px;
	border-bottom: 3px solid rgba(0, 0, 0, 0.05);
	border-right: 1px solid rgba(0, 0, 0, 0.02);
	/* box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px; */
	background-color: ${({ theme }) => theme.color.white};
`;

const AlbumImage = styled.img`
	width: 45px;
	height: 45px;
	object-fit: cover;
`;

const SongInfo = styled.div`
	display: flex;
	gap: 10px;
	flex: 1;
`;

const SongWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 3px;
`;

const Title = styled.p`
	line-height: 1.15;
	font-size: ${({ theme }) => theme.textSize.base}rem;
`;

const Name = styled.p`
	font-size: ${({ theme }) => theme.textSize.xs}rem;
	color: ${({ theme }) => theme.color.black200};
`;

const mobile = css`
	${({ theme }) => theme.mediaQuery.mobile} {
		display: none;
	}
`;

const StyledAlbumTitle = styled.p`
	width: 70px;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	text-overflow: ellipsis;
	overflow: hidden;
	word-break: auto-phrase;
	color: ${({ theme }) => theme.color.black200};
	font-size: ${({ theme }) => theme.textSize.xs}rem;
	text-align: left;
	line-height: 1.15;
	${mobile}
`;

const Time = styled.p`
	font-size: ${({ theme }) => theme.textSize.xs}rem;
	color: ${({ theme }) => theme.color.black200};
	line-height: 1.15;
`;
