import axios, { AxiosInstance } from "axios";

import config from "../config";
import { getAccessToken } from "./auth";
import { removeAccessToken } from ".";
import { SEARCH_ITEM_LIMIT } from "../constants";

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

	search = async (term: string, startPage: number = 0) =>
		(await this.instance()).get("/search", {
			params: {
				q: term,
				type: "track",
				offset: startPage * SEARCH_ITEM_LIMIT,
				limit: SEARCH_ITEM_LIMIT,
			},
		});

	recommendations = async (tracks: string[]) =>
		(await this.instance()).get("/recommendations", {
			params: {
				seed_tracks: tracks.join(","),
			},
		});

	isTokenValid = async () =>
		new Promise(async (resolve, reject) => {
			(await this.instance())
				.get("/me")
				.then(() => resolve(true))
				.catch(() => resolve(false));
		});
}

const instance = new RestAPI();

export { instance as RestAPI };
