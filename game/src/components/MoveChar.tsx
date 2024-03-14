import { useCallback, useEffect } from "react";

interface MoveCharProps {
  initialMapData: string[][];
  setMapData: (mapData: string[][]) => void;
  setPlayerDirection: (direction: string) => void;
  playerPosition: { x: number, y: number };
  setPlayerPosition: (position: { x: number, y: number }) => void;
  indicatorPositions: { x: number, y: number }[];
  setIndicatorPositions: (positions: { x: number, y: number }[]) => void;
  boxPosition: { x: number, y: number };
  setBoxPosition: (position: { x: number, y: number }) => void;
}

export function MoveChar({ initialMapData, setMapData, setPlayerDirection, playerPosition, setPlayerPosition, indicatorPositions, boxPosition, setBoxPosition }: MoveCharProps) {

  const handlePlayerMove = useCallback((direction: string) => {
    // Copy the current player's position
    const newPosition = { ...playerPosition };
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
      newPosition.x < initialMapData[0].length &&
      newPosition.y >= 0 &&
      newPosition.y < initialMapData.length
    ) {
      // Create a copy of the current game map
      const newMapData = initialMapData.map((row: string[]) => [...row]);

      // Check if the new position is not a wall ('#')
      if (newMapData[newPosition.y][newPosition.x] !== "#") {
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
            // Clear the box's previous position
            if (indicatorPositions.some(pos => pos.x === boxPosition.x && pos.y === boxPosition.y)) {
              newMapData[boxPosition.y][boxPosition.x] = 'I';
            } else {
              newMapData[boxPosition.y][boxPosition.x] = ',';
            }

            // Update the game map
            setMapData(newMapData);

            // Update the box's position
            setBoxPosition(newPosition);
          }
        }

        // Clear the previous player's position
        if (indicatorPositions.some(pos => pos.x === playerPosition.x && pos.y === playerPosition.y)) {
          newMapData[playerPosition.y][playerPosition.x] = 'I';
        } else {
          newMapData[playerPosition.y][playerPosition.x] = ',';
        }
        // Set the new player's position
        newMapData[newPosition.y][newPosition.x] = "P";

        // Update the game map
        setMapData(newMapData);

        // Update the player's position
        setPlayerPosition(newPosition);
      }

    }
    setPlayerDirection(direction.toLowerCase());

  }, [playerPosition, setPlayerDirection, initialMapData, indicatorPositions, setMapData, setPlayerPosition, setBoxPosition, boxPosition.x, boxPosition.y]);



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