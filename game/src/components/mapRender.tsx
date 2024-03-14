import '../css/MapRender.css';

import { MoveChar } from './MoveChar'; // Import MoveChar
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
  const [playerPosition, setPlayerPosition] = useState({ x: 5, y: 6 }); // player starting position on the map

  const handlePlayerMove = (direction: string) => {
    // Copy the current player's position
    const newPosition = { ...playerPosition };
    // console.log(playerPosition);
    setPlayerDirection(direction.toLowerCase());

    // Update player's position based on the chosen direction
    if (direction === "UP") {
      newPosition.y -= 1;
    } else if (direction === "DOWN") {
      newPosition.y += 1;
    } else if (direction === "LEFT") {
      newPosition.x -= 1;
    } else if (direction === "RIGHT") {
      newPosition.x += 1;
    }

    // Check if the new position is within the game boundaries
    if (
      newPosition.x >= 0 &&
      newPosition.x < mapData[0].length &&
      newPosition.y >= 0 &&
      newPosition.y < mapData.length
    ) {
      // Create a copy of the current game map
      const newMapData = mapData.map(row => [...row]);

      // Check if the new position is a box ('B')
      if (newMapData[newPosition.y][newPosition.x] === "B") {
        // Calculate the position of the cell beyond the box
        const beyondBoxPosition = { x: newPosition.x, y: newPosition.y };
        if (direction === "UP") {
          beyondBoxPosition.y -= 1;
        } else if (direction === "DOWN") {
          beyondBoxPosition.y += 1;
        } else if (direction === "LEFT") {
          beyondBoxPosition.x -= 1;
        } else if (direction === "RIGHT") {
          beyondBoxPosition.x += 1;
        }


        // Check if the cell beyond the box is within the game boundaries and is empty or a box indicator ('I')
        if (
          beyondBoxPosition.x >= 0 &&
          beyondBoxPosition.x < newMapData[0].length &&
          beyondBoxPosition.y >= 0 &&
          beyondBoxPosition.y < newMapData.length &&
          (newMapData[beyondBoxPosition.y][beyondBoxPosition.x] === "," ||
            newMapData[beyondBoxPosition.y][beyondBoxPosition.x] === "I")
        ) {
          // Move the box to the cell beyond the box
          newMapData[beyondBoxPosition.y][beyondBoxPosition.x] = "B";
          // Move the player to the box's original position
          newMapData[newPosition.y][newPosition.x] = "P";
          // Clear the player's previous position
          newMapData[playerPosition.y][playerPosition.x] = ",";

          // Update the game map
          setMapData(newMapData);
          // Update the player's position
          setPlayerPosition(newPosition);
        }
        // console.log(beyondBoxPosition);
        // console.log(newMapData[beyondBoxPosition.y][beyondBoxPosition.x]);

      }
      // Check if the new position is not a wall ('#')
      else if (newMapData[newPosition.y][newPosition.x] !== "#") {
        // Clear the previous player's position
        newMapData[playerPosition.y][playerPosition.x] = ",";
        // Set the new player's position
        newMapData[newPosition.y][newPosition.x] = "P";

        // Update the player's position
        setPlayerPosition(newPosition);
      }

      // Update the game map
      setMapData(newMapData);
    }
  };
  //will be used to get the class name for each symbol in the map
  const getClassNameForSymbol = (symbol: string) => {
    switch (symbol) {
      case '-': return 'empty';
      case 'P': return `player-${playerDirection} playerwalk${playerDirection}`;
      // case 'P': return `player-${playerDirection} playerwalk${playerDirection}`;
      // case 'P': return `player`;
      case 'B': return 'box';
      case ',': return 'ground';
      case 'I': return 'boxindicator';
      case '#': return 'wall';
      default: return '';
    }
  };

  return (
    <div className="grid-container">
      <MoveChar handlePlayerMove={handlePlayerMove} />
      {mapData.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((column, columnIndex) => {
            const className = getClassNameForSymbol(column);
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