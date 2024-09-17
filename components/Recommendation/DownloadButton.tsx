import html2canvas from "html2canvas";
import { LuDownload } from "react-icons/lu";

import { Button } from "@/styles";
import { useToast } from "../hooks";

export function DownloadButton() {
	const { addToast } = useToast();

	const downloadImage = (url: string) => {
		const link = document.createElement("a");
		link.download = "[Onuel]recommendation";
		link.href = url;
		document.body.appendChild(link);
		link.click();
		link.remove();
		addToast("다운로드중...");
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
		<Button $size="md" $variant="empty" $fullWidth onClick={handleSaveList}>
			<LuDownload />
			이미지 저장
		</Button>
	);
}
