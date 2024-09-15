import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { TiDelete } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";

import { useSetRecoilState } from "recoil";
import { withSearchValue } from "@/state";

export function Input() {
	const [value, setValue] = useState("");
	const [warning, setWarning] = useState("");
	const setSearchValue = useSetRecoilState(withSearchValue);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const isValueExist = useMemo(() => value.length > 0, [value]);

	const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		if (warning) {
			setWarning("");
		}
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		const isValid = isValidValue();
		if (isValid === false) return;
		const trimmedValue = value.trim();
		setSearchValue(() => trimmedValue);
		setWarning("");
		setValue("");
	};

	const isValidValue = () => {
		if (value.trim().length === 0) {
			setWarning("검색어를 입력해주세요");
			return false;
		}
		const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
		const isInvalid = regExp.test(value);
		if (isInvalid) {
			setWarning("특수문자를 제외한 키워드를 입력해주세요");
			return false;
		}
		return true;
	};

	const handleDeleteValue = () => {
		setValue("");
		if (!inputRef.current) return;
		inputRef.current.focus();
	};

	return (
		<Wrapper>
			<StyledForm onSubmit={handleSubmit}>
				{value === "" && (
					<Placeholder>
						<IoIosSearch />
						<p>어떤 곡을 즐겨 들으세요?</p>
					</Placeholder>
				)}
				<StyledInput onChange={handleChange} value={value} ref={inputRef} />
				{isValueExist && (
					<StyledDeleteButton type="button" onClick={handleDeleteValue}>
						<TiDelete />
					</StyledDeleteButton>
				)}
			</StyledForm>
			<Warning>{warning}</Warning>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 15px;
`;

const Placeholder = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	padding: 5px 7px;
	font-size: ${({ theme }) => theme.textSize.sm}rem;
	color: ${({ theme }) => theme.color.gray100};
`;

const StyledForm = styled.form`
	position: relative;
	display: flex;
	width: 80%;
	max-width: 300px;
	height: 32px;
	border-radius: 3px 3px 0 0;
	border-bottom: 2px solid ${({ theme }) => theme.color.primary300};
	background-color: ${({ theme }) => theme.color.gray400};
	overflow: hidden;
	transition: border 0.1s;
	&:has(input:focus) {
		border-bottom: 2px solid ${({ theme }) => theme.color.primary200};
	}
`;

const StyledInput = styled.input`
	position: absolute;
	top: 0;
	left: 7px;
	width: calc(100% - 7px - 32px - 5px);
	height: 100%;
	display: flex;
	align-items: center;
	flex: 1;
	border-radius: 3px 3px 0 0;
	border: none;
	font-size: ${({ theme }) => theme.textSize.sm}rem;
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
	color: ${({ theme }) => theme.color.gray100};
	cursor: pointer;
	&:hover,
	&:focus {
		color: ${({ theme }) => theme.color.gray};
		transform: rotate(90deg);
	}
`;

const Warning = styled.p`
	margin-top: 2px;
	font-size: ${({ theme }) => theme.textSize.xs}rem;
	color: ${({ theme }) => theme.color.red};
`;
