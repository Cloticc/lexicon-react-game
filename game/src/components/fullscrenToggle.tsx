import { useState } from "react";
import { playSound } from "./../components/playSound";

export function FullscreenToggle(): JSX.Element {
	const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

	const toggleFullscreen = () => {
		if (!document.fullscreenElement) {
			document.documentElement
				.requestFullscreen()
				.then(() => {
					setIsFullscreen(true);
				})
				.catch((err) => {
					console.error("Failed to enter fullscreen mode:", err);
				});
		} else {
			document
				.exitFullscreen()
				.then(() => {
					setIsFullscreen(false);
				})
				.catch((err) => {
					console.error("Failed to exit fullscreen mode:", err);
				});
		}
		playSound("click", 0.25);
		playSound("swoosh", 0.15);
	};

	function handleMouseOver() {
		playSound("hover", 0.15);
	}

	return (
		<button
			id="btn-fullscreen"
			className={`button ${isFullscreen ? "minimize" : ""}`}
			onClick={toggleFullscreen}
			onMouseOver={handleMouseOver}
		/>
	);
}
