import { Suspense, useEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import cx from "classnames";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import { Loader, Card } from "@/components";
import { DATE } from "@/constants";
import { Description, PageWrapper, Title, WrapperPaddingX } from "@/styles";
import { TIME_RANGE_TYPE } from "@/state";
import { useTopArtists, useValidation } from "@/components/hooks";

export default function Artists() {
	const [term, setTerm] = useState<TIME_RANGE_TYPE>("short_term");
	const [isOpen, setIsOpen] = useState(false);
	const { getTopArtists, topArtists } = useTopArtists({ term });
	useValidation();

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (!(event.target as HTMLElement).closest(".select-box")) {
				setIsOpen(false);
			}
		};

		getTopArtists();
		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, []);

	const handleTermChange = (event: React.MouseEvent<HTMLButtonElement>) => {
		setTerm((event.target as HTMLButtonElement).value as TIME_RANGE_TYPE);
		setIsOpen(false);
	};

	return (
		<>
			<Head>
				<title>즐겨 찾은 아티스트 | Oneul</title>
			</Head>
			<Suspense fallback={<Loader position="center" size="full" />}>
				<StyledPageWrapper>
					<div>
						<Title>즐겨 찾은 아티스트</Title>
						<Description>이 기간에 애정한 아티스트들이에요 ❤️‍🔥</Description>
					</div>
					<Suspense fallback={<Loader position="top" size="parent" />}>
						<Wrapper>
							<SelectboxWrapper>
								<Selectbox className="select-box">
									<Option
										onClick={(event) => {
											event.stopPropagation();
											setIsOpen((prev) => !prev);
										}}
									>
										{DATE[term]}
										{isOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
									</Option>
									{isOpen && (
										<OptionList>
											{["short_term", "medium_term", "long_term"].map((value) => (
												<li>
													<Option className={cx({ active: term === value })} onClick={handleTermChange} value={value}>
														{DATE[value]}
													</Option>
												</li>
											))}
										</OptionList>
									)}
								</Selectbox>
							</SelectboxWrapper>
							<StyledUl>
								{topArtists.map((artists, index) => (
									<Card key={artists.id} {...artists} rank={index + 1} />
								))}
							</StyledUl>
						</Wrapper>
					</Suspense>
				</StyledPageWrapper>
			</Suspense>
		</>
	);
}

const Wrapper = styled.div`
	flex: 1;
	position: relative;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	margin: 0 -5px;
`;

const StyledPageWrapper = styled(PageWrapper)`
	display: flex;
	flex-direction: column;
	overflow: hidden;
	padding: 30px 0;
	${WrapperPaddingX}
`;

const SelectboxWrapper = styled.div`
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	padding: 0 5px;
`;

const Selectbox = styled.div`
	position: relative;
	border: 1px solid ${({ theme }) => theme.color.primary300};
	border-radius: 3px;
`;

const Option = styled.button`
	display: flex;
	align-items: center;
	gap: 3px;
	width: 100%;
	background: none;
	border: none;
	padding: 5px 7px;
	font-size: ${({ theme }) => theme.textSize.xs}rem;
	background-color: ${({ theme }) => theme.color.white};
	cursor: pointer;
	&.active,
	&:hover {
		background-color: ${({ theme }) => theme.color.primary300};
	}
`;

const OptionList = styled.ul`
	position: absolute;
	top: 50%;
	left: calc(100% - 20px);
	display: flex;
	flex-direction: column;
	width: max-content;
	height: max-content;
	border-radius: 3px;
	border: 1px solid ${({ theme }) => theme.color.primary400};
	background-color: ${({ theme }) => theme.color.white};
	z-index: 1;
	button {
		border-bottom: 1px solid ${({ theme }) => theme.color.primary400};
	}
	li:last-child {
		button {
			border-bottom: none;
		}
	}
`;

const StyledUl = styled.ul`
	flex: 1;
	box-sizing: border-box;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
	gap: 10px;
	padding: 0 5px 5px 5px;
	overflow: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
`;
