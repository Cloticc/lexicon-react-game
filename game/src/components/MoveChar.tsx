import { useCallback, useEffect, useState } from "react";

import { playSound } from "../components/playSound";

interface MoveCharProps {
	mapData: string[][];
	setMapData: (mapData: string[][]) => void;
	setPlayerDirection: (direction: string) => void;
	playerPosition: { x: number; y: number };
	setPlayerPosition: (position: { x: number; y: number }) => void;
	indicatorPositions: { x: number; y: number }[];
	setIndicatorPositions: (positions: { x: number; y: number }[]) => void;
	boxPositions: { x: number; y: number }[];
	setBoxPositions: (positions: { x: number; y: number }[]) => void;
}
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const directionMap: Record<Direction, { x: number; y: number }> = {
	UP: { x: 0, y: -1 },
	DOWN: { x: 0, y: 1 },
	LEFT: { x: -1, y: 0 },
	RIGHT: { x: 1, y: 0 },
};

export function MoveChar({
	mapData,
	setMapData,
	setPlayerDirection,
	playerPosition,
	setPlayerPosition,
	indicatorPositions,
	boxPositions,
	setBoxPositions,
}: MoveCharProps) {
	const [gameWon, setGameWon] = useState(false);
	const [counter, setCounter] = useState(0);
	const [startTime, setStartTime] = useState<Date | null>(null);
	const [elapsedTime, setElapsedTime] = useState<number>(0);
	const [gameRunning, setGameRunning] = useState<boolean>(false);
	const [highestScores, setHighestScores] = useState<{
		[level: string]: { score: number; elapsedTime: number };
	}>({});
	const [currentLevel, setCurrentLevel] = useState<string>("1");

	useEffect(() => {
		const storedScores = localStorage.getItem("highestScores");
		if (storedScores) {
			setHighestScores(JSON.parse(storedScores));
		}
	}, []);

	useEffect(() => {
		if (startTime && gameRunning) {
			const intervalId = setInterval(() => {
				const elapsed = Math.floor((Date.now() - startTime.getTime()) / 1000);
				setElapsedTime(elapsed);
			}, 1000);

			return () => clearInterval(intervalId);
		}
	}, [startTime, gameRunning]);

	const startGame = useCallback(() => {
		setStartTime(new Date());
		setGameRunning(true);
	}, []);

	const stopGame = useCallback(() => {
		setStartTime(null);
		setGameRunning(false);
	}, []);

	const handlePlayerMove = useCallback(
		(direction: string) => {
			setPlayerDirection(direction.toLowerCase());

			const newPosition = {
				x: playerPosition.x + directionMap[direction as Direction].x,
				y: playerPosition.y + directionMap[direction as Direction].y,
			};

			if (
				mapData.length > 0 &&
				mapData[0] &&
				newPosition.x >= 0 &&
				newPosition.x < mapData[0].length &&
				newPosition.y >= 0 &&
				newPosition.y < mapData.length
			) {
				const newMapData = mapData.map((row: string[]) => [...row]);

				if (newMapData[newPosition.y][newPosition.x] !== "#") {
					const boxIndex = boxPositions.findIndex(
						(pos) => pos.x === newPosition.x && pos.y === newPosition.y
					);

					playSound("walk", 0.3);

					if (boxIndex !== -1) {
						const beyondBoxPosition = {
							x: newPosition.x + directionMap[direction as Direction].x,
							y: newPosition.y + directionMap[direction as Direction].y,
						};

						if (
							beyondBoxPosition.x >= 0 &&
							beyondBoxPosition.x < newMapData[0].length &&
							beyondBoxPosition.y >= 0 &&
							beyondBoxPosition.y < newMapData.length &&
							(newMapData[beyondBoxPosition.y][beyondBoxPosition.x] === "," ||
								newMapData[beyondBoxPosition.y][beyondBoxPosition.x] === "I")
						) {
							newMapData[beyondBoxPosition.y][beyondBoxPosition.x] = "B";
							playSound("pushbox", 0.4);
							if (
								indicatorPositions.some(
									(pos) =>
										pos.x === boxPositions[boxIndex].x &&
										pos.y === boxPositions[boxIndex].y
								)
							) {
								newMapData[boxPositions[boxIndex].y][boxPositions[boxIndex].x] =
									"I";
							} else {
								newMapData[boxPositions[boxIndex].y][boxPositions[boxIndex].x] =
									",";
							}

							if (
								indicatorPositions.some(
									(pos) =>
										pos.x === beyondBoxPosition.x &&
										pos.y === beyondBoxPosition.y
								)
							) {
								playSound("boxindication", 0.4);
							}
							if (
								indicatorPositions.some(
									(pos) =>
										pos.x === playerPosition.x && pos.y === playerPosition.y
								)
							) {
								newMapData[playerPosition.y][playerPosition.x] = "I";
							} else {
								newMapData[playerPosition.y][playerPosition.x] = ",";
							}
							newMapData[newPosition.y][newPosition.x] = "P";

							setCounter((prevCounter) => prevCounter + 1);
							setMapData(newMapData);

							const newBoxPositions = [...boxPositions];
							newBoxPositions[boxIndex] = beyondBoxPosition;
							setBoxPositions(newBoxPositions);

							setPlayerPosition(newPosition);
						}
					} else {
						if (
							indicatorPositions.some(
								(pos) => pos.x === playerPosition.x && pos.y === playerPosition.y
							)
						) {
							newMapData[playerPosition.y][playerPosition.x] = "I";
						} else {
							newMapData[playerPosition.y][playerPosition.x] = ",";
						}
						newMapData[newPosition.y][newPosition.x] = "P";
						setCounter((prevCounter) => prevCounter + 1);
						setMapData(newMapData);

						setPlayerPosition(newPosition);
					}

					if (!gameRunning && counter === 1) {
						startGame(); // Start the game when the first move is made
					}
				}
			}
		},
		[
			mapData,
			playerPosition,
			setPlayerDirection,
			indicatorPositions,
			setMapData,
			setPlayerPosition,
			setBoxPositions,
			boxPositions,
			gameRunning,
			counter,
			startGame,
		]
	);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			switch (event.key.toUpperCase()) {
				case "ARROWUP":
				case "W":
					handlePlayerMove("UP");
					break;
				case "ARROWDOWN":
				case "S":
					handlePlayerMove("DOWN");
					break;
				case "ARROWLEFT":
				case "A":
					handlePlayerMove("LEFT");
					break;
				case "ARROWRIGHT":
				case "D":
					handlePlayerMove("RIGHT");
					break;
				default:
					break;
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handlePlayerMove]);

	useEffect(() => {
		let startTouchX: number | null = null;
		let startTouchY: number | null = null;
		const threshold = 10; // Threshold value for touch movement

		const handleTouchStart = (event: TouchEvent) => {
			const touch = event.touches[0];
			startTouchX = touch.clientX;
			startTouchY = touch.clientY;
		};

		const handleTouchMove = (event: TouchEvent) => {
			if (startTouchX === null || startTouchY === null) return; // Touch didn't start properly

			const touch = event.touches[0];
			const distX = touch.clientX - startTouchX;
			const distY = touch.clientY - startTouchY;

			// Check if the touch movement exceeds the threshold
			if (Math.abs(distX) < threshold && Math.abs(distY) < threshold) return;

			let direction: Direction | null = null;

			// Determine the swipe direction
			if (Math.abs(distX) > Math.abs(distY)) {
				direction = distX > 0 ? "RIGHT" : "LEFT";
			} else {
				direction = distY > 0 ? "DOWN" : "UP";
			}

			if (direction) {
				handlePlayerMove(direction);
				// Reset the initial touch position after each successful move
				startTouchX = touch.clientX;
				startTouchY = touch.clientY;
			}
		};

		window.addEventListener("touchstart", handleTouchStart);
		window.addEventListener("touchmove", handleTouchMove);

		return () => {
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchmove", handleTouchMove);
		};
	}, [handlePlayerMove]);

	useEffect(() => {
		let allIndicatorsCovered = true;

		// Iterate through all indicator positions
		for (const position of indicatorPositions) {
			const { x, y } = position;

			// Check if the cell indicated by the position is not a box
			if (mapData[y][x] !== "B") {
				allIndicatorsCovered = false;
				break; // If any indicator position is not covered, break the loop
			}
		}

		// If all indicators are covered, declare victory
		if (allIndicatorsCovered) {
			setGameWon(true);
			stopGame();
			const levelData = highestScores[currentLevel] || {
				score: Infinity,
				elapsedTime: 0,
			};
			if (
				counter < levelData.score ||
				(counter === levelData.score && elapsedTime < levelData.elapsedTime)
			) {
				const updatedScores = {
					...highestScores,
					[currentLevel]: { score: counter, elapsedTime },
				};
				setHighestScores(updatedScores);
				localStorage.setItem("highestScores", JSON.stringify(updatedScores));
			}
		}
	}, [mapData, gameWon, counter, elapsedTime, currentLevel, highestScores]);

	return (
		<>
			{gameWon && (
				<div className="victory-alert">
					<h1>Congratulations! You've won the game!</h1>
				</div>
			)}
			<div>
				<h2>Counter: {counter}</h2>
				<p>Elapsed Time: {startTime && gameRunning ? `${elapsedTime}s` : "0s"}</p>
			</div>
		</>
	);
}
