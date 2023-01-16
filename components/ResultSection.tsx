import { useRecoilValue } from "recoil";

import { Maybe, Result } from "../components";
import { withSearchResults } from "../recoil";

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
						falsy={<Result searchResult={searchResult} />}
					/>
				}
			/>
		</div>
	);
};

export default ResultSection;
