import '../css/MapRender.css';

import { useEffect, useState } from 'react';

//Check if array is an array of arrays
interface MapRenderProps {
  initialMapData: string[][];
}
// example to add the map to the game add the following line to the App.tsx file
// import map1 from './maps/map1.json';
{/* <MapRender initialMapData={map1.mapdata} /> */ }



export function MapRender({ initialMapData }: MapRenderProps) {
  const [mapData, setMapData] = useState(initialMapData);
  // const [playerDirection, setPlayerDirection] = useState('down');

  //will be used to get the class name for each symbol in the map
  const getClassNameForSymbol = (symbol: string) => {
    switch (symbol) {
      case '-': return 'empty';
      // case 'P': return `player-${playerDirection} playerwalk${playerDirection}`;
      case 'P': return `player`;
      case 'B': return 'box';
      case ',': return 'ground';
      case 'I': return 'boxindicator';
      case '#': return 'wall';
      default: return '';
    }
  };

  
  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     switch (event.key) {
  //       case 'ArrowUp':
  //         setPlayerDirection('up');
  //         break;
  //       case 'ArrowDown':
  //         setPlayerDirection('down');
  //         break;
  //       case 'ArrowLeft':
  //         setPlayerDirection('left');
  //         break;
  //       case 'ArrowRight':
  //         setPlayerDirection('right');
  //         break;
  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, []);

  return (
    <div className="grid-container">
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