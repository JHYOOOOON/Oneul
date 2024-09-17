import React, { useState } from "react";
import styled from "styled-components";

import { Loader } from "..";
import { WrapperPaddingX } from "@/styles";

type PrevListenViewProps = {
	playlistId: string;
};

export function PrevListenView({ playlistId }: PrevListenViewProps) {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<Wrapper>
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
		</Wrapper>
	);
}

const Wrapper = styled.div`
	position: relative;
`;
