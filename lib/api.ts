import axios, { AxiosInstance } from "axios";

import config from "../config";
import { getAccessToken } from "./auth";
import { removeAccessToken } from ".";

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

	search = async (term: string, startIndex: number = 0) =>
		(await this.instance()).get("/search", {
			params: {
				q: term,
				type: "track",
				offset: startIndex,
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
