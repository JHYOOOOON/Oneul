import React, { Dispatch, SetStateAction } from "react";
import cx from "classnames";
import { IoHeadset } from "react-icons/io5";

import { Button } from "@/styles";
import { VIEW_TYPE } from "@/types";

type PrevListenButtonProps = {
	isActive: boolean;
	handleViewType: Dispatch<SetStateAction<VIEW_TYPE>>;
};

export function PrevListenButton({ isActive, handleViewType }: PrevListenButtonProps) {
	return (
		<Button
			$variant="simple"
			$size="md"
			$fullWidth
			className={cx({ active: isActive })}
			onClick={() => handleViewType("prev-listen")}
		>
			<IoHeadset />
			미리 듣기
		</Button>
	);
}
