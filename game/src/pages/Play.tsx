import "./../css/Play.css";

import { Highscore } from "./Highscore";
import { MapRender } from "../components/mapRender";
import { SelectPageProps } from "./../components/InterfacePages";
import { playSound } from "./../components/playSound";
import { useState } from "react";

interface PlayProps extends SelectPageProps {
	mapData: string[][];
	setMapData: React.Dispatch<React.SetStateAction<string[][]>>;
	playerDirection: string;
	setPlayerDirection: React.Dispatch<React.SetStateAction<string>>;
	playerPosition: { x: number; y: number };
	setPlayerPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
	indicatorPositions: { x: number; y: number }[];
	setIndicatorPositions: React.Dispatch<React.SetStateAction<{ x: number; y: number }[]>>;
	boxPositions: { x: number; y: number }[];
	setBoxPositions: React.Dispatch<React.SetStateAction<{ x: number; y: number }[]>>;
}

export function Play({
	onPageChange,
	mapData,
	setMapData,
	playerDirection,
	setPlayerDirection,
	playerPosition,
	setPlayerPosition,
	indicatorPositions,
	setIndicatorPositions,
	boxPositions,
	setBoxPositions,
}: PlayProps) {

	const [gameFinish, setFinish] = useState(false);

	const handleSelectLevelClick = () => {
		onPageChange("selectlevel");
		playSound("click", 0.25);
		playSound("swoosh", 0.15);
	};

	function handleMouseOver() {
		playSound("hover", 0.15);
	}

	function handleUndoStepClick() {
		/* put function here?*/
		playSound("click", 0.25);
		playSound("reverse", 0.35);
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
			<div id="showlevel">Level 1</div>
			<div id="status">
				<div id="stepstaken">0</div>
				<span>in</span>
				<div id="timer">1:32</div>
			</div>

			<button
				id="btn-undostep"
				className="button"
				onMouseOver={handleMouseOver}
				onClick={handleUndoStepClick}
			></button>

			<button
				id="btn-selectlevel"
				className="button"
				onMouseOver={handleMouseOver}
				onClick={handleSelectLevelClick}
			></button>

			<MapRender
				mapData={mapData}
				setMapData={setMapData}
				playerDirection={playerDirection}
				setPlayerDirection={setPlayerDirection}
				playerPosition={playerPosition}
				setPlayerPosition={setPlayerPosition}
				indicatorPositions={indicatorPositions}
				setIndicatorPositions={setIndicatorPositions}
				boxPositions={boxPositions}
				setBoxPositions={setBoxPositions}
			/>
			{gameFinish && <Highscore />}
		</>
	);
}
