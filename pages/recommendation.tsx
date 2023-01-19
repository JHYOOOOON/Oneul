import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useRouter } from "next/router";

import { ListItem } from "../components";
import { isAccessTokenExist } from "../lib";
import { withRecommendationItems } from "../recoil";
import { Button, Description, PageWrapper, Title } from "../styles/CommonStyle";
import html2canvas from "html2canvas";

export default function Recommendation() {
	const router = useRouter();
	const recommendationItems = useRecoilValue(withRecommendationItems);

	useEffect(() => {
		if (isAccessTokenExist() === false) {
			router.push("/");
		}
		if (recommendationItems.length === 0) {
			router.push("/search");
		}
	}, []);

	const downloadImage = (url: string) => {
		const link = document.createElement("a");
		link.download = "download";
		link.href = url;
		document.body.appendChild(link);
		link.click();
		link.remove();
	};

	const handleSaveList = async () => {
		const target = document.getElementById("recommendation-list") as HTMLUListElement;
		const options = {
			logging: false,
			imageTimeout: 1000,
			useCORS: true,
			width: target.offsetWidth,
			height: target.offsetHeight,
		};
		const canvas = await html2canvas(target, options);
		const url = canvas.toDataURL("image/png");
		downloadImage(url);
	};

	return (
		<PageWrapper>
			<Wrapper>
				<div>
					<Title>추천곡 리스트</Title>
					<StyledDescription>담은 곡들을 바탕으로 추천드리는 20곡입니다.</StyledDescription>
				</div>
				<DownloadButtonWrapper>
					<DownloadButton onClick={handleSaveList}>목록 내려받기</DownloadButton>
				</DownloadButtonWrapper>
			</Wrapper>
			<StyledUl id="recommendation-list">
				{recommendationItems.map((item, index) => (
					<ListItem
						key={`recommendation_${index}`}
						name={item.name}
						artists={item.artists}
						album={item.album}
						duration_ms={item.duration_ms}
					>
						{<Index>{index + 1}</Index>}
					</ListItem>
				))}
			</StyledUl>
		</PageWrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 15px;
`;

const StyledDescription = styled(Description)`
	margin-bottom: 0;
`;

const DownloadButtonWrapper = styled.div`
	display: flex;
	align-items: flex-end;
`;

const DownloadButton = styled(Button)`
	font-size: ${({ theme }) => theme.textSize.sm}rem;
`;

const StyledUl = styled.ul`
	border: 1px solid ${({ theme }) => theme.color.primary400};
	border-radius: 3px;
	overflow: hidden;
`;

const Index = styled.p`
	text-align: center;
	font-size: ${({ theme }) => theme.textSize.sm}rem;
`;
