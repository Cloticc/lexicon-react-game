import './../css/Play.css';

import { useContext, useEffect } from 'react';

import { Highscore } from './Highscore';
import { MapRender } from '../components/MapRender';
import { MyContext } from '../ContextProvider/ContextProvider';
import { SelectPageProps } from './../components/InterfacePages';
import allMaps from './../maps/maps';
import { formatElapsedTime } from '../utils/TimeUtils';
import { playSound } from './../components/playSound';

export function Play({ onPageChange }: SelectPageProps) {
    const {
        counter,
        elapsedTime,
        wonGame,
        level,
        youAreDead,
        youLost,
        setMusic,
        setShowGameContainer,
        resetGame,
        gameRunning,
        setGameReady,
    } = useContext(MyContext);

    useEffect(() => {
        setMusic('play');
        setShowGameContainer(true);
    }, []);

    const handleSelectLevelClick = () => {
        resetGame();
        onPageChange('selectlevel');
        playSound('click', 0.25);
        playSound('swoosh', 0.15);
        setGameReady(false);
    };
    const handleSpacePress = () => {
        // setHandleHistory(true);

        const event = new KeyboardEvent('keydown', {
            key: ' ',
        });

        // Dispatch the event
        window.dispatchEvent(event);
    };

    function handleMouseOver() {
        playSound('hover', 0.15);
    }

    /*
	// Can remove this useEffect. It's just to show the highscore element after 3 seconds
	useEffect(() => {
		setTimeout(() => {
			setFinish(true);
		}, 3000);
	});
*/

    return (
        <>
            <div id="showlevel">Level {level + 1}</div>
            <div id="status">
                <div id="stepstaken">{counter} steps</div>
                <div id="timer">{formatElapsedTime(elapsedTime)}</div>
            </div>

            {gameRunning && (
                <button
                    id="btn-undostep"
                    className="button"
                    onMouseOver={handleMouseOver}
                    onClick={handleSpacePress}
                ></button>
            )}

            <button
                id="btn-selectlevel"
                className="button"
                onMouseOver={handleMouseOver}
                onClick={handleSelectLevelClick}
            ></button>
            <button
                id="btn-selectlevel"
                className="button"
                onMouseOver={handleMouseOver}
                onClick={handleSelectLevelClick}
            ></button>
            <MapRender initialMapData={allMaps[level].mapdata} />
            {wonGame && <Highscore />}
            {youAreDead && <h1 className="dead">You are dead</h1>}
            {youLost && <h1 className="dead">You lost</h1>}
        </>
    );
}
