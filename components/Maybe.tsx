interface MaybeType {
	test: boolean;
	truthy: JSX.Element | null;
	falsy: JSX.Element | null;
}

export function Maybe({ test, truthy, falsy }: MaybeType) {
	const returnByTest = () => {
		if (test) {
			return truthy;
		} else {
			return falsy;
		}
	};

	return returnByTest();
}
