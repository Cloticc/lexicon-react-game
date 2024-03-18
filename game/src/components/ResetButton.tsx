import '../css/ResetButton.css';

import React from 'react';

interface ResetButtonProps {
  setBoxPositions: React.Dispatch<React.SetStateAction<{x: number, y: number}[]>>;
  setPlayerPosition: React.Dispatch<React.SetStateAction<{x: number, y: number}>>;
  setMapData: React.Dispatch<React.SetStateAction<string[][]>>;
  initialBoxPositions: {x: number, y: number}[];
  initialPlayerPosition: {x: number, y: number};
  initialMapData: string[][];
}

export const ResetButton: React.FC<ResetButtonProps> = ({
  setBoxPositions,
  setPlayerPosition,
  setMapData,
  initialBoxPositions,
  initialPlayerPosition,
  initialMapData
}) => {
  const handleReset = () => {
    setBoxPositions(initialBoxPositions);
    setPlayerPosition(initialPlayerPosition);
    setMapData(initialMapData);
  };

  return <button className='reset-btn' onClick={handleReset}>Reset</button>;
};