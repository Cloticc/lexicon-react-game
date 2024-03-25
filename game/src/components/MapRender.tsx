import "../css/MapRender.css";

import { useContext, useEffect, useRef, useState } from "react";

import { MoveChar } from "./MoveChar";
import { MyContext } from "../ContextProvider/ContextProvider";
import { playSound } from "./../components/playSound";

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
	const {
		level,
		showGameContainer,
		setShowGameContainer,
		setMusic,
		mapData,
		setMapData,
		boxPositions,
		setBoxPositions,
		playerPosition,
		setPlayerPosition,
		indicatorPositions,
		setIndicatorPositions,
		setInitialMapData,
		resetGame,
		setInitialPlayerPosition,
		setInitialBoxPositions,
		playerDirection,
		setPlayerDirection,
	} = useContext(MyContext);

	// mount the map
	useEffect(() => {
		setMapData(initialMapData);
	}, [setMapData, initialMapData]);


	// const [mapData, setMapData] = useState(initialMapData);

	// const [boxPosition, setBoxPosition] = useState({ x: 5, y: 6 });

	//set useRef to store the initial positions of the player, boxes and indicators
	const playerStartPosition = useRef({ x: 5, y: 6 });
	const boxStartPositions = useRef<{ x: number; y: number }[]>([]);
	const IndicatorPositions = useRef<{ x: number; y: number }[]>([]);



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
	}, [initialMapData, setPlayerPosition, setBoxPositions, setIndicatorPositions, level]);

	// Set the initial positions for the game to reset
	useEffect(() => {
		setInitialMapData(initialMapData);
		setInitialPlayerPosition(playerStartPosition.current);
		setInitialBoxPositions(boxStartPositions.current);
	}, [initialMapData, setInitialMapData, setInitialPlayerPosition, setInitialBoxPositions]);


	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "R" || event.key === "r") {
				setMapData(initialMapData);
				setBoxPositions(boxStartPositions.current);
				setPlayerPosition(playerStartPosition.current);
				playSound("click", 0.25);
				playSound("reverse", 0.5);
				setMusic("play");
				setShowGameContainer(false);
				setTimeout(() => {
					setShowGameContainer(true);
				}, 1);

				resetGame();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [initialMapData, setMapData, setBoxPositions, setPlayerPosition, resetGame]);

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
		<div
			className={`grid-container ${showGameContainer ? "" : "hide"} 
      ${level >= 9 ? "level10" : ""} 
      ${level >= 19 ? "level20" : ""} 
      ${level >= 29 ? "level30" : ""}
      ${level >= 39 ? "level40" : ""}`}
		>
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