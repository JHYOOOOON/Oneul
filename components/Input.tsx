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
	width: 400px;
	max-width: 80%;
	height: 25px;
	margin-bottom: 15px;
	border-radius: 3px 3px 0 0;
	border: none;
	border-bottom: 2px solid ${({ theme }) => theme.color.primary300};
	padding: 5px 7px;
	font-size: ${({ theme }) => theme.textSize.base}rem;
	background-color: ${({ theme }) => theme.color.gray400};
	transition: border 0.2s;

	&:focus {
		outline: none;
		border-bottom: 2px solid ${({ theme }) => theme.color.primary100};
	}
`;
