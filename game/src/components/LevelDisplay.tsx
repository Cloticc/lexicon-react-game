import  { useEffect, useState } from "react";
import allMaps from "../maps/maps";

export function LevelDisplay() {
  const [level, setLevel] = useState(1);

  const handleLevel = () => {
    // Get the keys of maps from the import
    const mapKeys = Object.keys(allMaps);
    
    
    const nextIndex = (level % mapKeys.length) + 1;

    // Update the level state
    setLevel(nextIndex);
  };

  useEffect(() => {
    console.log(allMaps);
  }, []);

  return (
    <>
      <h1>Level: {level}</h1>
      <button onClick={handleLevel}>Next Level</button>
    </>
  );
}
