import { useRouter } from "next/router";
import { useEffect } from "react";

import { saveLogin } from "@/lib";
import { ROUTES } from "@/constants";

const Callback = () => {
	const router = useRouter();
	useEffect(() => {
		const loginSuccess = saveLogin();
		if (loginSuccess) {
			router.push(ROUTES.MAIN);
		} else {
			router.push(ROUTES.HOME);
		}
	}, []);

	return (
		<div>
			<p>돌아가는중...</p>
		</div>
	);
};

export default Callback;
