import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
	${reset}
	html {
		font-family: "Pretendard", sans-serif;
	}
`;
