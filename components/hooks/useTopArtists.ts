import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { ROUTES } from "@/constants";
import { RestAPI, removeAccessToken } from "@/lib";
import { ArtistType, TIME_RANGE_TYPE } from "@/state";

interface IUserTopArtists {
	term?: TIME_RANGE_TYPE;
	limit?: number;
}

export function useTopArtists({ term = "short_term", limit = 50 }: IUserTopArtists) {
	const router = useRouter();
	const [topArtists, setTopArtists] = useState<ArtistType[]>([]);

	const { refetch } = useQuery({
		queryKey: ["topArtists", term, limit],
		queryFn: async () => await RestAPI.topArtist(term, limit),
		enabled: true,
		retry: 0,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		onSuccess: (result) => {
			setTopArtists(result.data.items);
		},
		onError: (error: any) => {
			console.log(`[handleTopArtists Error]: ${error}`);
			if (error.response.status === 401) {
				removeAccessToken();
				router.push(ROUTES.HOME);
			}
		},
	});

	return { getTopArtists: refetch, topArtists };
}
