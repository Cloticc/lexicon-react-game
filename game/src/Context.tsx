import { createContext, useState, ReactNode } from 'react';
interface GlobalStateType {
    text: string;
}

interface ContextType {
    state: GlobalStateType;
    setState: React.Dispatch<React.SetStateAction<GlobalStateType>>;
}

const gameContext = createContext<ContextType | undefined>(undefined);

const globalState: GlobalStateType = {
    text: 'from context',
};

const gameContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<GlobalStateType>(globalState);

    return <gameContext.Provider value={{ state, setState }}>{children}</gameContext.Provider>;
};

export { gameContext, gameContextProvider };
