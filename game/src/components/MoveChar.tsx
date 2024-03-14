import { useCallback, useEffect } from "react";

interface MoveCharProps {
  initialMapData: string[][];
  setMapData: (mapData: string[][]) => void;
  setPlayerDirection: (direction: string) => void;
  playerPosition: { x: number, y: number };
  setPlayerPosition: (position: { x: number, y: number }) => void;
  indicatorPositions: { x: number, y: number }[];
  setIndicatorPositions: (positions: { x: number, y: number }[]) => void;
  boxPositions: { x: number, y: number }[];
  setBoxPositions: (positions: { x: number, y: number }[]) => void;
}
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const directionMap: Record<Direction, { x: number, y: number }> = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};
/**
 * The function `MoveChar` handles the movement of a character on a map grid, including interactions
 * with boxes and indicators.
 * @param {MoveCharProps}  - The `MoveChar` function takes in several props as parameters:
 */

export function MoveChar({ initialMapData, setMapData, setPlayerDirection, playerPosition, setPlayerPosition, indicatorPositions, boxPositions, setBoxPositions }: MoveCharProps) {
  const handlePlayerMove = useCallback((direction: string) => {
    setPlayerDirection(direction.toLowerCase());


// console.log(boxPositions);

    const newPosition = {
      x: playerPosition.x + directionMap[direction as Direction].x,
      y: playerPosition.y + directionMap[direction as Direction].y
    };

    if (
      newPosition.x >= 0 &&
      newPosition.x < initialMapData[0].length &&
      newPosition.y >= 0 &&
      newPosition.y < initialMapData.length
    ) {
      const newMapData = initialMapData.map((row: string[]) => [...row]);

      if (newMapData[newPosition.y][newPosition.x] !== "#") {
        const boxIndex = boxPositions.findIndex(pos => pos.x === newPosition.x && pos.y === newPosition.y);
        if (boxIndex !== -1) {
          const beyondBoxPosition = {
            x: newPosition.x + directionMap[direction as Direction].x,
            y: newPosition.y + directionMap[direction as Direction].y
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
            if (indicatorPositions.some(pos => pos.x === boxPositions[boxIndex].x && pos.y === boxPositions[boxIndex].y)) {
              newMapData[boxPositions[boxIndex].y][boxPositions[boxIndex].x] = 'I';
            } else {
              newMapData[boxPositions[boxIndex].y][boxPositions[boxIndex].x] = ',';
            }

            setMapData(newMapData);

            const newBoxPositions = [...boxPositions];
            newBoxPositions[boxIndex] = beyondBoxPosition;
            setBoxPositions(newBoxPositions);
          }
        } else {
          if (indicatorPositions.some(pos => pos.x === playerPosition.x && pos.y === playerPosition.y)) {
            newMapData[playerPosition.y][playerPosition.x] = 'I';
          } else {
            newMapData[playerPosition.y][playerPosition.x] = ',';
          }
          newMapData[newPosition.y][newPosition.x] = "P";

          setMapData(newMapData);

          setPlayerPosition(newPosition);
        }
      }
    }
  }, [playerPosition, setPlayerDirection, initialMapData, indicatorPositions, setMapData, setPlayerPosition, setBoxPositions, boxPositions]);


  //check if the player is pressing the arrow keys and move the player accordingly
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

  return null; // No need to render anything
}