import { createContext, useState } from "react";

const gameContext = createContext();

const globalState = {
	text: "from context",
};

const gameContextProvider = ({ children }) => {
	const [state, setState] = useState(globalState);

	return <gameContext.Provider value={{ state, setState }}>{children}</gameContext.Provider>;
};

export { gameContext, gameContextProvider };
