import { MyContext } from "../ContextProvider/ContextProvider";
import { playSound } from "./../components/playSound";
import { useContext } from "react";

export function Settings() {
	const { setMapData, setBoxPositions, setPlayerPosition, initialMapData, resetGame, initialPlayerPosition, initialBoxPositions } = useContext(MyContext);

	function handleMouseOver() {
		playSound("hover", 0.15);
	}

	function handleSoundToggle() {
		playSound("click", 0.25);
	}
	function handleReplay() {
		playSound("click", 0.25);
		setMapData(initialMapData);
		setPlayerPosition(initialPlayerPosition);
		setBoxPositions(initialBoxPositions);
		resetGame();
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
						className="button"
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
