import "../css/MapRender.css";

import { useContext, useEffect, useRef, useState } from "react";

import { MoveChar } from "./MoveChar";
import { MyContext } from "../ContextProvider/ContextProvider";

//Check if array is an array of arrays
interface MapRenderProps {
  initialMapData: string[][];
}
// example to add the map to the game add the following line to the App.tsx file
// import map1 from './maps/map1.json';
{
  /* <MapRender initialMapData={map1.mapdata} /> */
}

export function MapRender({ initialMapData }: MapRenderProps) {
  const { mapData, setMapData, boxPositions, setBoxPositions, playerPosition, setPlayerPosition, indicatorPositions, setIndicatorPositions, setInitialMapData, resetGame, setInitialPlayerPosition, setInitialBoxPositions } = useContext(MyContext);

  useEffect(() => {
    setMapData(initialMapData);
  }, [setMapData, initialMapData]);

  useEffect(() => {
    setInitialMapData(initialMapData);
    setInitialPlayerPosition(playerStartPosition.current);
    setInitialBoxPositions(boxStartPositions.current);
  }, [initialMapData, setInitialMapData, setInitialPlayerPosition, setInitialBoxPositions]);


  // const [mapData, setMapData] = useState(initialMapData);
  const [playerDirection, setPlayerDirection] = useState("down");
  // const [boxPosition, setBoxPosition] = useState({ x: 5, y: 6 });

  const playerStartPosition = useRef({ x: 5, y: 6 });
  const boxStartPositions = useRef<{ x: number, y: number }[]>([]);
  const IndicatorPositions = useRef<{ x: number, y: number }[]>([]);

  useEffect(() => {
    // Calculate playerStartPosition
    for (let y = 0; y < initialMapData.length; y++) {
      const x = initialMapData[y].indexOf("P");
      if (x !== -1) {
        playerStartPosition.current = { x, y };
        break;
      }
    }

    // Calculate boxStartPositions
    boxStartPositions.current = [];
    for (let y = 0; y < initialMapData.length; y++) {
      for (let x = 0; x < initialMapData[y].length; x++) {
        if (initialMapData[y][x] === "B") {
          boxStartPositions.current.push({ x, y });
        }
      }
    }

    //Calculate indicatorPositions
    IndicatorPositions.current = [];
    for (let y = 0; y < initialMapData.length; y++) {
      for (let x = 0; x < initialMapData[y].length; x++) {
        if (initialMapData[y][x] === "I") {
          IndicatorPositions.current.push({ x, y });
        }
      }
    }


    // Set the initial positions
    setPlayerPosition(playerStartPosition.current);
    setBoxPositions(boxStartPositions.current);
    setIndicatorPositions(IndicatorPositions.current);
  }, [initialMapData, setPlayerPosition, setBoxPositions, setIndicatorPositions]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'R' || event.key === 'r') {
        setMapData(initialMapData);
        setBoxPositions(boxStartPositions.current);
        setPlayerPosition(playerStartPosition.current);
        resetGame();

      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [initialMapData, setMapData, setBoxPositions, setPlayerPosition, resetGame]);

  //will be used to get the class name for each symbol in the map
  const getClassNameForSymbol = (symbol: string, x: number, y: number) => {
    const isIndicator = indicatorPositions.some(
      (pos) => pos.x === x && pos.y === y
    );
    const isBox = boxPositions.some((pos) => pos.x === x && pos.y === y);
    switch (symbol) {
      case "-":
        return "empty";
      case "P":
        return isIndicator
          ? "boxindicator"
          : `ground player-${playerDirection} playerwalk${playerDirection}`;
      case "B":
        return isIndicator && isBox ? "box box-on-indicator" : "box";
      case ",":
        return "ground";
      case "I":
        return "boxindicator";
      case "#":
        return "wall";
      default:
        return "";
    }
  };

  return (
    <div className="grid-container">
      {/* <MoveChar handlePlayerMove={handlePlayerMove} /> */}
      <MoveChar
        mapData={mapData}
        setMapData={setMapData}
        setPlayerDirection={setPlayerDirection}
        indicatorPositions={indicatorPositions}
        setIndicatorPositions={setIndicatorPositions}
        boxPositions={boxPositions}
        setBoxPositions={setBoxPositions}
        playerPosition={playerPosition}
        setPlayerPosition={setPlayerPosition}
      />

      {mapData.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((column: string, columnIndex: number) => {
            const className = getClassNameForSymbol(
              column,
              columnIndex,
              rowIndex
            );

            return (
              <div key={columnIndex} className={`grid-item ${className}`}>
                {className === "boxindicator" && (
                  <div className="boxindicator-container"></div>
                )}
                {className === "box" && <div className="box-container"></div>}
                {className === "boxindicator" &&
                  playerPosition.x === columnIndex &&
                  playerPosition.y === rowIndex && (
                    <div className={`player-${playerDirection}`}></div>
                  )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
