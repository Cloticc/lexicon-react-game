import "../css/MapRender.css";

import { MoveChar } from "./MoveChar";
import { useState } from "react";

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
	const [mapData, setMapData] = useState(initialMapData);
	const [playerDirection, setPlayerDirection] = useState("down");
	// const [boxPosition, setBoxPosition] = useState({ x: 5, y: 6 });

	/* This code snippet is finding the initial position of the player ('P') on the map by iterating
  through the `initialMapData` array. */
	let playerStartPosition = { x: 5, y: 6 };
	for (let y = 0; y < initialMapData.length; y++) {
		const x = initialMapData[y].indexOf("P");
		if (x !== -1) {
			playerStartPosition = { x, y };
			break;
		}
	}
	const [playerPosition, setPlayerPosition] = useState(playerStartPosition);

	/* This code snippet is initializing an empty array called `indicatorStartPositions` and then looping
  through the `initialMapData` array to find positions where the symbol 'I' (representing an
  indicator) is located. For each position where 'I' is found, an object with the x and y coordinates
  of that position is pushed into the `indicatorStartPositions` array. This process effectively
  collects the initial positions of all the indicators on the map and stores them in the
  `indicatorStartPositions` array for later use in the component. */
	const indicatorStartPositions = []; // Array of positions
	for (let y = 0; y < initialMapData.length; y++) {
		for (let x = 0; x < initialMapData[y].length; x++) {
			if (initialMapData[y][x] === "I") {
				indicatorStartPositions.push({ x, y });
			}
		}
	}

	const [indicatorPositions, setIndicatorPositions] = useState(indicatorStartPositions);

	/* This code snippet is initializing an empty array called `boxStartPositions` and then looping through
  the `initialMapData` array to find positions where the symbol 'B' (representing a box) is located.
  For each position where 'B' is found, an object with the x and y coordinates of that position is
  pushed into the `boxStartPositions` array. This process effectively collects the initial positions
  of all the boxes on the map and stores them in the `boxStartPositions` array for later use in the
  component. */
	const boxStartPositions = []; // Array of positions
	for (let y = 0; y < initialMapData.length; y++) {
		for (let x = 0; x < initialMapData[y].length; x++) {
			if (initialMapData[y][x] === "B") {
				boxStartPositions.push({ x, y });
			}
		}
	}

	const [boxPositions, setBoxPositions] = useState(boxStartPositions);
	// console.log(boxPositions , "boxPositions");

	//will be used to get the class name for each symbol in the map
	const getClassNameForSymbol = (symbol: string, x: number, y: number) => {
		const isIndicator = indicatorPositions.some((pos) => pos.x === x && pos.y === y);
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
					{row.map((column, columnIndex) => {
						const className = getClassNameForSymbol(column, columnIndex, rowIndex);

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
