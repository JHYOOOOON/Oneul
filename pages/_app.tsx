import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import Toast from "../components/Toast";

import GlobalStyle from "../styles/GlobalStyle";
import * as Theme from "../styles/theme";
import "/public/assets/fonts/font.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<GlobalStyle />
			<ThemeProvider theme={Theme}>
				<Component {...pageProps} />
				<Toast />
			</ThemeProvider>
		</RecoilRoot>
	);
}
