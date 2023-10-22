import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";

import { RECOMMENDATIONS_KEY, RECOMMENDATION_SEED_LIMIT, ROUTES } from "@/constants";
import { RestAPI, removeAccessToken } from "@/lib";
import { IdsType, withRecommendationItems } from "@/state";

interface IUseRecommendation {
	selectedItemIds: IdsType;
}

export function useRecommendation({ selectedItemIds }: IUseRecommendation) {
	const router = useRouter();
	const setRecommendationItems = useSetRecoilState(withRecommendationItems);

	const { refetch } = useQuery({
		queryKey: "recommendations",
		queryFn: async () => {
			const splitedItemIds = [];
			for (let index = 0; index < selectedItemIds.length; index += RECOMMENDATION_SEED_LIMIT) {
				splitedItemIds.push(selectedItemIds.slice(index, index + RECOMMENDATION_SEED_LIMIT));
			}
			return Promise.all(splitedItemIds.map((ids) => RestAPI.recommendations(ids))).then((data) => data);
		},
		suspense: true,
		enabled: false,
		retry: 0,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		onSuccess: (result) => {
			const tracks = result.reduce((acc, cur) => acc.concat(cur.data.tracks), []);
			setRecommendationItems(tracks);
			localStorage.setItem(RECOMMENDATIONS_KEY, JSON.stringify(tracks));
			router.push(ROUTES.RECOMMENDATION);
		},
		onError: (error: any) => {
			console.log(`[handleRecommendationError]: ${error}`);
			if (error.response.status === 401) {
				removeAccessToken();
				router.push(ROUTES.HOME);
			}
		},
	});

	return { getRecommendation: refetch };
}
