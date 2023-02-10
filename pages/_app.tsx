import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";

import { GlobalStyle, Theme } from "@/styles";
import { ToastConatiner } from "@/components";
import "/public/assets/fonts/font.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<GlobalStyle />
			<ThemeProvider theme={Theme}>
				<QueryClientProvider client={queryClient}>
					<Component {...pageProps} />
					<ToastConatiner />
				</QueryClientProvider>
			</ThemeProvider>
		</RecoilRoot>
	);
}
