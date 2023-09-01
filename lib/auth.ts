import config from "../config";
import { makeURL } from "@/utils";
import { ACCESS_TOKEN_KEY } from "@/constants";

export const authorizeUser = () => {
	const loginOptions = {
		client_id: config.SPOTIFY_CLIENT_ID as string,
		redirect_uri: config.CALLBACK_URL,
		response_type: "token",
		scope: "playlist-modify-public user-top-read",
	};

	window.location.href = makeURL(config.SPOTIFY_AUTHORIZE_URL, loginOptions);
};

export const saveLogin = () => {
	const accessToken = parseAccessToken();

	if (accessToken) {
		localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
		return true;
	} else {
		return false;
	}
};

export const getAccessToken = () => (typeof localStorage === "undefined" ? "" : localStorage.getItem(ACCESS_TOKEN_KEY));

export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);

const parseAccessToken = () => {
	const url = window.location.href.split("#access_token=");
	return url[url.length - 1];
};
