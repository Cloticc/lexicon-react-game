import "./../css/StartPageUI.css";
import "./../css/Map.css";

interface SelectPageProps {
	onPageChange: (page: "start" | "selectlevel") => void;
}

export function StartPageUI({ onPageChange }: SelectPageProps) {
	const handleButtonClick = () => {
		onPageChange("selectlevel");
	};

	return (
		<>
			<div id="startpageui">
				<div id="player">
					<h1>Sokoban</h1>
					<div className="player playerwalkdown"></div>
				</div>
				<div id="startplay" onClick={handleButtonClick}></div>
				<div id="retrogrid"></div>
				<div id="copyright">© 2024 Studio5</div>
			</div>
		</>
	);
}
