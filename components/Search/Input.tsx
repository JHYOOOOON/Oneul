import styled from "styled-components";
import { ChangeEvent, FormEvent, useState } from "react";
import { useResetRecoilState } from "recoil";

import { useSearch } from "@/components/Search/hooks";
import { withPage } from "@/state";

const Input = () => {
	const [value, setValue] = useState("");
	const { setSearchValue, getSearchDatas } = useSearch();
	const resetPage = useResetRecoilState(withPage);

	const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (value.length === 0) {
			alert("검색어를 입력해주세요");
			return;
		}
		resetPage();
		setSearchValue(value);
		getSearchDatas(value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<StyledInput placeholder="어떤 곡을 자주 들으시나요?" onChange={handleChange} value={value} />
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
