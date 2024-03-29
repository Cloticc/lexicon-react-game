import { useContext, useEffect } from 'react';
import { SelectPageProps } from './../components/InterfacePages';
import { MyContext } from '../ContextProvider/ContextProvider';
import { playSound } from './../components/playSound';

export function Settings({ onPageChange }: SelectPageProps) {
    const {
        gameRunning,
        setShowGameContainer,
        isMuted,
        setMuted,
        setMusic,
        setMapData,
        setBoxPositions,
        setPlayerPosition,
        initialMapData,
        resetGame,
        initialPlayerPosition,
        initialBoxPositions,
        totalToken,
        setTotalToken,
        setPlayedMaps,
        toggleSettings,
    } = useContext(MyContext);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                toggleSettings(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const totalTokenLocalStorage = localStorage.getItem('totaltokens');
        if (totalTokenLocalStorage) {
            setTotalToken(parseInt(totalTokenLocalStorage));
        } else {
            setTotalToken(3);
            localStorage.setItem('totaltokens', '3');
        }
    }, [totalToken]);

    function handleMouseOver() {
        playSound('hover', 0.15);
    }

    function handleSoundToggle(): void {
        playSound('click', 0.25);
        if (isMuted) {
            (document.querySelector('#music') as HTMLAudioElement).volume = 0.15;
            setMuted(false);
        } else {
            setMuted(true);
            (document.querySelector('#music') as HTMLAudioElement).volume = 0;
        }
        toggleSettings(false);
    }

    function handleReplay() {
        playSound('click', 0.25);
        playSound('reverse', 0.25);
        setMapData(initialMapData);
        setPlayerPosition(initialPlayerPosition);
        console.log('Initial player Positions: ', initialPlayerPosition);

        setBoxPositions(initialBoxPositions);
        console.log('Initial Box Positions: ', initialBoxPositions);

        resetGame();
        setMusic('play');
        toggleSettings(false);
        setShowGameContainer(false);
        setTimeout(() => {
            setShowGameContainer(true);
        }, 1);
    }

    function handleSolution() {
        if (totalToken > 0) {
            playSound('click', 0.25);
            let newTokenAmount = totalToken - 1;
            if (newTokenAmount < 0) {
                newTokenAmount = 0;
            }
            setTotalToken(newTokenAmount);
            localStorage.setItem('totaltokens', newTokenAmount.toString());

            setMusic('play');
            playSound('collect');
            toggleSettings(false);
        }
    }

    function handleCookie() {
        playSound('click', 0.25);
        const result = window.confirm(
            'Are you sure you want to delete all highscore and total tokens and start over again?'
        );
        if (result) {
            // User clicked "OK"
            localStorage.clear();
            setShowGameContainer(false);
            setTimeout(() => {
                setShowGameContainer(true);
            }, 1);
            onPageChange('start');
            playSound('reverse');
            setTotalToken(3);
            toggleSettings(false);
            setPlayedMaps([]);
        } else {
            // User clicked "Cancel"
            toggleSettings(false);
        }
    }
    return (
        <>
            <div id="settings">
                <h1>Settings</h1>
                <div className="content-container">
                    <button
                        id="btn-sound"
                        className={`button ${isMuted ? 'muted' : ''}`}
                        onClick={handleSoundToggle}
                        onMouseOver={handleMouseOver}
                    ></button>

                    {gameRunning && (
                        <button
                            id="btn-replay"
                            className="button"
                            onClick={handleReplay}
                            onMouseOver={handleMouseOver}
                        ></button>
                    )}

                    {gameRunning && (
                        <div
                            id="btn-solution"
                            className={`button ${totalToken <= 0 ? 'disabled' : ''}`}
                            onClick={handleSolution}
                            onMouseOver={handleMouseOver}
                        >
                            <span className="totaltokens" data-totaltoken={totalToken}>
                                {totalToken}
                            </span>
                        </div>
                    )}

                    <button
                        id="btn-cookie"
                        className="button"
                        onClick={handleCookie}
                        onMouseOver={handleMouseOver}
                    ></button>
                </div>
            </div>
            <div id="darkoverlay"></div>
        </>
    );
}
