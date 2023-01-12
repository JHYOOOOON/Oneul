import { useRecoilValue } from "recoil";

import Maybe from "../components/Maybe";
import ResultItem from "./ResultItem";
import { MAX_ITEM_LEN } from "../constants";
import { withCartItemIds, withSearchResults } from "../recoil";

const ResultSection = () => {
	const searchResult = useRecoilValue(withSearchResults);
	const cartItemIds = useRecoilValue(withCartItemIds);

	const isMoreSelectAvailable = () => {
		if (cartItemIds.length === MAX_ITEM_LEN) {
			alert(`곡은 최대 ${MAX_ITEM_LEN}개까지만 담을 수 있습니다`);
			return true;
		}
		return false;
	};

	return (
		<div>
			<Maybe
				test={searchResult === null}
				truthy={null}
				falsy={
					<Maybe
						test={searchResult?.length === 0}
						truthy={<div>결과 없음</div>}
						falsy={
							<ul>
								{searchResult?.map((item, index) => (
									<ResultItem
										key={item.id}
										id={item.id}
										index={index + 1}
										name={item.name}
										artists={item.artists}
										album={item.album}
										duration_ms={item.duration_ms}
										isMoreSelectAvailable={isMoreSelectAvailable}
									/>
								))}
							</ul>
						}
					/>
				}
			/>
		</div>
	);
};

export default ResultSection;
