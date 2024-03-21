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
	settings: boolean;
	toggleSettings: (settings: boolean) => void;
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
	startTime: Date;
	setStartTime: (startTime: Date) => void;
	gameRunning?: boolean;
	setGameRunning?: (gameRunning: boolean) => void;
	isMuted: boolean;
	setMuted: (setMuted: boolean) => void;
	showGameContainer: boolean;
	setShowGameContainer: (setShowGameContainer: boolean) => void;
	playedMaps: number[];
	setPlayedMaps: (playedMaps: number[]) => void;
	highestScores: {
		[level: string]: { score: number; elapsedTime: number };
	};
	setHighestScores: (highestScores: {
		[level: string]: { score: number; elapsedTime: number };
	}) => void;
  handleHistory: boolean;
  setHandleHistory: (handleHistory: boolean) => void;
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
  const [boxPositions, setBoxPositions] = useState<{ x: number; y: number }[]>(
    []
  );
  const [playerPosition, setPlayerPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [indicatorPositions, setIndicatorPositions] = useState<
    { x: number; y: number }[]
  >([]);
  const [initialMapData, setInitialMapData] = useState<string[][]>([[]]);
  const [initialPlayerPosition, setInitialPlayerPosition] =
    useState<PlayerPosition>({
      x: 0,
      y: 0,
    });
  const [initialBoxPositions, setInitialBoxPositions] = useState<BoxPosition[]>(
    []
  );
  const [level, setLevel] = useState<number>(0);
  const [music, setMusic] = useState<string>("");
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const [isMuted, setMuted] = useState<boolean>(false);
  const [settings, toggleSettings] = useState<boolean>(false);
  const [showGameContainer, setShowGameContainer] = useState<boolean>(false);
  const [playedMaps, setPlayedMaps] = useState<number[]>([]);
  const [highestScores, setHighestScores] = useState<{
    [level: string]: { score: number; elapsedTime: number };
  }>({});
  const [handleHistory, setHandleHistory] = useState<boolean>(false);
  const resetGame = () => {
    setState("Test");
    setCounter(0);
    setElapsedTime(0);
    setWonGame(false);
    setGameRunning(false);
    setMapData(initialMapData);
    setMusic("play");
    setStartTime(new Date());
    setGameRunning(false);
    setPlayerPosition(initialPlayerPosition);
    setBoxPositions(initialBoxPositions);
    

  };

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
    startTime: startTime,
    setStartTime: setStartTime,
    gameRunning: gameRunning,
    setGameRunning: setGameRunning,
    isMuted: isMuted,
    setMuted: setMuted,
    settings: settings,
    toggleSettings: toggleSettings,
    showGameContainer: showGameContainer,
    setShowGameContainer: setShowGameContainer,
    playedMaps: playedMaps,
    setPlayedMaps: setPlayedMaps,
    highestScores: highestScores,
    setHighestScores: setHighestScores,
    handleHistory: handleHistory,
    setHandleHistory: setHandleHistory,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
