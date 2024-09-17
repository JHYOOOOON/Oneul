import React from "react";
import { useRouter } from "next/router";
import { IoHeadset } from "react-icons/io5";

import { Button } from "@/styles";
import { ROUTES } from "@/constants";

export function PrevListenButton() {
	const router = useRouter();

	return (
		<Button $variant="simple" $size="md" $fullWidth onClick={() => router.push(ROUTES.PRELISTEN)}>
			<IoHeadset />
			미리 듣기
		</Button>
	);
}
