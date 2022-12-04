import { searchItemType } from "../recoil/types";
import formatTime from "../utils/msToTime";

type ResultItemType = Pick<searchItemType, "id" | "name" | "artists" | "album" | "duration_ms"> & {
	index: number;
};

const ResultItem = ({ id, index, name, artists, album, duration_ms }: ResultItemType) => {
	return (
		<li>
			<p>{index}</p>
			<img src={album.images[1].url} alt={name} />
			<div>
				<p>{name}</p>
				<p>{artists.map((artists) => artists.name).join(", ")}</p>
			</div>
			<p>{album.name}</p>
			<p>{formatTime(duration_ms)}</p>
		</li>
	);
};

export default ResultItem;
