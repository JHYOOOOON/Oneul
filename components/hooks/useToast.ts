import { useRecoilCallback } from "recoil";

import { withToast } from "@/state";
import { v4 } from "uuid";

export function useToast() {
	const addToast = useRecoilCallback(
		({ set }) =>
			(text: string) => {
				set(withToast, (prev) => [
					...prev,
					{
						id: v4(),
						text,
					},
				]);
			},
		[]
	);

	const removeToast = useRecoilCallback(
		({ set }) =>
			(id: string) => {
				set(withToast, (prev) => prev.filter((item) => item.id !== id));
			},
		[]
	);

	return {
		addToast,
		removeToast,
	};
}
