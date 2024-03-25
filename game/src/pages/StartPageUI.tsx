import "./../css/Map.css";
import "./../css/StartPageUI.css";

import { SelectPageProps } from "./../components/InterfacePages";
import { playSound } from "./../components/playSound";

export function StartPageUI({ onPageChange }: SelectPageProps) {
	const handleButtonClick = () => {
		onPageChange("selectlevel");
		playSound("click", 0.25);
		playSound("swoosh", 0.25);
	};

	function handleMouseOver() {
		playSound("hover", 0.15);
	}

const handleButtonClick2 = () => {
		onPageChange("MapGenerator");
		playSound("click", 0.25);
		playSound("swoosh", 0.25);
	};

	return (
		<>
			<div id="player">
				<h1>Sokoban</h1>
				<div className="player playerwalkdown"></div>
			</div>
			<div id="startplay" onClick={handleButtonClick} onMouseOver={handleMouseOver}></div>
			<div id="mapEditor" onClick={handleButtonClick2}>mapEditor</div>
		</>
	);
}
