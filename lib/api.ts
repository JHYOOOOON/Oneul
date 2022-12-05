import axios from "axios";

import config from "../config";
import { getAccessToken } from "./auth";

const instance = axios.create({
	baseURL: config.API_URL,
	headers: {
		Authorization: `Bearer ${getAccessToken()}`,
	},
});

export const search = (term: string, startIndex: number = 0) =>
	instance.get("/search", {
		params: {
			q: term,
			type: "track",
			offset: startIndex,
		},
	});

export const recommendations = (artists: string[], genres: string[], tracks: string[]) =>
	instance.get("/recommendations", {
		params: {
			seed_artists: artists.join(","),
			seed_genres: genres.join(","),
			seed_tracks: tracks.join(","),
		},
	});