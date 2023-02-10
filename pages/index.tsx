import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { removeAccessToken, RestAPI } from "@/lib";
import { LoginButton } from "@/components/Home";

export default function Home() {
	const router = useRouter();
	useQuery({
		queryKey: "checkValid",
		queryFn: async () => await RestAPI.isTokenValid(),
		retry: 0,
		onSuccess: () => {
			router.push("/search");
		},
		onError: () => {
			removeAccessToken();
		},
	});

	return (
		<div>
			<LoginButton />
		</div>
	);
}
