import React, { MouseEventHandler, PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { PiTrashLight } from "react-icons/pi";
import { RiPlayListAddFill } from "react-icons/ri";

import { SearchItemType } from "@/state";
import { formatTime } from "@/utils";
import Link from "next/link";

type ListItemType = {
	variant?: "rounded" | "simple";
} & PropsWithChildren;

export function ListItem({ variant = "rounded", children }: ListItemType) {
	return <Wrapper $variant={variant}>{children}</Wrapper>;
}

type AddType = {
	onClick: MouseEventHandler<HTMLButtonElement>;
	title: string;
};

const Header = ({ children }: PropsWithChildren) => {
	return <StyledHeader>{children}</StyledHeader>;
};

const HeaderIndex = () => <StyledIndex>#</StyledIndex>;

const HeaderTitle = () => <SongInfo href="#">곡 정보</SongInfo>;

const HeaderAlbum = () => <StyledAlbumTitle>앨범 제목</StyledAlbumTitle>;

const HeaderDuration = () => <Time>재생 시간</Time>;

const HeaderButton = () => <StyledAdd />;

const Add = ({ onClick, title }: AddType) => (
	<StyledAdd onClick={onClick} title={title}>
		<RiPlayListAddFill />
	</StyledAdd>
);

const Remove = ({ onClick, title }: AddType) => (
	<StyledAdd onClick={onClick} title={title}>
		<PiTrashLight />
	</StyledAdd>
);

const Index = ({ children }: React.PropsWithChildren) => <StyledIndex>{children}</StyledIndex>;

type SongInformType = Pick<SearchItemType, "name" | "artists" | "album"> &
	Partial<Pick<SearchItemType, "external_urls">>;

const SongInform = ({ album, name, artists, external_urls = { spotify: "" } }: SongInformType) => {
	return (
		<SongInfo target="_blank" href={external_urls.spotify || "#"}>
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

ListItem.Add = Add;
ListItem.Remove = Remove;
ListItem.Index = Index;
ListItem.SongInform = SongInform;
ListItem.AlbumTitle = AlbumTitle;
ListItem.Duration = Duration;
ListItem.Header = Header;
ListItem.HeaderIndex = HeaderIndex;
ListItem.HeaderTitle = HeaderTitle;
ListItem.HeaderAlbum = HeaderAlbum;
ListItem.HeaderDuration = HeaderDuration;
ListItem.HeaderButton = HeaderButton;

const StyledAdd = styled.button`
	width: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: none;
	border: none;
	font-size: ${({ theme }) => theme.textSize.base}rem;
	color: ${({ theme }) => theme.color.black200};
	padding: 0;
	cursor: pointer;
`;

const StyledHeader = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	height: 30px;
	gap: 7px;
	padding: 2px 10px;
	background-color: ${({ theme }) => theme.color.white};
	color: ${({ theme }) => theme.color.black100};
	font-size: ${({ theme }) => theme.textSize.sm}rem;

	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		width: calc(100% - 10px);
		height: 1px;
		margin-left: 5px;
		background-color: ${({ theme }) => theme.color.gray400};
	}
`;

const StyledIndex = styled.p`
	width: 20px;
	font-family: "Moirai" !important;
	font-size: ${({ theme }) => theme.textSize.lg}rem;
	text-align: center;
`;

const Wrapper = styled.li<{ $variant: "rounded" | "simple" }>`
	position: relative;
	display: flex;
	align-items: center;
	gap: 7px;
	padding: 7px 10px;
	/* box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px; */
	background-color: ${({ theme }) => theme.color.white};
	${({ $variant }) => {
		switch ($variant) {
			case "simple": {
				return css`
					&::after {
						content: "";
						position: absolute;
						bottom: 0;
						left: 0;
						width: calc(100% - 10px);
						height: 1px;
						margin-left: 5px;
						background-color: ${({ theme }) => theme.color.gray400};
					}
				`;
			}
			default:
				return css`
					border-radius: 10px;
					border-bottom: 3px solid rgba(0, 0, 0, 0.05);
					border-right: 1px solid rgba(0, 0, 0, 0.02);
				`;
		}
	}}
`;

const AlbumImage = styled.img`
	width: 45px;
	height: 45px;
	object-fit: cover;
`;

const SongInfo = styled(Link)`
	text-decoration: none;
	display: flex;
	gap: 10px;
	flex: 1;
`;

const SongWrapper = styled.div`
	color: ${({ theme }) => theme.color.black100};
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
