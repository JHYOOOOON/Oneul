import { selector } from "recoil";

import { recommendationItems } from "./atom";
import { RecommendationType } from "./types";

export const withRecommendationItems = selector<RecommendationType>({
	key: "selector/withRecommendationItems",
	get: ({ get }) => get(recommendationItems),
	set: ({ set }, newValue) => set(recommendationItems, newValue),
});
