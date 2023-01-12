import { useRecoilValue } from "recoil";

import Maybe from "../components/Maybe";
import { recommendations } from "../lib/api";
import CartItem from "./CartItem";
import { withCartItemIds } from "../recoil";

const SelectedSection = () => {
	const selectedItemIds = useRecoilValue(withCartItemIds);

	const handleRecomendation = async () => {
		const res = await recommendations(selectedItemIds);
	};

	return (
		<div>
			<Maybe
				test={selectedItemIds === null}
				truthy={null}
				falsy={
					<Maybe
						test={selectedItemIds?.length === 0}
						truthy={<div>텅 비었네요</div>}
						falsy={
							<ul>
								{selectedItemIds?.map((id, index) => (
									<CartItem key={id} id={id} index={index + 1} />
								))}
							</ul>
						}
					/>
				}
			/>
			<button title="추천받기" onClick={handleRecomendation}>
				추천받기
			</button>
		</div>
	);
};

export default SelectedSection;
