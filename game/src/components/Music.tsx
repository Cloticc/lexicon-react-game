import React, { useState, useEffect, useRef } from "react";

interface MusicProps {
	audio: string;
}

export const Music: React.FC<MusicProps> = ({ audio }) => {
	const [music, setMusic] = useState("");

	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		setMusic(audio);
		const music = audioRef.current;

		if (music) {
			music.volume = 0.2;
			// Play music if paused
			if (music.paused) {
				music.play();
			}
		}
	}, [music]);

	return (
		<audio autoPlay loop id="music" ref={audioRef}>
			<source src={audio} type="audio/mpeg" />
		</audio>
	);
};
