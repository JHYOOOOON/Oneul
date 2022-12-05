import { useRecoilValue } from "recoil";

import withSearchResults from "../recoil/withSearchResults";
import Maybe from "../components/Maybe";
import ResultItem from "./ResultItem";

const ResultSection = () => {
	const searchResult = useRecoilValue(withSearchResults);
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
								{/* <div>
									<p>#</p>
									<p>제목</p>
									<p>앨범</p>
									<p>시간</p>
								</div> */}
								{searchResult?.map((item, index) => (
									<ResultItem
										key={item.id}
										id={item.id}
										index={index + 1}
										name={item.name}
										artists={item.artists}
										album={item.album}
										duration_ms={item.duration_ms}
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
