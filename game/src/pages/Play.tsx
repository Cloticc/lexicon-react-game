import "./../css/Play.css";

import { useContext, useEffect } from "react";

import { Highscore } from "./Highscore";
import { MapRender } from "../components/mapRender";
import { SelectPageProps } from "./../components/InterfacePages";
import { playSound } from "./../components/playSound";
import { formatElapsedTime } from "../utils/TimeUtils";
import { MyContext } from "../ContextProvider/ContextProvider";
import allMaps from "./../maps/maps";

export function Play({ onPageChange }: SelectPageProps) {
	const { counter } = useContext(MyContext);
	const { elapsedTime } = useContext(MyContext);
	const { wonGame } = useContext(MyContext);
	const { level } = useContext(MyContext);
	const { setMusic } = useContext(MyContext);

	useEffect(() => {
		setMusic("play");
	}, []);

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
			<div id="startpageui">
				<div id="showlevel">Level {level + 1}</div>
				<div id="status">
					<div id="stepstaken">{counter} steps</div>
					<span>in</span>
					<div id="timer">{formatElapsedTime(elapsedTime)}</div>
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

				<MapRender initialMapData={allMaps[level].mapdata} />
				{wonGame && <Highscore />}
			</div>
		</>
	);
}
