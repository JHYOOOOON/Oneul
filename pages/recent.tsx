import Head from "next/head";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import cx from "classnames";
import { IoHeadset } from "react-icons/io5";
import { RiPlayListFill } from "react-icons/ri";
import { FaRegThumbsUp } from "react-icons/fa";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import { Loader, ListItem, Maybe } from "@/components";
import { RestAPI, removeAccessToken } from "@/lib";
import { ROUTES } from "@/constants";
import { Button, Description, PageWrapper, Title } from "@/styles";
import { RecommendationType } from "@/state";
import { useRecommendation, useSavePlaylist, useToast, useValidation } from "@/components/hooks";

type TIME_RANGE_TYPE = "short_term" | "medium_term" | "long_term";

const DATE: { [key: string]: string } = {
	short_term: "최근 1개월",
	medium_term: "최근 6개월",
	long_term: "전체기간",
} as const;

console.log(DATE);

export default function Search() {
	const router = useRouter();
	const [recentList, setRecentList] = useState<RecommendationType>([]);
	const [term, setTerm] = useState<TIME_RANGE_TYPE>("short_term");
	const [isOpen, setIsOpen] = useState(false);
	const { addToast } = useToast();
	const { save, playlistUrl, setPlaylistUrl } = useSavePlaylist();
	const songIds = recentList.map((item) => item.id);
	const { getRecommendation } = useRecommendation({ selectedItemIds: songIds });
	useValidation();

	useQuery({
		queryKey: ["topTracks", term],
		queryFn: async () => await RestAPI.topTracks(term),
		retry: 0,
		refetchOnWindowFocus: false,
		refetchOnMount: true,
		onSuccess: (res) => {
			const {
				data: { items },
			} = res;
			setRecentList(items);
		},
		onError: () => {
			removeAccessToken();
			router.push(ROUTES.HOME);
		},
	});

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			console.log((event.target as HTMLElement).closest(".select-box"));
			if (!(event.target as HTMLElement).closest(".select-box")) {
				setIsOpen(false);
			}
		};

		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, []);

	const handleTermChange = (event: React.MouseEvent<HTMLButtonElement>) => {
		setTerm((event.target as HTMLButtonElement).value as TIME_RANGE_TYPE);
		setPlaylistUrl("");
		setIsOpen(false);
	};

	const handleCreatePlaylist = async () => {
		try {
			const uris = recentList.map((item) => item.uri);
			save(`ᕷ₊· ${DATE[term]}동안 많이 들은 곡 | 𝑶𝒏𝒆𝒖𝒍 ·₊ᕷ`, uris);
		} catch (error: any) {
			addToast("알 수 없는 오류가 발생했습니다.");
		}
	};

	return (
		<>
			<Head>
				<title>Recent | Oneul</title>
			</Head>
			<Suspense fallback={<Loader position="center" size="full" />}>
				<PageWrapper>
					<ContentWrapper>
						<TitleWrapper>
							<Title>즐겨들은 곡</Title>
							<Description>'이 기간에는 이런 노래들을 많이 들었구나~'하며 돌아볼 수 있어요</Description>
						</TitleWrapper>
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
									{recentList.map((item, index) => (
										<ListItem
											key={`recent_${index}`}
											name={item.name}
											artists={item.artists}
											album={item.album}
											duration_ms={item.duration_ms}
										>
											<Index>{index + 1}</Index>
										</ListItem>
									))}
								</StyledUl>
								<ButtonWrapper>
									<Maybe
										test={playlistUrl.length > 0}
										truthy={
											<Button $size="md" $variant="empty" $fullWidth onClick={() => window.open(playlistUrl)}>
												<IoHeadset />
												플리로 이동
											</Button>
										}
										falsy={
											<Button $size="md" $variant="empty" $fullWidth onClick={handleCreatePlaylist}>
												<RiPlayListFill />
												플리 저장
											</Button>
										}
									/>
									<Button $size="md" $variant="simple" $fullWidth title="추천받기" onClick={() => getRecommendation()}>
										<FaRegThumbsUp />
										추천 받기
									</Button>
								</ButtonWrapper>
							</Wrapper>
						</Suspense>
					</ContentWrapper>
				</PageWrapper>
			</Suspense>
		</>
	);
}

const Wrapper = styled.div`
	position: relative;
	overflow: hidden;
	display: flex;
	flex-direction: column;
`;

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

const TitleWrapper = styled.div`
	padding: 0 10px;
	padding-top: 15px;
`;

const SelectboxWrapper = styled.div`
	padding: 0 10px;
	margin-bottom: 10px;
	display: flex;
	align-items: center;
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
	top: 1px;
	right: 2px;
	display: flex;
	flex-direction: column;
	width: max-content;
	height: max-content;
	border-radius: 3px;
	border: 1px solid ${({ theme }) => theme.color.primary400};
	background-color: ${({ theme }) => theme.color.white};
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
	margin-bottom: 0;
	overflow: auto;
	display: flex;
	flex-direction: column;
	gap: 7px;
	padding: 0 10px;
	padding-bottom: 30px;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const Index = styled.p`
	width: 20px;
	font-family: "Moirai" !important;
	font-size: ${({ theme }) => theme.textSize.lg}rem;
	text-align: center;
`;

const ButtonWrapper = styled.div`
	width: 100%;
	display: flex;
	background-color: ${({ theme }) => theme.color.primary400};
`;
