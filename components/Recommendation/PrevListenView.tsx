import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Loader, Maybe } from "..";

type PrevListenViewProps = {
	isActive: boolean;
	playlistId: string;
};

export function PrevListenView({ isActive, playlistId }: PrevListenViewProps) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (isActive === false) {
			setIsLoading(true);
		}
	}, [isActive]);

	return (
		<Wrapper>
			<Maybe
				test={isActive}
				truthy={
					<>
						{isLoading && <Loader size="parent" position="top" />}
						<iframe
							title="Spotify Embed: Recommendation Playlist "
							src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
							width="100%"
							height="100%"
							style={{ minHeight: "600px" }}
							frameBorder="0"
							allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
							loading="lazy"
							onLoad={() => setIsLoading(false)}
						/>
					</>
				}
				falsy={null}
			/>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	position: relative;
`;
