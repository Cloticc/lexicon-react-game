import { MyContext } from "../ContextProvider/ContextProvider";
import { playSound } from "./../components/playSound";
import { useContext } from "react";

export function Settings() {
	const {
		toggleSettings,
		setShowGameContainer,
		isMuted,
		setMuted,
		setMusic,
		setMapData,
		setBoxPositions,
		setPlayerPosition,
		initialMapData,
		resetGame,
		initialPlayerPosition,
		initialBoxPositions,
	} = useContext(MyContext);

	function handleMouseOver() {
		playSound("hover", 0.15);
	}

	function handleSoundToggle() {
		playSound("click", 0.25);
		if (isMuted) {
			document.querySelector("#music").volume = 0.15;
			setMuted(false);
		} else {
			setMuted(true);
			document.querySelector("#music").volume = 0;
		}
		toggleSettings(false);
	}

	function handleReplay() {
		playSound("click", 0.25);
		playSound("reverse", 0.25);
		setMapData(initialMapData);
		setPlayerPosition(initialPlayerPosition);
		setBoxPositions(initialBoxPositions);
		resetGame();
		setMusic("play");
		toggleSettings(false);
		setShowGameContainer(false);
		setTimeout(() => {
			setShowGameContainer(true);
		}, 1);
	}

	function handleSolution() {
		playSound("click", 0.25);
	}
	return (
		<>
			<div id="settings">
				<h1>Settings</h1>
				<div className="content-container">
					<button
						id="btn-sound"
						className={`button ${isMuted ? "muted" : ""}`}
						onClick={handleSoundToggle}
						onMouseOver={handleMouseOver}
					></button>

					<button
						id="btn-replay"
						className="button"
						onClick={handleReplay}
						onMouseOver={handleMouseOver}
					></button>
					<button
						id="btn-solution"
						className="button"
						onClick={handleSolution}
						onMouseOver={handleMouseOver}
					></button>
				</div>
			</div>
			<div id="darkoverlay"></div>
		</>
	);
}
