import { MyContext } from '../ContextProvider/ContextProvider';
import { useContext } from 'react';

export function MyComponent() {
  const { test, setTest } = useContext(MyContext);

  const handleClick = () => {
    setTest("new valueasd");
  };

  return <button style={{ zIndex: 100 }} onClick={handleClick}>Change test</button>;
}