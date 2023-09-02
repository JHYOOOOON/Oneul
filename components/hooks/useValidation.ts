import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

import { ROUTES } from "@/constants";
import { RestAPI, removeAccessToken } from "@/lib";
import { withUserId } from "@/state";

export function useValidation(onSuccess: () => void) {
	const router = useRouter();
	const [userId, setUserId] = useRecoilState(withUserId);
	useQuery({
		queryKey: "checkValid",
		queryFn: async () => await RestAPI.isTokenValid(),
		retry: 0,
		refetchOnWindowFocus: false,
		refetchOnMount: true,
		onSuccess: (res) => {
			onSuccess && onSuccess();
			const {
				data: { id },
			} = res;
			setUserId(id);
		},
		onError: () => {
			removeAccessToken();
			router.push(ROUTES.HOME);
		},
	});

	return { userId, setUserId };
}
