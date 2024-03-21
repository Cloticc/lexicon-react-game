import "./../css/Play.css";

import { useContext, useEffect } from "react";

import { Highscore } from "./Highscore";
import { MapRender } from "../components/mapRender";
import { MyContext } from "../ContextProvider/ContextProvider";
import { SelectPageProps } from "./../components/InterfacePages";
import allMaps from "./../maps/maps";
import { formatElapsedTime } from "../utils/TimeUtils";
import { playSound } from "./../components/playSound";

export function Play({ onPageChange }: SelectPageProps) {
	const { counter } = useContext(MyContext);
	const { elapsedTime } = useContext(MyContext);
	const { wonGame } = useContext(MyContext);
	const { level } = useContext(MyContext);
	const { setMusic } = useContext(MyContext);
	const { setShowGameContainer } = useContext(MyContext);
	const { resetGame } = useContext(MyContext);

  useEffect(() => {
    setMusic("play");
    setShowGameContainer(true);
  }, []);

  const handleSelectLevelClick = () => {
    resetGame();
    onPageChange("selectlevel");
    playSound("click", 0.25);
    playSound("swoosh", 0.15);
  };
  function handleSpacePress() {

    // Call handleSpacePress function from MoveChar component
    // This function can be left empty for now if you don't have any logic to execute on space press in the Play component
  }
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
      <div id="showlevel">Level {level + 1}</div>
      <div id="status">
        <div id="stepstaken">{counter} steps</div>
        <div id="timer">{formatElapsedTime(elapsedTime)}</div>
      </div>
      <button
        id="btn-undostep"
        className="button"
        onMouseOver={handleMouseOver}
        onClick={handleSpacePress}
      ></button>

      <button
        id="btn-selectlevel"
        className="button"
        onMouseOver={handleMouseOver}
        onClick={handleSelectLevelClick}
      ></button>

      <MapRender initialMapData={allMaps[level].mapdata} handleSpacePress={handleSpacePress}/>
      {wonGame && <Highscore />}
    </>
  );
}
