import React, { useContext, useEffect } from "react";
import { MyContext } from "./../ContextProvider/ContextProvider";

interface HighScoreProps {
  currentLevel: string;
  counter: number;
  elapsedTime: number;
}

interface PrevHighestScores {
  [key: string]: { 
    score: number; 
    elapsedTime: number; 
  };
}

const HighScore: React.FC<HighScoreProps> = ({
  counter,
  elapsedTime,
  currentLevel,
}) => {
  const { setHighestScores, highestScores } = useContext(MyContext); // Retrieve highestScores from the context

  const updateHighestScores = (prevHighestScores: PrevHighestScores): void => {
    const levelData = prevHighestScores[currentLevel] || {
      score: Infinity,
      elapsedTime: 0,
    };
    if (
      counter < levelData.score ||
      (counter === levelData.score && elapsedTime < levelData.elapsedTime)
    ) {
      const updatedScores: PrevHighestScores = {
        ...prevHighestScores,
        [currentLevel]: { score: counter, elapsedTime },
      };
      localStorage.setItem("highestScores", JSON.stringify(updatedScores));
      setHighestScores(updatedScores);
    }
  };

  useEffect(() => {
    const storedScores = localStorage.getItem("highestScores");
    if (storedScores) {
      setHighestScores(JSON.parse(storedScores));
    } else {
      setHighestScores({});
    }
  }, []);

  useEffect(() => {
    updateHighestScores(highestScores); // Pass the highestScores object from context
  }, [currentLevel, counter, elapsedTime, highestScores]);

  return null;
};

export default HighScore;
