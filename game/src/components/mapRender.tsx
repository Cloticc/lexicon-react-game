import "../css/MapRender.css";

import { MoveChar } from "./MoveChar";

// import { useState } from "react";

//Check if array is an array of arrays
interface MapRenderProps {
	mapData: string[][];
	setMapData: React.Dispatch<React.SetStateAction<string[][]>>;
	playerDirection: string;
	setPlayerDirection: React.Dispatch<React.SetStateAction<string>>;
	playerPosition: { x: number; y: number };
	setPlayerPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
	indicatorPositions: { x: number; y: number }[];
	setIndicatorPositions: React.Dispatch<React.SetStateAction<{ x: number; y: number }[]>>;
	boxPositions: { x: number; y: number }[];
	setBoxPositions: React.Dispatch<React.SetStateAction<{ x: number; y: number }[]>>;
  handleGameFinish: (isGameWon: boolean) => void;
  handleCounter: (newCounter: number) => void;
  handleElapsed: (newElapsedTime: number) => void;
}


export function MapRender({
	mapData,
	setMapData,
	playerDirection,
	setPlayerDirection,
	playerPosition,
	setPlayerPosition,
	indicatorPositions,
	setIndicatorPositions,
	boxPositions,
	setBoxPositions,
  handleGameFinish,
  handleCounter,
  handleElapsed,
}: MapRenderProps) {

	// const [mapData, setMapData] = useState(initialMapData);
	// const [playerDirection, setPlayerDirection] = useState("down");

  const handleGameWonChange = (isGameWon: boolean) => {
    handleGameFinish(isGameWon);
  };

  const handleCounterChange = (newCounter: number) => {
    handleCounter(newCounter);
  };

  const handleElapsedTimeChange = (newElapsedTime: number) => {
    handleElapsed(newElapsedTime);
  };

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
				playerDirection={playerDirection}
				setPlayerDirection={setPlayerDirection}
				playerPosition={playerPosition}
				setPlayerPosition={setPlayerPosition}
				indicatorPositions={indicatorPositions}
				setIndicatorPositions={setIndicatorPositions}
				boxPositions={boxPositions}
				setBoxPositions={setBoxPositions}
        onGameWonChange={handleGameWonChange}
        onCounterChange={handleCounterChange} 
        onElapsedTimeChange={handleElapsedTimeChange}
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
