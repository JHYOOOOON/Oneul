import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import { TiDelete } from "react-icons/ti";
import styled from "styled-components";

import { removeAccessToken, RestAPI } from "@/lib";
import { useRecoilState, useSetRecoilState } from "recoil";
import { withSearchResults, withSearchValue } from "@/state";

interface IInput {
	handleLoading: (isLoading: boolean) => void;
}

const Input = ({ handleLoading }: IInput) => {
	const [value, setValue] = useState("");
	const [warning, setWarning] = useState("");
	const setSearchResults = useSetRecoilState(withSearchResults);
	const [searchValue, setSearchValue] = useRecoilState(withSearchValue);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const isValueExist = useMemo(() => value.length > 0, [value]);
	const { isFetching } = useQuery({
		queryKey: ["search", searchValue],
		queryFn: async () => await RestAPI.search(searchValue),
		retry: 0,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		enabled: searchValue.length > 0,
		onSuccess: (data) => {
			setSearchResults(data.data.tracks.items);
		},
		onError: (error: any) => {
			if (error.response.status === 401) {
				removeAccessToken();
			}
		},
	});

	useEffect(() => {
		handleLoading(isFetching);
	}, [isFetching]);

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
				<StyledInput placeholder="어떤 곡을 자주 들으시나요?" onChange={handleChange} value={value} ref={inputRef} />
				{isValueExist && (
					<StyledDeleteButton type="button" onClick={handleDeleteValue}>
						<TiDelete />
					</StyledDeleteButton>
				)}
			</StyledForm>
			<Warning>{warning}</Warning>
		</Wrapper>
	);
};

export default Input;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 15px;
`;

const StyledForm = styled.form`
	position: relative;
	display: flex;
	width: 350px;
	max-width: 80%;
	height: 32px;
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
	&:hover,
	&:focus {
		color: ${({ theme }) => theme.color.black100};
		transform: rotate(90deg);
	}
`;

const Warning = styled.p`
	margin-top: 2px;
	font-size: ${({ theme }) => theme.textSize.xs}rem;
	color: ${({ theme }) => theme.color.red};
`;
