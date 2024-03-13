import React, { useState, useEffect } from 'react';

interface MovesCounterProps {
  level: number;
  increase: boolean;
  movesCount: number; 
}

const MovesCounter: React.FC<MovesCounterProps> = ({increase, movesCount }) => {
  const [moves, setMoves] = useState<number>(movesCount); 

  useEffect(() => {
    if (increase) {
      increaseMoves();
    } else {
      decreaseMoves();
    }
  }, [increase]);

  const increaseMoves = () => {
    const updatedMoves = moves + 1;
    setMoves(updatedMoves);
  };

  const decreaseMoves = () => {
    if (moves > 0) {
      const updatedMoves = moves - 1;
      setMoves(updatedMoves);
    }
  };

  return (
    <div id="movesCounter">
      <p>Moves: {moves}</p>
    </div>
  );
};

export default MovesCounter;
