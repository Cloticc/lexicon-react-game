import { playSound } from "./../components/playSound";

export function Settings() {
	function handleMouseOver() {
		playSound("hover", 0.15);
	}

	function handleSoundToggle() {
		playSound("click", 0.25);
	}
	function handleReplay() {
		playSound("click", 0.25);
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
