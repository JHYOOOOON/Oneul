import styled from "styled-components";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSetRecoilState } from "recoil";

import { withSearchResults } from "../recoil";
import { search, removeAccessToken } from "../lib";

const Input = () => {
	const [searchValue, setSearchValue] = useState("");
	const setSearchResults = useSetRecoilState(withSearchResults);

	const getSearchDatas = async () => {
		try {
			const {
				data: {
					tracks: { items },
				},
			} = await search(searchValue);
			setSearchResults(items);
		} catch (error: any) {
			if (error.response.status === 401) {
				removeAccessToken();
			}
		}
	};

	const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (searchValue.length === 0) {
			alert("검색어를 입력해주세요");
			return;
		}
		getSearchDatas();
	};

	return (
		<form onSubmit={handleSubmit}>
			<StyledInput placeholder="어떤 곡을 자주 들으시나요?" onChange={handleChange} value={searchValue} />
		</form>
	);
};

export default Input;

const StyledInput = styled.input`
	width: 300px;
	height: 20px;
	border-radius: 2px;
	border: none;
	padding: 5px 7px;
	font-size: ${({ theme }) => theme.textSize.base}rem;
`;
