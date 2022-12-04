export type searchResultsType = searchItemType[] | null;

export type searchItemType = {
	album: albumType;
	artists: artistsType[];
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

type albumType = {
	album_type: string;
	artists: artistsType[];
	href: string;
	id: string;
	name: string;
	release_date: string;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	images: imageType[];
};

type artistsType = {
	id: string;
	name: string;
};

export type imageType = {
	width: number;
	height: number;
	url: string;
};
