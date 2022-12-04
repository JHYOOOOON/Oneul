const config = {
	API_URL: "https://api.spotify.com/v1",
	SPOTIFY_AUTHORIZE_URL: "https://accounts.spotify.com/authorize",
	SPOTIFY_CLIENT_ID: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
	CALLBACK_URL: typeof window !== "undefined" ? `${window.location.origin}/callback` : "",
};

export default config;
