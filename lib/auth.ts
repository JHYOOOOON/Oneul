import config from "../config";
import { makeURL } from "@/utils";

export const authorizeUser = () => {
	const loginOptions = {
		client_id: config.SPOTIFY_CLIENT_ID as string,
		redirect_uri: config.CALLBACK_URL,
		response_type: "token",
	};

	window.location.href = makeURL(config.SPOTIFY_AUTHORIZE_URL, loginOptions);
};

export const saveLogin = () => {
	const accessToken = parseAccessToken();

	if (accessToken) {
		localStorage.setItem("accessToken", accessToken);
		return true;
	} else {
		return false;
	}
};

export const getAccessToken = () => (typeof localStorage === "undefined" ? "" : localStorage.getItem("accessToken"));

export const removeAccessToken = () => localStorage.removeItem("accessToken");

const parseAccessToken = () => {
	const url = window.location.href.split("#access_token=");
	return url[url.length - 1];
};
