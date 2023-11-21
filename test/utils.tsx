import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";

import { Theme } from "@/styles";

const queryClient = new QueryClient();

export const Template = ({ children }: { children: React.ReactNode }) => {
	return (
		<RecoilRoot>
			<ThemeProvider theme={Theme}>
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			</ThemeProvider>
		</RecoilRoot>
	);
};
