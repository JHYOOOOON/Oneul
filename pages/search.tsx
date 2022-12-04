import { useEffect } from "react";
import { useRouter } from "next/router";

import Input from "../components/Input";
import ResultSection from "../components/ResultSection";
import { isAccessTokenExist } from "../lib/auth";

export default function Search() {
	const router = useRouter();

	useEffect(() => {
		if (isAccessTokenExist() === false) {
			router.push("/");
		}
	}, []);

	return (
		<div>
			<Input />
			<ResultSection />
		</div>
	);
}
