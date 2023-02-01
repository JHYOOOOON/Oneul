import { useEffect } from "react";
import { useRouter } from "next/router";

import { isAccessTokenExist, RestAPI } from "@/lib";
import { LoginButton } from "@/components/Home";

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		(async () => {
			const isValid = await RestAPI.isTokenValid();
			if (isAccessTokenExist() && isValid) {
				router.push("/search");
			}
		})();
	}, []);

	return (
		<div>
			<LoginButton />
		</div>
	);
}
