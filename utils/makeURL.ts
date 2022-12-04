type queryType = {
	[key: string]: string;
};

const makeURL = (url: string, query: queryType) => {
	let queryStringURL = url;

	queryStringURL +=
		"?" +
		Object.keys(query)
			.map((k) => {
				return encodeURIComponent(k) + "=" + encodeURIComponent(query[k]);
			})
			.join("&");

	return queryStringURL;
};

export default makeURL;
