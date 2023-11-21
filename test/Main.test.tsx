import { useRouter } from "next/router";

import { fireEvent, render, screen } from "@testing-library/react";

import { Template } from "./utils";
import Main from "@/pages/main";

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

describe("UI 배치", () => {
	(useRouter as jest.Mock).mockReturnValue({ query: {} });

	test.each(["추천곡 찾기", "많이 들은 곡"])("버튼", (value) => {
		render(
			<Template>
				<Main />
			</Template>
		);
		const button = screen.getByText(value);
		expect(button).toBeInTheDocument();
	});
	it("툴팁", () => {
		render(
			<Template>
				<Main />
			</Template>
		);
		[
			{
				name: "추천곡 찾기",
				tooltip: "평소 즐겨듣는 곡을 담은 후, 해당 목록으로 추천곡을 받아볼 수 있습니다.",
			},
			{
				name: "많이 들은 곡",
				tooltip: "최근 몇 개월 내에 많이 들은 곡을 확인 후, 이를 바탕으로 추천곡을 받아볼 수 있습니다.",
			},
		].forEach((description) => {
			const { name, tooltip } = description;
			fireEvent.mouseOver(screen.getByText(name));
			expect(screen.getByText(tooltip)).toBeInTheDocument();
		});
	});
});
