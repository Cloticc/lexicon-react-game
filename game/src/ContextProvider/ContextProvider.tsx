import { createContext, useState } from "react";

interface PlayerPosition {
  x: number;
  y: number;
}

interface BoxPosition {
  x: number;
  y: number;
}

interface GameContextProps {
  test: string;
  setTest: (test: string) => void;
  wonGame: boolean;
  setWonGame: (wonGame: boolean) => void;
  counter: number;
  setCounter: (counter: number) => void;
  elapsedTime: number;
  setElapsedTime: (elapsedTime: number) => void;
  resetGame: () => void;
  mapData: string[][];
  setMapData: (mapData: string[][]) => void;
  boxPositions: { x: number; y: number }[];
  setBoxPositions: (boxPositions: { x: number; y: number }[]) => void;
  playerPosition: { x: number; y: number };
  setPlayerPosition: (playerPosition: { x: number; y: number }) => void;
  indicatorPositions: { x: number; y: number }[];
  setIndicatorPositions: (indicatorPositions: { x: number; y: number }[]) => void;
  initialMapData: string[][];
  setInitialMapData: (initialMapData: string[][]) => void;
  initialPlayerPosition: PlayerPosition;
  setInitialPlayerPosition: (position: PlayerPosition) => void;
  initialBoxPositions: BoxPosition[];
  setInitialBoxPositions: (positions: BoxPosition[]) => void;

  level: number;
  setLevel: (level: number) => void;
  music: string;
  setMusic: (music: string) => void;
}

interface ChildrenProps {
  children: React.ReactNode;
}

export const MyContext = createContext({} as GameContextProps);

export const GameContextProvider = ({ children }: ChildrenProps) => {
  const [state, setState] = useState("Test");
  const [counter, setCounter] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [wonGame, setWonGame] = useState<boolean>(false);
  const [mapData, setMapData] = useState<string[][]>([[]]);
  const [boxPositions, setBoxPositions] = useState<{ x: number; y: number }[]>([]);
  const [playerPosition, setPlayerPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [indicatorPositions, setIndicatorPositions] = useState<{ x: number; y: number }[]>([]);
  const [initialMapData, setInitialMapData] = useState<string[][]>([[]]);
  const [initialPlayerPosition, setInitialPlayerPosition] = useState<PlayerPosition>({ x: 0, y: 0 });
  const [initialBoxPositions, setInitialBoxPositions] = useState<BoxPosition[]>([]);
  const [level, setLevel] = useState<number>(0);
  const [music, setMusic] = useState<string>("");

  const resetGame = () => {
    setState("Test");
    setCounter(0);
    setElapsedTime(0);
    setWonGame(false);
    setMapData(initialMapData);
    setMusic("play");
  }

  const value: GameContextProps = {
    test: state,
    setTest: setState,
    counter: counter,
    setCounter: setCounter,
    elapsedTime: elapsedTime,
    setElapsedTime: setElapsedTime,
    wonGame: wonGame,
    setWonGame: setWonGame,
    resetGame: resetGame,
    mapData: mapData,
    setMapData: setMapData,
    boxPositions: boxPositions,
    setBoxPositions: setBoxPositions,
    playerPosition: playerPosition,
    setPlayerPosition: setPlayerPosition,
    indicatorPositions: indicatorPositions,
    setIndicatorPositions: setIndicatorPositions,
    initialMapData: initialMapData,
    setInitialMapData: setInitialMapData,
    initialPlayerPosition: initialPlayerPosition,
    setInitialPlayerPosition: setInitialPlayerPosition,
    initialBoxPositions: initialBoxPositions,
    setInitialBoxPositions: setInitialBoxPositions,
    level: level,
    setLevel: setLevel,
    music: music,
    setMusic: setMusic,

  };

  return (
    <MyContext.Provider
      value={value}>
      {children}
    </MyContext.Provider>
  );
}