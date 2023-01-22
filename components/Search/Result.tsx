import { useRecoilValue } from "recoil";

import { Maybe } from "@/components";
import { ResultItem } from "@/components/Search";
import { withSearchResults } from "@/state";

const Result = () => {
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
						falsy={<ResultItem searchResult={searchResult} />}
					/>
				}
			/>
		</div>
	);
};

export default Result;
