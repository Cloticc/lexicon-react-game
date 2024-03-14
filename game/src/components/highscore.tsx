import React, { useState, useEffect } from "react";

const highscore: React.FC = () => {

  const [counter, setCounter] = useState(0);
  const [highestScores, setHighestScores] = useState<{ [level: string]: { score: number; elapsedTime: number } }>({});
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const [currentLevel, setCurrentLevel] = useState<string>("1");

  // Load highest scores 
  useEffect(() => {
    const storedScores = localStorage.getItem("highestScores");
    if (storedScores) {
      setHighestScores(JSON.parse(storedScores));
    }
  }, []);

  // Start the game timer 
  useEffect(() => {
    if (startTime && gameRunning) {
      const intervalId = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime.getTime()) / 1000);
        setElapsedTime(elapsed);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [startTime, gameRunning]);

  // Key presses
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" && gameRunning) {
        setCounter((prevCounter) => prevCounter + 1);
      } else if (event.key === " " && gameRunning) {
        setCounter((prevCounter) => Math.max(0, prevCounter - 1));
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameRunning]);

  // Start the game
  const startGame = () => {
    setStartTime(new Date());
    setGameRunning(true);
  };

  // Stop the game
  const stopGame = () => {
    setStartTime(null);
    setGameRunning(false);
  };

  const nextLevel = () => {
    const nextLevel = (parseInt(currentLevel) + 1).toString();
    setCurrentLevel(nextLevel);
    const levelData = highestScores[currentLevel] || { score: Infinity, elapsedTime: 0 };
    if (counter < levelData.score || (counter === levelData.score && elapsedTime < levelData.elapsedTime)) {
      const updatedScores = { ...highestScores, [currentLevel]: { score: counter, elapsedTime } };
      setHighestScores(updatedScores);
      localStorage.setItem("highestScores", JSON.stringify(updatedScores));
    }
    setCounter(0);
    setStartTime(null);
    setElapsedTime(0);
    setGameRunning(false);
  };

  // Go to the previous level
  const previousLevel = () => {
    const prevLevel = (parseInt(currentLevel) - 1).toString();
    setCurrentLevel(prevLevel);
    setCounter(0);
    setStartTime(null);
    setElapsedTime(0);
    setGameRunning(false);
  };

  // Just sample Rendering to show how it works
  return (
    <div>
      <h1>Level: {currentLevel}</h1>
      <h2>Counter: {counter}</h2>
      <h3>Highest Scores</h3>
      <ul>
        {Object.entries(highestScores).map(([level, data]) => (
          <li key={level}>
            Level {level}: Score = {data.score}, Elapsed Time = {data.elapsedTime}s
          </li>
        ))}
      </ul>
      <div>
        <button onClick={startGame} disabled={gameRunning}>
          Start Game
        </button>
        <button onClick={stopGame} disabled={!gameRunning}>
          Stop Game
        </button>
        <button onClick={previousLevel} disabled={parseInt(currentLevel) <= 1}>
          Previous Level
        </button>
        <button onClick={nextLevel} disabled={gameRunning}>
          Next Level
        </button>
      </div>
      <p>Press Enter to increase, Spacebar to decrease</p>
      <p>Elapsed Time: {startTime && gameRunning ? `${elapsedTime}s` : "0s"}</p>
    </div>
  );
};

export default highscore;
