import { useEffect, useState } from "react";

import clickSound from "./../assets/menu-click-89198.mp3";
import hoverSound from "./../assets/button-124476.mp3";
import walkSound from "./../assets/indoor-footsteps-6385.mp3";
import pushboxSound from "./../assets/push-100769.mp3";
import swooshSound from "./../assets/swoosh-transition-with-metal-overtones-142375.mp3";
import boxindicationSound from "./../assets/rightanswer-95219.mp3";
import leveldoneSound from "./../assets/cute-level-up-1-189852.mp3";
import levelStart from "./../assets/game-start-6104.mp3";

type SoundName =
	| "click"
	| "hover"
	| "walk"
	| "pushbox"
	| "swoosh"
	| "boxindication"
	| "leveldone"
	| "levelstart"; // Define sound names as string literals

const soundFiles: Record<SoundName, string> = {
	click: clickSound,
	hover: hoverSound,
	walk: walkSound,
	pushbox: pushboxSound,
	swoosh: swooshSound,
	boxindication: boxindicationSound,
	leveldone: leveldoneSound,
	levelstart: levelStart,
	// Add more mappings as needed
};

export function SoundPlayer() {
	const [audioElements, setAudioElements] = useState<HTMLAudioElement[]>([]);

	useEffect(() => {
		return () => {
			audioElements.forEach((audio) => audio.remove());
			setAudioElements([]);
		};
	}, [audioElements]);

	return (
		<>
			{Object.entries(soundFiles).map(([soundName, soundFile]) => (
				<audio key={soundName} src={soundFile} />
			))}
		</>
	);
}

export function playSound(soundname: SoundName, volume = 1): void {
	const audio = new Audio(soundFiles[soundname]);

	audio.volume = volume;
	audio.play();

	audio.onended = () => {
		// Optionally handle onended event
	};
}
