import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import styled, { ThemeProvider } from "styled-components";

import { GlobalStyle, Theme } from "@/styles";
import { ToastConatiner } from "@/components";
import { Header } from "@/components/Header";
import "/public/assets/fonts/font.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<GlobalStyle />
			<ThemeProvider theme={Theme}>
				<QueryClientProvider client={queryClient}>
					<Wrapper>
						<div className="content">
							<Header />
							<Component {...pageProps} />
							<ToastConatiner />
						</div>
					</Wrapper>
				</QueryClientProvider>
			</ThemeProvider>
		</RecoilRoot>
	);
}

const Wrapper = styled.div`
	width: 100%;
	height: 100vh;
	background-color: #f5f5f7;

	.content {
		display: flex;
		flex-direction: column;
		position: relative;
		max-width: 500px;
		width: 100%;
		height: 100%;
		margin: 0 auto;
		background-color: ${({ theme }) => theme.color.white};
		overflow: hidden;
	}
`;
