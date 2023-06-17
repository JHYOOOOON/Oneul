import axios, { AxiosInstance } from "axios";

import config from "../config";
import { getAccessToken } from "./auth";
import { RECOMMENDATION_RESULT_LIMIT, SEARCH_ITEM_LIMIT } from "../constants";

class RestAPI {
	private _instance: AxiosInstance | null = null;

	getInstance = () =>
		axios.create({
			baseURL: config.API_URL,
			headers: {
				Authorization: `Bearer ${getAccessToken()}`,
			},
		});

	instance = (): Promise<AxiosInstance> =>
		new Promise((resolve) => {
			if (this._instance === null) {
				this._instance = this.getInstance();
				resolve(this._instance);
			}
			resolve(this._instance);
		});

	search = async (term: string, offset = 0) =>
		(await this.instance()).get("/search", {
			params: {
				q: term.replaceAll(" ", ""),
				type: "track",
				offset,
				limit: SEARCH_ITEM_LIMIT,
			},
		});

	recommendations = async (tracks: string[]) =>
		(await this.instance()).get("/recommendations", {
			params: {
				seed_tracks: tracks.join(","),
				limit: RECOMMENDATION_RESULT_LIMIT,
			},
		});

	isTokenValid = async () => (await this.instance()).get("/me");

	createPlaylist = async (userId: string, body: { name: string; description: string }) => {
		return (await this.instance()).post(`/users/${userId}/playlists`, body);
	};

	addTracksPlaylist = async (playlistId: string, parameter: { uris: string[] }) =>
		(await this.instance()).post(`/playlists/${playlistId}/tracks`, parameter);
}

const instance = new RestAPI();

export { instance as RestAPI };
