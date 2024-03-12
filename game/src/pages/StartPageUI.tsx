import "./../css/StartPageUI.css";
import "./../css/Map.css";

export function StartPageUI() {
	console.log("----SOKOBAN----");
	return (
		<>
			<div id="startpageui">
				<h1>Sokoban</h1>
				<div className="player"></div>
			</div>
		</>
	);
}
