import { createContext, useState } from "react";

interface GameContextProps {
	test: string;
	setTest: (test: string) => void;
	otherTest: string;
	setOtherTest: (otherTest: string) => void;
}

interface ChildrenProps {
	children: React.ReactNode;
}

export const MyContext = createContext({} as GameContextProps);

export const GameContextProvider = ({ children }: ChildrenProps) => {
	const [test, setTest] = useState("Test");
	const [otherTest, setOtherTest] = useState("OtherTest");

	const value: GameContextProps = {
		test,
		setTest,
		otherTest,
		setOtherTest,
	};

	return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
