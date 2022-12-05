import { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import Input from "../components/Input";
import ResultSection from "../components/ResultSection";
import SelectedSection from "../components/SelectedSection";
import { isAccessTokenExist } from "../lib/auth";

export default function Search() {
	const router = useRouter();

	useEffect(() => {
		if (isAccessTokenExist() === false) {
			router.push("/");
		}
	}, []);

	return (
		<Wrapper>
			<LeftSide>
				<Input />
				<ResultSection />
			</LeftSide>
			<SelectedSection />
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1.5fr 1fr;
`;

const LeftSide = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;
