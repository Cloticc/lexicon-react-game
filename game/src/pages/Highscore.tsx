import { useContext, useEffect } from 'react';

import { MyContext } from './../ContextProvider/ContextProvider';
import { formatElapsedTime } from '../utils/TimeUtils';
import { playSound } from './../components/playSound';

export function Highscore() {
    const {
        setShowGameContainer,
        setMapData,
        setMusic,
        setBoxPositions,
        setPlayerPosition,
        initialMapData,
        resetGame,
        initialPlayerPosition,
        initialBoxPositions,
        level,
        setLevel,
        highestScores,
        setHighestScores,
        setGameReady,
        setDisableControls,
    } = useContext(MyContext);

    useEffect(() => {
        const storedScores = localStorage.getItem('highestScores');
        if (storedScores) {
            setHighestScores(JSON.parse(storedScores));
        }
        // console.log("Stored Scores: ", storedScores || "No stored scores");

        playSound('leveldone', 0.3);
        setShowGameContainer(false);
        setMusic('ui');
        setGameReady(false);
        setDisableControls(true);
    }, []); // Add level to the dependency array

    useEffect(() => {
        // Define the function to run when Enter key is pressed
        const handleEnterPress = (event) => {
            if (event.key === 'Enter') {
                handleNextLevel();
            }
        };
        // Attach the event listener to the document body
        document.body.addEventListener('keydown', handleEnterPress);
        // Remove the event listener when the component unmounts
        return () => {
            document.body.removeEventListener('keydown', handleEnterPress);
        };
    }, []);

    function handleMouseOver() {
        playSound('hover', 0.15);
    }

    function handleReplay() {
        playSound('click', 0.25);
        playSound('reverse', 0.5);
        playSound('levelstart', 0.5);
        setMapData(initialMapData);
        setPlayerPosition(initialPlayerPosition);
        setBoxPositions(initialBoxPositions);
        resetGame();
        setShowGameContainer(true);
        setDisableControls(false);
        setGameReady(true);
    }

    function handleNextLevel() {
        playSound('click', 0.25);
        playSound('levelstart', 0.5);

        // // Get the current highestScores from local storage
        // const highestScoresJSON = localStorage.getItem("highestScores");
        // const highestScores = highestScoresJSON ? JSON.parse(highestScoresJSON) : {};

        // // Add the current level to highestScores only if it doesn't exist yet
        // if (!highestScores[level]) {
        // 	highestScores[level] = { score: Infinity, elapsedTime: Infinity };
        // }

        // // Save highestScores back to local storage
        // localStorage.setItem("highestScores", JSON.stringify(highestScores));

        const nextLevel = level + 1;
        setLevel(nextLevel);
        setMapData(initialMapData);
        setPlayerPosition(initialPlayerPosition);
        setBoxPositions(initialBoxPositions);
        resetGame();
        setShowGameContainer(true);
        setShowGameContainer(true);
        setDisableControls(false);
        setGameReady(true);
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
                {/* {Object.keys(highestScores)
					.map(Number) 
					.sort((a, b) => a - b) 
					.map((level) => (
						<div key={level} className="showhighscore">
							<div className="result">
								<div className="row">
									<div>{level + 1}</div>
									<div>{highestScores[level].score}</div>
									<div>
										{formatElapsedTime(highestScores[level].elapsedTime)}
									</div>{" "}
								</div>
							</div>
						</div>
					))} */}
                {Object.keys(highestScores)
                    .map(Number)
                    .filter((levelNumber) => levelNumber === level)
                    .map((level) => (
                        <div key={level} className="showhighscore">
                            <div className="result">
                                <div className="row">
                                    <div>{level + 1}</div>
                                    <div>{highestScores[level].score}</div>
                                    <div>
                                        {formatElapsedTime(highestScores[level].elapsedTime)}
                                    </div>{' '}
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
