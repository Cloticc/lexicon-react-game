import { useEffect } from "react";

interface MoveCharProps {
  handlePlayerMove: (direction: string) => void;
}

export function MoveChar({ handlePlayerMove }: MoveCharProps) {
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