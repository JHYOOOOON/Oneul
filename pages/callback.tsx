import { useRouter } from "next/router";
import { useEffect } from "react";
import { saveLogin } from "../lib";

const Callback = () => {
	const router = useRouter();
	useEffect(() => {
		const loginSuccess = saveLogin();
		if (loginSuccess) {
			router.push("/search");
		} else {
			router.push("/");
		}
	}, []);

	return (
		<div>
			<p>돌아가는중...</p>
		</div>
	);
};

export default Callback;
