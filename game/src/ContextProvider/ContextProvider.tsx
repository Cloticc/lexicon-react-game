import { createContext, useState } from "react";

interface GameContextProps {
  test: string;
  setTest: (test: string) => void;
}


interface ChildrenProps {
  children: React.ReactNode;
}

export const MyContext = createContext({} as GameContextProps);


export const GameContextProvider = ({ children }: ChildrenProps) => {
  const [state, setState] = useState("Test");
  console.log(state);

  return (
    <MyContext.Provider value={{ test: state, setTest: setState }}>
      {children}
    </MyContext.Provider>
  );
};