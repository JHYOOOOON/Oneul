import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
	${reset}
	* {
		font-family: "Pretendard", sans-serif !important;
	}
`;
