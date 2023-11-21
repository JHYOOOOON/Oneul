import { useRouter } from "next/router";
import { render, screen } from "@testing-library/react";

import { Template } from "./utils";
import Home from "@/pages/index";

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

describe("로그인페이지", () => {
	(useRouter as jest.Mock).mockReturnValue({ query: {} });
	it("UI 배치", () => {
		render(
			<Template>
				<Home />
			</Template>
		);

		const loginButton = screen.getByText("스포티파이로 로그인");
		expect(loginButton).toBeInTheDocument();
	});
});
