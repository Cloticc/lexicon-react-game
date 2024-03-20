import React, { useState, useEffect, useRef } from "react";
import uiMusic from "./../assets/neon-gaming-128925.mp3";
import playMusic from "./../assets/synthwave-background-music-155701.mp3";

interface MusicProps {
	audio: string;
}

export const Music: React.FC<MusicProps> = ({ audio }) => {
	const [music, setMusic] = useState<string>(null); // Initialize music state with null

	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		// Set the music based on the audio prop
		if (audio === "ui") {
			setMusic(uiMusic);
		} else if (audio === "play") {
			setMusic(playMusic);
		}
	}, [audio]);

	useEffect(() => {
		// Play music when music state changes
		const musicPlayer = audioRef.current;

		if (music && musicPlayer) {
			musicPlayer.src = music;
			musicPlayer.volume = 0.15;
			musicPlayer.loop = true;
			musicPlayer.play();
		}

		return () => {
			// Cleanup function to pause music when component unmounts
			if (musicPlayer && !musicPlayer.paused) {
				musicPlayer.pause();
			}
		};
	}, [music]);

	return <audio autoPlay loop ref={audioRef} />;
};
