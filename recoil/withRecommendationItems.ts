import { selector } from "recoil";
import { recommendationItems } from "./atom";
import { recommendationType } from "./types";

export const withRecommendationItems = selector<recommendationType>({
	key: "selector/withRecommendationItems",
	get: ({ get }) => get(recommendationItems),
	set: ({ set }, newValue) => set(recommendationItems, newValue),
});
