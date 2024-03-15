import "./../css/StartPageUI.css";
import "./../css/Map.css";
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

	return (
		<>
			<div id="startpageui">
				<div id="player">
					<h1>Sokoban</h1>
					<div className="player playerwalkdown"></div>
				</div>
				<div id="startplay" onClick={handleButtonClick} onMouseOver={handleMouseOver}></div>
				<div id="retrogrid"></div>
				<div id="copyright">© 2024 Studio5</div>
			</div>
		</>
	);
}
