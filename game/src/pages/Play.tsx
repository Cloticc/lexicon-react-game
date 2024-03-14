import { useState, useEffect } from "react";
import { SelectPageProps } from "./../components/InterfacePages";
import { Highscore } from "./Highscore";

import "./../css/Play.css";

export function Play({ onPageChange }: SelectPageProps) {
	const [gameFinish, setFinish] = useState(false);

	const handleSelectLevelClick = () => {
		onPageChange("selectlevel");
	};

	// Can remove this useEffect. It's just to show the highscore element after 3 seconds
	useEffect(() => {
		setTimeout(() => {
			setFinish(true);
		}, 3000);
	});

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
					onClick={handleSelectLevelClick}
				></button>

				{gameFinish && <Highscore />}
				<div id="retrogrid"></div>
				<div id="copyright">© 2024 Studio5</div>
			</div>
		</>
	);
}
