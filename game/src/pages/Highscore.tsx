import { useEffect, useState } from "react";
import { playSound } from "./../components/playSound";
import {formatElapsedTime } from "../utils/TimeUtils";

export function Highscore() {
	const [highestScores, setHighestScores] = useState<{ [level: string]: { score: number; elapsedTime: number } }>({});

  useEffect(() => {
    const storedScores = localStorage.getItem("highestScores");
    if (storedScores) {
      setHighestScores(JSON.parse(storedScores));
    }
  }, [highestScores]);

	function handleMouseOver() {
		playSound("hover", 0.15);
	}

	function handleReplay() {
		playSound("click", 0.25);
	}
	function handleNextLevel() {
		playSound("click", 0.25);
	}
	return (
		<>
			<div id="highscore">
				<h1>Highscore</h1>
				<h2>Level 1 Completed</h2>
				<h2>High Score</h2>
				<div className="showhighscore">
					<div className="result">
						<div className="row">
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
				<div>{formatElapsedTime (highestScores[level].elapsedTime)}</div>              </div>
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
		</>
	);
}
