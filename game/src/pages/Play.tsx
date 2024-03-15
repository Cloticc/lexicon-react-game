import "./../css/Play.css";

import { useEffect, useState } from "react";

import { Highscore } from "./Highscore";
import { MapRender } from "../components/mapRender";
import { SelectPageProps } from "./../components/InterfacePages";
import { playSound } from "./../components/playSound";
import map1 from "../maps/map1.json";

export function Play({ onPageChange }: SelectPageProps) {
	const [gameFinish, setFinish] = useState(false);

	const handleSelectLevelClick = () => {
		onPageChange("selectlevel");
		playSound("click", 0.25);
		playSound("swoosh", 0.15);
	};

	function handleMouseOver() {
		playSound("hover", 0.15);
	}
	/*
	// Can remove this useEffect. It's just to show the highscore element after 3 seconds
	useEffect(() => {
		setTimeout(() => {
			setFinish(true);
		}, 3000);
	});
*/
	return (
		<>
			<div id="startpageui">
				<div id="showlevel">Level 1</div>
				<div id="status">
					<div id="stepstaken">0</div>
					<span>in</span>
					<div id="timer">1:32</div>
				</div>

				<button
					id="btn-selectlevel"
					className="button"
					onMouseOver={handleMouseOver}
					onClick={handleSelectLevelClick}
				></button>

				<MapRender initialMapData={map1.mapdata} />
				{gameFinish && <Highscore />}
				<div id="retrogrid"></div>
				<div id="copyright">© 2024 Studio5</div>
			</div>
		</>
	);
}
