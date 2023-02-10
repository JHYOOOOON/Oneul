import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
	${reset}
	* {
		font-family: "Pretendard", sans-serif !important;
	}
	html {
		@media (max-width: 480px) {
			font-size: 12px;
		}
		min-width: 320px;
	}
`;
