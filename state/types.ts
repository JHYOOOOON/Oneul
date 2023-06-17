export type IdsType = string[];

export type CartItemsType = CartItemType | null;

export type CartItemType = {
	id: string;
	name: string;
	artists: ArtistsType[];
	album: AlbumType;
	duration_ms: number;
};

export type SearchResultsType = SearchItemType[] | null;

export type SearchItemType = {
	artists: ArtistsType[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	href: string;
	id: string;
	is_playable: boolean;
	name: string;
	popularity: number;
	priview_url: string;
	track_number: number;
	type: string;
	uri: string;
};

type AlbumType = {
	album_type: string;
	artists: ArtistsType[];
	href: string;
	id: string;
	name: string;
	release_date: string;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	images: ImageType[];
};

type ArtistsType = {
	id: string;
	name: string;
};

type ImageType = {
	width: number;
	height: number;
	url: string;
};

type TrackType = {
	album: AlbumType;
	artists: ArtistsType[];
	duration_ms: number;
	explicit: boolean;
	href: string;
	id: string;
	is_local: boolean;
	name: string;
	popularity: number;
	preview_url: string;
	track_number: number;
	uri: string;
};

export type RecommendationType = TrackType[];

type ToastItemType = {
	text: string;
	id: string;
};

export type ToastType = ToastItemType[];
