import React, { useState } from "react";

export function MoveChar() {
  // Set up the game map and player's starting position
  const [gameMap, setGameMap] = useState([
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", "#", "#", "#", " ", " ", " ", " "],
    [" ", " ", " ", "#", "P", "#", " ", " ", " ", " "],
    [" ", " ", " ", "#", "B", "#", "#", " ", " ", " "],
    [" ", "#", "#", "#", "B", " ", "#", " ", " ", " "],
    [" ", "#", "P", " ", "B", "G", "#", " ", " ", " "],
    [" ", "#", "#", "#", "#", "#", "#", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ]);

  // Set the player's initial position
  const [playerPosition, setPlayerPosition] = useState({
    x: 5, // Horizontal position
    y: 6, // Vertical position
  });

  // Function to handle player movement
  const movePlayer = (direction: string) => {
    // Copy the current player's position
    const newPosition = { ...playerPosition };

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
      newPosition.x < gameMap[0].length &&
      newPosition.y >= 0 &&
      newPosition.y < gameMap.length
    ) {
      // Check if the new position is not a wall ('#')
      if (gameMap[newPosition.y][newPosition.x] !== "#") {
        // Update the game map with the new player's position
        const newGameMap = gameMap.map(function (row, rowIndex) {
          return row.map(function (cell, columnIndex) {
            // Clear the previous player's position
            if (
              rowIndex === playerPosition.y &&
              columnIndex === playerPosition.x
            ) {
              return " ";
            }
            // Set the new player's position
            else if (
              rowIndex === newPosition.y &&
              columnIndex === newPosition.x
            ) {
              return "P";
            }
            // Keep the existing cell value if it's not related to the player
            else {
              return cell;
            }
          });
        });

        // Update the game map and player's position
        setGameMap(newGameMap);
        setPlayerPosition(newPosition);
      }
    }
  };

  // Render the game map
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 30px)" }}>
        {gameMap.map(function (row, rowIndex) {
          return row.map(function (cell, columnIndex) {
            return (
              <div
                key={`${rowIndex}-${columnIndex}`}
                style={{
                  width: "30px",
                  height: "30px",
                  border: "1px solid #ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: cell === "#" ? "#333" : cell === "P" ? "#00f" : "#fff",
                  color: cell === "#" ? "#fff" : "#000",
                }}
              >
                {cell === "B" ? "Box" : ""}
              </div>
            );
          });
        })}
      </div>

      {/* Buttons for player movement */}
      <div>
        <button onClick={() => movePlayer("UP")}>Move Up</button>
        <button onClick={() => movePlayer("DOWN")}>Move Down</button>
        <button onClick={() => movePlayer("LEFT")}>Move Left</button>
        <button onClick={() => movePlayer("RIGHT")}>Move Right</button>
      </div>
    </>
  );
}
