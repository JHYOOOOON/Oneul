import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { useResetRecoilState } from "recoil";
import styled from "styled-components";

import { useSearch } from "@/components/Search/hooks";
import { withPage } from "@/state";

const Input = () => {
	const [value, setValue] = useState("");
	const { setSearchValue, getSearchDatas } = useSearch();
	const resetPage = useResetRecoilState(withPage);
	const isValueExist = useMemo(() => value.length > 0, [value]);

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

	const handleDeleteValue = () => setValue("");

	return (
		<StyledForm onSubmit={handleSubmit}>
			<StyledInput placeholder="어떤 곡을 자주 들으시나요?" onChange={handleChange} value={value} />
			{isValueExist && (
				<StyledDeleteButton type="button" onClick={handleDeleteValue}>
					<TiDelete />
				</StyledDeleteButton>
			)}
		</StyledForm>
	);
};

export default Input;

const StyledForm = styled.form`
	position: relative;
	display: flex;
	width: 350px;
	max-width: 80%;
	height: 32px;
	margin-bottom: 15px;
	border-radius: 3px 3px 0 0;
	border-bottom: 2px solid ${({ theme }) => theme.color.primary300};
	background-color: ${({ theme }) => theme.color.gray400};
	overflow: hidden;
`;

const StyledInput = styled.input`
	flex: 1;
	border-radius: 3px 3px 0 0;
	border: none;
	padding: 5px 7px;
	font-size: ${({ theme }) => theme.textSize.base}rem;
	background-color: transparent;
	transition: border 0.2s;
	&:focus {
		outline: none;
	}
`;

const StyledDeleteButton = styled.button`
	display: flex;
	align-items: center;
	height: 100%;
	position: absolute;
	top: 0;
	right: 0;
	border: none;
	transition: all 0.2s;
	font-size: ${({ theme }) => theme.textSize.xxl}rem;
	color: ${({ theme }) => theme.color.gray};
	cursor: pointer;
	&:hover {
		color: ${({ theme }) => theme.color.black100};
		transform: rotate(90deg);
	}
`;
