import { useEffect } from "react";
import { useRouter } from "next/router";

import { authorizeUser, isAccessTokenExist, RestAPI } from "@/lib";

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
			<button onClick={authorizeUser}>스포티파이 로그인</button>
		</div>
	);
}
