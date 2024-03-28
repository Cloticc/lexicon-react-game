import { useContext, useEffect } from 'react'

import { MyContext } from '../ContextProvider/ContextProvider'
import { playSound } from './../components/playSound'
import allMaps from './../maps/maps'

export function Settings() {
    const {
        toggleSettings,
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
        setPlayerDirection,
        level,
    } = useContext(MyContext)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                toggleSettings(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    function handleMouseOver() {
        playSound('hover', 0.15)
    }

    function handleSoundToggle(): void {
        playSound('click', 0.25)
        if (isMuted) {
            ;(
                document.querySelector('#music') as HTMLAudioElement
            ).volume = 0.15
            setMuted(false)
        } else {
            setMuted(true)
            ;(document.querySelector('#music') as HTMLAudioElement).volume = 0
        }
        toggleSettings(false)
    }

    function handleReplay() {
        playSound('click', 0.25)
        playSound('reverse', 0.25)
        setMapData(initialMapData)
        setPlayerPosition(initialPlayerPosition)
        console.log('Initial player Positions: ', initialPlayerPosition)

        setBoxPositions(initialBoxPositions)
        console.log('Initial Box Positions: ', initialBoxPositions)

        resetGame()
        setMusic('play')
        toggleSettings(false)
        setShowGameContainer(false)
        setTimeout(() => {
            setShowGameContainer(true)
        }, 1)
    }

    function loadSolution(): void {
        playSound('click', 0.25)
        toggleSettings(false)
        resetGame() 
        for (let index = 0; index < allMaps[level].solution.length; index++) {
            const mapData = allMaps[level].solution[index].mapdata
            const direction = allMaps[level].solution[index].direction
            setTimeout(() => {
                setMapData(mapData)
                setPlayerDirection(direction)
            }, index * 500)
            setTimeout(() => {
                resetGame()
            }, (allMaps[level].solution.length + 2) * 500)
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
                    <button
                        id="btn-solution"
                        className="button"
                        onClick={loadSolution}
                        onMouseOver={handleMouseOver}
                    ></button>
                </div>
            </div>
            <div id="darkoverlay"></div>
        </>
    )
}
