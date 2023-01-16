import { useEffect } from "react";
import { useRouter } from "next/router";

import { authorizeUser, isAccessTokenExist } from "../lib";

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		if (isAccessTokenExist()) {
			router.push("/search");
		}
	}, []);

	return (
		<div>
			<button onClick={authorizeUser}>스포티파이 로그인</button>
		</div>
	);
}
