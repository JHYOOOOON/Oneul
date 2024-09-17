import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { mediaQuery, color } from "./theme";

export default createGlobalStyle`
	${reset}

	* {
		font-family: "Pretendard", sans-serif !important;
		&::selection {
			color: ${color.white};
			background-color: ${color.primary200};
		}
	}

	html {
		${mediaQuery.mobile} {
			font-size: 12px;
		}
		min-width: 320px;
	}

`;
