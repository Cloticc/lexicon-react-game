import "./../css/StartPageUI.css";
import "./../css/Map.css";

export function StartPageUI() {
	console.log("----SOKOBAN----");
	return (
		<>
			<div id="startpageui">
				<div id="player">
					<h1>Sokoban</h1>
					<div className="player playerwalkdown"></div>
				</div>
				<div id="startplay"></div>
				<div id="retrogrid"></div>
				<div id="copyright">© 2024 Studio5</div>
			</div>
		</>
	);
}
