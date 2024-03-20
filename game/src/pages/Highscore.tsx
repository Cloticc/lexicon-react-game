import { useContext, useEffect, useState } from "react";

import { MyContext } from "./../ContextProvider/ContextProvider";
import { formatElapsedTime } from "../utils/TimeUtils";
import { playSound } from "./../components/playSound";

export function Highscore() {
	const { music, setMusic } = useContext(MyContext);
	const { setShowGameContainer } = useContext(MyContext);
	const [highestScores, setHighestScores] = useState<{
		[level: string]: { score: number; elapsedTime: number };
	}>({});

	const {
		level,
		setLevel,
		setMapData,
		setMusic,
		setBoxPositions,
		setPlayerPosition,
		initialMapData,
		resetGame,
		initialPlayerPosition,
		initialBoxPositions,
	} = useContext(MyContext);

	useEffect(() => {
		const storedScores = localStorage.getItem("highestScores");
		if (storedScores) {
			setHighestScores(JSON.parse(storedScores));
		}
		playSound("leveldone", 0.3);
		setShowGameContainer(false);
		setMusic("ui");
	}, []); // Empty dependency array to run the effect only once

	useEffect(() => {
		// Define the function to run when Enter key is pressed
		const handleEnterPress = (event) => {
			if (event.key === "Enter") {
				handleNextLevel();
			}
		};
		// Attach the event listener to the document body
		document.body.addEventListener("keydown", handleEnterPress);
		// Remove the event listener when the component unmounts
		return () => {
			document.body.removeEventListener("keydown", handleEnterPress);
		};
	}, []);

	function handleMouseOver() {
		playSound("hover", 0.15);
	}

	function handleReplay() {
		playSound("click", 0.25);
		playSound("reverse", 0.5);
		playSound("levelstart", 0.5);
		setMapData(initialMapData);
		setPlayerPosition(initialPlayerPosition);
		setBoxPositions(initialBoxPositions);
		resetGame();
		setShowGameContainer(true);
	}
	function handleNextLevel() {
		playSound("click", 0.25);
		playSound("levelstart", 0.5);
		setMusic("play");
		setShowGameContainer(true);
		let newLevel = level + 1;
		setLevel(newLevel);
		resetGame();
		setShowGameContainer(true);
	}
	return (
		<>
			<div id="highscore">
				<h1>Completed</h1>
				<h2>Level {level + 1}</h2>
				<h2>High Score</h2>
				<div className="showhighscore">
					<div className="result">
						<div className="row thead">
							<div>Level</div>
							<div>Steps</div>
							<div>Time</div>
						</div>
					</div>
				</div>
				{Object.keys(highestScores).map((level, index) => (
					<div key={index} className="showhighscore">
						<div className="result">
							<div className="row">
								<div>{level}</div>
								<div>{highestScores[level].score}</div>
								<div>
									{formatElapsedTime(highestScores[level].elapsedTime)}
								</div>{" "}
							</div>
						</div>
					</div>
				))}
				<div className="content-container">
					<button
						id="btn-replay-again"
						className="button"
						onClick={handleReplay}
						onMouseOver={handleMouseOver}
					></button>
					<button
						id="btn-nextlevel"
						className="button"
						onClick={handleNextLevel}
						onMouseOver={handleMouseOver}
					></button>
				</div>
			</div>
			<div id="darkoverlay"></div>
		</>
	);
}
