import { createContext, useState } from "react";

interface GameContextProps {
	test: string;
	setTest: (test: string) => void;
	wonGame: boolean;
	setWonGame: (wonGame: boolean) => void;
	counter: number;
	setCounter: (counter: number) => void;
	elapsedTime: number;
	setElapsedTime: (elapsedTime: number) => void;
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
	const [level, setLevel] = useState<number>(0);
	const [music, setMusic] = useState<string>("");
	console.log(state);

	return (
		<MyContext.Provider
			value={{
				test: state,
				setTest: setState,
				counter: counter,
				setCounter: setCounter,
				elapsedTime: elapsedTime,
				setElapsedTime: setElapsedTime,
				wonGame: wonGame,
				setWonGame: setWonGame,
				level: level,
				setLevel: setLevel,
				music: music,
				setMusic: setMusic,
			}}
		>
			{children}
		</MyContext.Provider>
	);
};
