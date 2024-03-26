import { useCallback, useContext, useEffect, useState } from 'react';

import HighScore from './highscore';
import { MyContext } from '../ContextProvider/ContextProvider';
import { playSound } from '../components/playSound';

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
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

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
    const [currentLevel, setCurrentLevel] = useState<string>('1');

    const [direction, setDirection] = useState<string>('');
    const [levelCompleted, setLevelCompleted] = useState(false);

    //Reduce the number of useContext calls by destructuring the values from the context
    const {
        counter,
        setCounter,
        elapsedTime,
        setElapsedTime,
        wonGame,
        setWonGame,
        gameRunning,
        setGameRunning,
        startTime,
        setStartTime,
        level,
        setLevel,
        highestScores,
        setHighestScores,
        handleHistory,
        setHandleHistory,
        resetGame,
        history,
        setHistory,
        youAreDead,
        setYouAreDead,
        setYouLost,
    } = useContext(MyContext);

    function handleDeath() {
        setYouAreDead(true);
        playSound('lost', 0.4);
        playSound('gameover', 0.4);
        setTimeout(() => {
            setYouAreDead(false);
            resetGame();
        }, 3000);
    }

    function youLost() {
        setYouLost(true);
        playSound('lost', 0.4);
        playSound('gameover', 0.4);
        setTimeout(() => {
            setYouLost(false);
            resetGame();
        }, 3000);
    }

    /**
     * Adds the current state of the game to the history.
     */
    const addToHistory = () => {
        setHistory((prevHistory) => {
            const newHistoryState = {
                mapData,
                playerPosition,
                boxPositions,
                counter,
                direction,
            };

            return [...prevHistory, newHistoryState];
        });
    };

    /**
     * Handles the undo functionality for the game history.
     */
    const handleHistoryUndo = useCallback(() => {
        if (history.length > 1) {
            const prevState = history[history.length - 1];
            const { mapData, playerPosition, direction, boxPositions, counter } = prevState;

            setMapData(mapData);
            setPlayerPosition(playerPosition);
            setPlayerDirection(direction);
            setBoxPositions(boxPositions);
            setCounter(counter);
            setHistory((prev) => prev.slice(0, -1));
            playSound('reverse', 0.3);
            if (counter === 0) {
                if (setGameRunning) {
                    setElapsedTime(0);
                    setGameRunning(false);
                    setPlayerDirection('down');
                }
            }
        } else {
            playSound('reverse', 0.3);
            resetGame();
        }
    }, [history, setMapData, setPlayerPosition, setBoxPositions, setCounter, setPlayerDirection]);

    useEffect(() => {
        setHistory([]);
        setHandleHistory(false);
    }, [level]);

    useEffect(() => {
        // console.log(handleHistory);
        if (handleHistory) {
            handleHistoryUndo();
            setHandleHistory(false);
        }
    }, [handleHistory]);

    useEffect(() => {
        if (startTime && gameRunning) {
            const intervalId = setInterval(() => {
                const elapsed = Math.floor(Date.now() - startTime.getTime());
                setElapsedTime(elapsed);
            }, 100);

            return () => clearInterval(intervalId);
        }
    }, [startTime, gameRunning, currentLevel]);

    const startGame = useCallback(() => {
        setStartTime(new Date());
        setGameRunning(true);
        setWonGame(false);
    }, []);

    const stopGame = useCallback(() => {
        setStartTime(null);
        setGameRunning(false);
        setWonGame(true);
    }, []);

    const isWithinBoundaries = (position: { x: number; y: number }) => {
        return (
            position.x >= 0 &&
            position.x < mapData[0].length &&
            position.y >= 0 &&
            position.y < mapData.length
        );
    };

    const isNotWall = (newMapData: string[][], position: { x: number; y: number }) => {
        return newMapData[position.y][position.x] !== '#';
    };

    const isEmptySpace = (newMapData: string[][], position: { x: number; y: number }) => {
        return newMapData[position.y][position.x] === '-';
    };

    const movePlayer = (newMapData: string[][], newPosition: { x: number; y: number }) => {
        if (
            indicatorPositions.some(
                (pos) => pos.x === playerPosition.x && pos.y === playerPosition.y
            )
        ) {
            newMapData[playerPosition.y][playerPosition.x] = 'I';
        } else {
            newMapData[playerPosition.y][playerPosition.x] = ',';
        }
        newMapData[newPosition.y][newPosition.x] = 'P';
        setCounter(counter + 1);
        setMapData(newMapData);
        playSound('walk', 0.3);
        setPlayerPosition(newPosition);
    };

    const moveBox = (
        newMapData: string[][],
        newPosition: { x: number; y: number },
        beyondBoxPosition: { x: number; y: number },
        boxIndex: number
    ) => {
        newMapData[beyondBoxPosition.y][beyondBoxPosition.x] = 'B';
        playSound('pushbox', 0.4);
        playSound('walk', 0.3);
        if (
            indicatorPositions.some(
                (pos) => pos.x === beyondBoxPosition.x && pos.y === beyondBoxPosition.y
            )
        ) {
            playSound('boxindication', 0.4);
        }
        if (
            indicatorPositions.some(
                (pos) => pos.x === playerPosition.x && pos.y === playerPosition.y
            )
        ) {
            newMapData[playerPosition.y][playerPosition.x] = 'I';
        } else {
            newMapData[playerPosition.y][playerPosition.x] = ',';
        }
        newMapData[newPosition.y][newPosition.x] = 'P';
        setCounter(counter + 1);
        setMapData(newMapData);
        const newBoxPositions = [...boxPositions];
        newBoxPositions[boxIndex] = beyondBoxPosition;
        setBoxPositions(newBoxPositions);
        setPlayerPosition(newPosition);
    };

    const handlePlayerMove = useCallback(
        (direction: string) => {
            setPlayerDirection(direction.toLowerCase());
            setDirection(direction.toLowerCase());

            if (youAreDead) {
                return;
            }

            const newPosition = {
                x: playerPosition.x + directionMap[direction as Direction].x,
                y: playerPosition.y + directionMap[direction as Direction].y,
            };

            if (mapData.length > 0 && mapData[0] && isWithinBoundaries(newPosition)) {
                const newMapData = mapData.map((row: string[]) => [...row]);

                if (isNotWall(newMapData, newPosition)) {
                    const checkEmptySpace = isEmptySpace(newMapData, newPosition);

                    if (checkEmptySpace) {
                        handleDeath();
                    }

                    const boxIndex = boxPositions.findIndex(
                        (pos) => pos.x === newPosition.x && pos.y === newPosition.y
                    );

                    if (boxIndex !== -1) {
                        const beyondBoxPosition = {
                            x: newPosition.x + directionMap[direction as Direction].x,
                            y: newPosition.y + directionMap[direction as Direction].y,
                        };

                        if (
                            isWithinBoundaries(beyondBoxPosition) &&
                            (newMapData[beyondBoxPosition.y][beyondBoxPosition.x] === ',' ||
                                newMapData[beyondBoxPosition.y][beyondBoxPosition.x] === 'I')
                        ) {
                            moveBox(newMapData, newPosition, beyondBoxPosition, boxIndex);
                        }
                    } else {
                        movePlayer(newMapData, newPosition);
                    }

                    if (!gameRunning && counter === 0) {
                        startGame();
                    }
                    addToHistory();
                }
            }
        },
        [
            youAreDead,
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
                case 'ARROWUP':
                case 'W':
                    handlePlayerMove('UP');
                    break;
                case 'ARROWDOWN':
                case 'S':
                    handlePlayerMove('DOWN');
                    break;
                case 'ARROWLEFT':
                case 'A':
                    handlePlayerMove('LEFT');
                    break;
                case 'ARROWRIGHT':
                case 'D':
                    handlePlayerMove('RIGHT');
                    break;
                case ' ':
                    handleHistoryUndo();
                    setHandleHistory(false);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handlePlayerMove, handleHistoryUndo]);

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
                direction = distX > 0 ? 'RIGHT' : 'LEFT';
            } else {
                direction = distY > 0 ? 'DOWN' : 'UP';
            }

            if (direction) {
                handlePlayerMove(direction);
                // Reset the initial touch position after each successful move
                startTouchX = touch.clientX;
                startTouchY = touch.clientY;
            }
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [handlePlayerMove]);

    useEffect(() => {
        let allIndicatorsCovered = true;
        for (const position of indicatorPositions) {
            const { x, y } = position;
            if (mapData[y][x] !== 'B') {
                allIndicatorsCovered = false;
                break;
            }
        }
        // If all indicators are covered and the game is running, declare victory
        if (allIndicatorsCovered && gameRunning) {
            stopGame();
            setWonGame(true);
            setLevelCompleted(true);
            setCurrentLevel(level.toString());
        }
    }, [mapData, counter, elapsedTime, currentLevel, gameRunning]);

    useEffect(() => {
        if (levelCompleted && counter > 0 && elapsedTime > 0) {
            const updateHighScores = () => {
                setHighestScores((prevHighestScores) => {
                    const levelData = prevHighestScores[currentLevel] || {
                        score: Infinity,
                        elapsedTime: 0,
                    };
                    if (
                        counter < levelData.score ||
                        (counter === levelData.score && elapsedTime < levelData.elapsedTime)
                    ) {
                        const updatedScores = {
                            ...prevHighestScores,
                            [currentLevel]: { score: counter, elapsedTime },
                        };
                        localStorage.setItem('highestScores', JSON.stringify(updatedScores));
                        return updatedScores;
                    }
                    return prevHighestScores;
                });
            };

            // Delay the execution of updateHighScores by 2 seconds
            setTimeout(updateHighScores, 1);
            setLevelCompleted(false);
        }
    }, [levelCompleted, currentLevel]);

    return (
        <>
            {wonGame && counter > 0 && elapsedTime > 0 && (
                <HighScore
                    currentLevel={currentLevel}
                    counter={counter}
                    elapsedTime={elapsedTime}
                />
            )}
        </>
    );
}
