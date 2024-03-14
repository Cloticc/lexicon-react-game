import '../css/MapRender.css';

import { MoveChar } from './MoveChar';
import { useState } from 'react';

//Check if array is an array of arrays
interface MapRenderProps {
  initialMapData: string[][];
}
// example to add the map to the game add the following line to the App.tsx file
// import map1 from './maps/map1.json';
{/* <MapRender initialMapData={map1.mapdata} /> */ }




export function MapRender({ initialMapData }: MapRenderProps) {
  const [mapData, setMapData] = useState(initialMapData);
  const [playerDirection, setPlayerDirection] = useState('down');
  const [boxPosition, setBoxPosition] = useState({ x: 5, y: 6 }); // box starting position on the map


  // Find the 'P' symbol in initialMapData
  let playerStartPosition = { x: 5, y: 6 }; // Default position
  for (let y = 0; y < initialMapData.length; y++) {
    const x = initialMapData[y].indexOf('P');
    if (x !== -1) {
      playerStartPosition = { x, y };
      break;
    }
  }
  const [playerPosition, setPlayerPosition] = useState(playerStartPosition);

  const indicatorStartPositions = []; // Array of positions
  for (let y = 0; y < initialMapData.length; y++) {
    for (let x = 0; x < initialMapData[y].length; x++) {
      if (initialMapData[y][x] === 'I') {
        indicatorStartPositions.push({ x, y });
      }
    }
  }

  const [indicatorPositions, setIndicatorPositions] = useState(indicatorStartPositions);

  //will be used to get the class name for each symbol in the map
  const getClassNameForSymbol = (symbol: string, x: number, y: number) => {
    const isIndicator = indicatorPositions.some(pos => pos.x === x && pos.y === y);
    switch (symbol) {
      case '-': return 'empty';
      case 'P': return isIndicator ? `boxindicator player player-${playerDirection} playerwalk${playerDirection}` : `player-${playerDirection} playerwalk${playerDirection}`;
      case 'B': return 'box';
      case ',': return 'ground';
      case 'I': return 'boxindicator';
      case '#': return 'wall';
      default: return '';
    }
  };

  return (
    <div className="grid-container">
      {/* <MoveChar handlePlayerMove={handlePlayerMove} /> */}
      <MoveChar
        initialMapData={mapData}
        setMapData={setMapData}
        setPlayerDirection={setPlayerDirection}
        indicatorPositions={indicatorPositions}
        setIndicatorPositions={setIndicatorPositions}
        boxPosition={boxPosition}
        setBoxPosition={setBoxPosition}
        playerPosition={playerPosition}
        setPlayerPosition={setPlayerPosition}
      />
      {mapData.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((column, columnIndex) => {
            const className = getClassNameForSymbol(column, columnIndex, rowIndex);
            return (
              <div key={columnIndex} className={`grid-item ${className}`}>
                {className === 'boxindicator' && <div className="boxindicator-container"></div>}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}