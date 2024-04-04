import './../css/Map.css';
import './../css/StartPageUI.css';

import { useContext, useState } from 'react';
import { SelectPageProps } from './../components/InterfacePages';
import { MyContext } from '../ContextProvider/ContextProvider';
import { playSound } from './../components/playSound';

export function StartPageUI({ onPageChange }: SelectPageProps) {
    const { setGameReady, setMusic } = useContext(MyContext);

    const [alias, setAlias] = useState(localStorage.getItem('playerName') || '');
    const handleButtonClick = () => {
        onPageChange('selectlevel');
        playSound('click', 0.25);
        playSound('swoosh', 0.25);
    };

    function handleMouseOver() {
        playSound('hover', 0.15);
    }

    const handleButtonClick2 = () => {
        onPageChange('MapGenerator');
        playSound('click', 0.25);
        playSound('swoosh', 0.25);
        setMusic('create');
        setGameReady(false);
    };

    const handleNameChange = (e: { target: { value: string; }; }) => {
        const newName = e.target.value;
        setAlias(newName);
    };
    const handleSetLocalStorage = () => {
        localStorage.setItem('playerName', alias); 
    };
    const handleKeyDown = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            handleSetLocalStorage();
        }
    };

    const renderInputField = () => {
        if (!localStorage.getItem('playerName')) {
            return (
                <>
                    <input
                        type="text"
                        value={alias}
                        onChange={handleNameChange}
                        onKeyDown={handleKeyDown} 
                        placeholder="Enter your name"
                    />
                    <button onClick={handleSetLocalStorage}>Enter name...</button>
                </>
            );
        }
    };

    return (
        <>
            <div id="player">
                <h1>Sokoban</h1>
                {renderInputField()}
                <div className="player playerwalkdown"></div>
            </div>
            <div id="startplay" onClick={handleButtonClick} onMouseOver={handleMouseOver}></div>
            <div
                id="mapEditor"
                className="button"
                onClick={handleButtonClick2}
                onMouseOver={handleMouseOver}
            ></div>
       
        </>
    );
}
