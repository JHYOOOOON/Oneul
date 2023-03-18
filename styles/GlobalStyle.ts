import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { mediaQuery } from "./theme";

export default createGlobalStyle`
	${reset}
	
	* {
		font-family: "Pretendard", sans-serif !important;
	}

	html {
		${mediaQuery.mobile} {
			font-size: 12px;
		}
		min-width: 320px;
	}

	img {
		content-visibility: auto;
	}
`;
