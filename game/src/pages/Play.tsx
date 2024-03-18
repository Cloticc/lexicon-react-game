import "./../css/Play.css";

import { useEffect, useState } from "react";

import { Highscore } from "./Highscore";
import { MapRender } from "../components/mapRender";
import { SelectPageProps } from "./../components/InterfacePages";
import { playSound } from "./../components/playSound";
import { formatElapsedTime } from "../utils/TimeUtils";
import map1 from "../maps/map1.json";

export function Play({ onPageChange }: SelectPageProps) {
  const [gameFinish, setFinish] = useState(false);
  const [counter, setCounter] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const handleGameFinish = (isGameWon: boolean) => {
    if (isGameWon) {
      setFinish(true);
    }
  };
  const handleCounter = (newCounter: number) => {
    setCounter(newCounter);
  };
  const handleElapsedTime = (newElapsedTime: number) => {
    setElapsedTime(newElapsedTime);
  };

  const handleSelectLevelClick = () => {
    onPageChange("selectlevel");
    playSound("click", 0.25);
    playSound("swoosh", 0.15);
  };

  function handleMouseOver() {
    playSound("hover", 0.15);
  }
  /*
  // Can remove this useEffect. It's just to show the highscore element after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      setFinish(true);
    }, 3000);
  });
*/
  return (
    <>
      <div id="startpageui">
        <div id="showlevel">Level 1</div>
        <div id="status">
          <div id="stepstaken">{counter} steps</div>
          <span>in</span>
          <div id="timer">{formatElapsedTime(elapsedTime)}</div>
        </div>

        <button
          id="btn-selectlevel"
          className="button"
          onMouseOver={handleMouseOver}
          onClick={handleSelectLevelClick}
        ></button>

        <MapRender
          initialMapData={map1.mapdata}
          handleGameFinish={handleGameFinish}
          handleCounter={handleCounter}
          handleElapsed={handleElapsedTime}
        />
        {gameFinish && <Highscore />}
        <div id="retrogrid"></div>
        <div id="copyright">© 2024 Studio5</div>
      </div>
    </>
  );
}
