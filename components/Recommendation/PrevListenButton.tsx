import React, { Dispatch, SetStateAction } from "react";
import cx from "classnames";

import { Button } from "@/styles";
import { VIEW_TYPE } from "@/types";

type PrevListenButtonProps = {
	isActive: boolean;
	handleViewType: Dispatch<SetStateAction<VIEW_TYPE>>;
};

function PrevListenButton({ isActive, handleViewType }: PrevListenButtonProps) {
	return (
		<Button className={cx({ active: isActive })} onClick={() => handleViewType("prev-listen")}>
			미리 듣기
		</Button>
	);
}

export default PrevListenButton;
