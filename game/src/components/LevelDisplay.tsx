import { useEffect, useState } from "react";


export function LevelDisplay() {
  const [level, setLevel] = useState(1);

  // const getMapData = async (level: number) => {
  //   try {
  //     const response = await fetch(`../maps/map${level}.json`);
  //     console.log(response)
  //     if (!response.ok) {
  //       throw new Error(`failed to fetch data: level ${level}`);
  //     }
  //     const jsonData = await response.json();
  //     console.log(jsonData);
  //   } catch (error) {
  //     console.error("Error fetching map data:", error);
  //   }
  // };

  // useEffect(() => {
  //   getMapData(level);
  // }, []);

  const getData = async () => {
    try {
      const response = await fetch("./users.json");
      console.log(response)
      if (!response.ok) {
        throw new Error(`failed to fetch data from users`);
      }
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <>
      <h1>Level Display</h1>
      <h2>{level}</h2>
    </>
  );
}
