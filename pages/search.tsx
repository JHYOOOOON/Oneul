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
			<Input />
			<ResultSection />
		</Wrapper>
	);
}

const Wrapper = styled.div`
	position: relative;
	padding: 25px 40px;
`;
