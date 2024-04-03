import '../css/MapRender.css';

import { useContext, useEffect, useRef, useState } from 'react';

import { MoveChar } from './MoveChar';
import { MyContext } from '../ContextProvider/ContextProvider';
import { playSound } from './../components/playSound';

//Check if array is an array of arrays
interface MapRenderProps {
    initialMapData: string[][];
}
// example to add the map to the game add the following line to the App.tsx file
// import map1 from './maps/map1.json';
{
    /* <MapRender initialMapData={map1.mapdata} /> */
}

export function MapRender({ initialMapData }: MapRenderProps) {
    const {
        level,
        showGameContainer,
        setShowGameContainer,
        setMusic,
        mapData,
        setMapData,
        boxPositions,
        setBoxPositions,
        playerPosition,
        setPlayerPosition,
        indicatorPositions,
        setIndicatorPositions,
        setInitialMapData,
        resetGame,
        setInitialPlayerPosition,
        setInitialBoxPositions,
        setInitialSpecialBox,
        playerDirection,
        setPlayerDirection,
        youAreDead,
        youLost,
        playerGroundFloor,
        boxGroundFloor,
        collectedTokens,
        setCollectedTokens,
        setTotalToken,
        introDone,
        setIntroDone,
        specialBox,
        setSpecialBox,
        specialBoxIndicator,
        setSpecialBoxIndicator,
        specialDoor,
        setSpecialDoor,
    } = useContext(MyContext);


    const [tokenPosition, setTokenPosition] = useState<{ x: number; y: number } | null>(null);
    useEffect(() => {
        setTimeout(() => {
            setIntroDone(true);
        }, 1600);
    });


    // mount the map
    useEffect(() => {
        setMapData(initialMapData);
    }, [setMapData, initialMapData]);

    // useEffect(() => {
    //     let oldToken = document.querySelector('.token');
    //     if (oldToken) {
    //         oldToken.classList.remove('token');
    //     }

    //     if (level % 6 === 0 && level !== 0) {
    //         var numberFromLevel = undefined;
    //         var tokensArray = JSON.parse(localStorage.getItem('tokens') || '[]');
    //         if (tokensArray !== undefined) {
    //             numberFromLevel =
    //                 tokensArray && tokensArray.find((token: number) => token === level);
    //         } else {
    //             tokensArray = [];
    //         }

    //         if (numberFromLevel === undefined) {
    //             const availablePositions: { x: number; y: number }[] = [];

    //             // Iterate through the mapData array
    //             for (let x = 0; x < mapData.length; x++) {
    //                 for (let y = 0; y < mapData[x].length; y++) {
    //                     // Check if the value is ","
    //                     if (mapData[x][y] === ',') {
    //                         availablePositions.push({ x, y });
    //                     }
    //                 }
    //             }

    //             if (availablePositions.length > 0) {
    //                 // Randomly select a position from available positions
    //                 const randomIndex = Math.floor(Math.random() * availablePositions.length);
    //                 const randomPosition = availablePositions[randomIndex];

    //                 // Set the selected position
    //                 setSelectedPosition(randomPosition);

    //                 localStorage.setItem('tokens', JSON.stringify(tokensArray));
    //             }
    //         }
    //     }
    // }, [level, setLevel]);

    //set useRef to store the initial positions of the player, boxes and indicators
    const playerStartPosition = useRef({ x: 5, y: 6 });
    const boxStartPositions = useRef<{ x: number; y: number }[]>([]);
    const IndicatorPositions = useRef<{ x: number; y: number }[]>([]);
    const specialStartBoxIndicator = useRef<{ x: number; y: number }[]>([]);
    const specialStartBox = useRef<{ x: number; y: number }[]>([]);
    const specialStartDoor = useRef<{ x: number; y: number }[]>([]);

    useEffect(() => {
        // Calculate playerStartPosition
        for (let y = 0; y < initialMapData.length; y++) {
            const x = initialMapData[y].indexOf('P');
            if (x !== -1) {
                playerStartPosition.current = { x, y };
                break;
            }
        }

        // Calculate boxStartPositions
        boxStartPositions.current = [];
        for (let y = 0; y < initialMapData.length; y++) {
            for (let x = 0; x < initialMapData[y].length; x++) {
                if (initialMapData[y][x] === 'B') {
                    boxStartPositions.current.push({ x, y });
                }
            }
        }

        //Calculate indicatorPositions
        IndicatorPositions.current = [];
        for (let y = 0; y < initialMapData.length; y++) {
            for (let x = 0; x < initialMapData[y].length; x++) {
                if (initialMapData[y][x] === 'I') {
                    IndicatorPositions.current.push({ x, y });
                }
            }
        }

        // Calculate specialStartBox
        specialStartBox.current = [];
        for (let y = 0; y < initialMapData.length; y++) {
            for (let x = 0; x < initialMapData[y].length; x++) {
                if (initialMapData[y][x] === 'O') {
                    specialStartBox.current.push({ x, y });
                }
            }
        }

        // Calculate specialStartBoxIndicator
        specialStartBoxIndicator.current = [];
        for (let y = 0; y < initialMapData.length; y++) {
            for (let x = 0; x < initialMapData[y].length; x++) {
                if (initialMapData[y][x].startsWith('S')) {
                    specialStartBoxIndicator.current.push({ x, y });
                }
            }
        }

        // Calculate specialStartDoor
        specialStartDoor.current = [];
        for (let y = 0; y < initialMapData.length; y++) {
            for (let x = 0; x < initialMapData[y].length; x++) {
                if (initialMapData[y][x].startsWith('D')) {
                    specialStartDoor.current.push({ x, y });
                }
            }
        }


        // Set the initial positions
        setPlayerPosition(playerStartPosition.current);
        setBoxPositions(boxStartPositions.current);
        setIndicatorPositions(IndicatorPositions.current);
        setSpecialBoxIndicator(specialStartBoxIndicator.current);
        setSpecialBox(specialStartBox.current);
        setSpecialDoor(specialStartDoor.current);
    }, [initialMapData, setPlayerPosition, setBoxPositions, setIndicatorPositions, setSpecialBoxIndicator, setSpecialBox, setSpecialDoor]);


    // Set the initial positions for the game to reset
    useEffect(() => {
        setInitialMapData(initialMapData);
        setInitialPlayerPosition(playerStartPosition.current);
        setInitialBoxPositions(boxStartPositions.current);
        setInitialSpecialBox(specialStartBox.current);
    }, [initialMapData, setInitialMapData, setInitialPlayerPosition, setInitialBoxPositions]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'R' || event.key === 'r') {
                // setMapData(initialMapData);
                // setBoxPositions(boxStartPositions.current);
                // setPlayerPosition(playerStartPosition.current);
                playSound('click', 0.25);
                playSound('reverse', 0.5);
                setMusic('play');
                setShowGameContainer(false);
                setTimeout(() => {
                    setShowGameContainer(true);
                }, 1);
                if (!youAreDead && !youLost) {
                    setMapData(initialMapData);
                    setBoxPositions(boxStartPositions.current);
                    setPlayerPosition(playerStartPosition.current);
                    playSound('click', 0.25);
                    playSound('reverse', 0.35);
                    setMusic('play');
                    setShowGameContainer(false);
                    setTimeout(() => {
                        setShowGameContainer(true);
                    }, 1);

                    resetGame();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [initialMapData, setMapData, setBoxPositions, setPlayerPosition, resetGame]);

    //will be used to get the class name for each symbol in the map
    const getClassNameForSymbol = (symbol: string, x: number, y: number) => {
        const isIndicator = indicatorPositions.some((pos) => pos.x === x && pos.y === y);
        const isBox = boxPositions.some((pos) => pos.x === x && pos.y === y);
        const isSpecialBox = specialBox.some((pos) => pos.x === x && pos.y === y);
        const isSpecialBoxIndicator = specialBoxIndicator.some((pos) => pos.x === x && pos.y === y);

        switch (symbol[0]) {
            case '-':
                return 'empty';
            case 'P':
                // return isIndicator ? 'boxindicator' : `${playerGroundFloor} player-${playerDirection} playerwalk${playerDirection}`;
                if (isSpecialBoxIndicator) {
                    // return `special player-${playerDirection} playerwalk${playerDirection}`;
                    return `special`;
                } else if (isIndicator) {
                    return 'boxindicator';
                } else {
                    return `${playerGroundFloor} player-${playerDirection} playerwalk${playerDirection}`;
                }
            case 'B':
                return isIndicator && isBox ? 'box box-on-indicator' : `${boxGroundFloor} box`;
            case ',':
                return 'ground';
            case 'I':
                return 'boxindicator';
            case '#':
                return 'wall';
            case 'O':
                if (isSpecialBox && isSpecialBoxIndicator) {
                    return 'special specialon';
                }
                return 'specialboxed';
            case 'S':
                return `${boxGroundFloor} special`;
            case 'D':
                return 'door';
            case 'W':
                return 'cracked';
            case 'M':
                return `${boxGroundFloor} mined`;
            case 'T':
                return `${boxGroundFloor} token`;
            default:
                return '';
        }
    };

    // Function to calculate level class based on current level
    const calculateLevelClass = (currentLevel: number) => {
        // let levelIs = currentLevel + 1;
        const levelIs = currentLevel + 1;
        const levels = ['', 'level10', 'level20', 'level30', 'level40'];
        const index = Math.floor(levelIs / 10) % levels.length;
        return index >= 0 ? levels[index] : ''; // Ensure non-negative index
    };




    const collectedTokensRef = useRef(collectedTokens);

    // Update the ref whenever collectedTokens changes
    useEffect(() => {
        collectedTokensRef.current = collectedTokens;
    }, [collectedTokens]);

    // Load the collectedTokens from localStorage
    useEffect(() => {
        const storedTokens = localStorage.getItem('collectedTokens');
        if (storedTokens) {
            setCollectedTokens(JSON.parse(storedTokens));
        }
    }, []);

    // Save the collectedTokens to localStorage
    useEffect(() => {
        localStorage.setItem('collectedTokens', JSON.stringify(collectedTokens));
    }, [collectedTokens]);

    // Define the placeToken function
    const placeToken = (position: { x: number; y: number }) => {
        // Create a copy of the map data and remove any existing tokens
        const newMapData = mapData.map(row => row.map(cell => cell === 'T' ? ',' : cell));

        // Place the new token
        newMapData[position.y][position.x] = 'T';

        // Update the map data and token position
        setMapData(newMapData);
        setTokenPosition(position);
    };


    // Place a token on the map when the level changes
    useEffect(() => {
        if (level % 6 === 0 && level !== 0) {
            const tokenExists = mapData.some(row => row.includes('T'));
            const tokenCollectedForLevel = collectedTokensRef.current[level] === 1;

            if (!tokenExists && !tokenCollectedForLevel) {
                const availablePositions = mapData.flatMap((row, y) =>
                    row.map((column, x) => column === ',' ? { x, y } : null)
                ).filter(Boolean) as { x: number; y: number }[];

                if (availablePositions.length > 0) {
                    const randomPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];

                    // Delay the token placement
                    setTimeout(() => {
                        if (collectedTokensRef.current[level + 1]) {
                            console.log('Token already collected for this level');
                        } else {
                            console.log('Token not collected for this level');
                            placeToken(randomPosition);
                        }
                    }, 50);
                }
            }
        }
    }, [mapData, level]);

    // Handle token collection
    useEffect(() => {
        // console.log('Checking if a token should be collected...');
        // console.log('tokenPosition:', tokenPosition);
        // console.log('playerPosition:', playerPosition);

        if (tokenPosition && playerPosition.x === tokenPosition.x && playerPosition.y === tokenPosition.y) {
            const newMapData = mapData.map(row => [...row]);
            newMapData[tokenPosition.y][tokenPosition.x] = ',';
            newMapData[playerPosition.y][playerPosition.x] = 'P';
            setMapData(newMapData);
            setTokenPosition(null);


            // Update totalTokens state
            // console.log('collectedTokens:', collectedTokens);
            const total = Object.values(collectedTokens).reduce((a, b) => a + b, 0);
            setTotalToken(total);
            // console.log('total', total);
            // console.log('totalToken', totalToken);
            localStorage.setItem('totalTokens', JSON.stringify(total));
        }
    }, [playerPosition, tokenPosition, mapData, level]);

    // Handle token collection
    useEffect(() => {
        if (tokenPosition && playerPosition.x === tokenPosition.x && playerPosition.y === tokenPosition.y) {
            const newMapData = mapData.map(row => [...row]);
            newMapData[tokenPosition.y][tokenPosition.x] = ',';
            newMapData[playerPosition.y][playerPosition.x] = 'P';
            setMapData(newMapData);
            setTokenPosition(null);

            // Update totalTokens state
            const total = Object.values(collectedTokens).reduce((a, b) => a + b, 0);
            setTotalToken(total);
            localStorage.setItem('totalToken', JSON.stringify(total));
        }
    }, [playerPosition, tokenPosition, mapData, level]);

    // console.log(mapData);


    return (
        <div
            className={`grid-container ${introDone ? 'introdone' : ''}
        ${showGameContainer ? '' : 'hide'}
        ${calculateLevelClass(level)}`}
        >
            {/* <MoveChar handlePlayerMove={handlePlayerMove} /> */}
            <MoveChar
                mapData={mapData}
                setMapData={setMapData}
                setPlayerDirection={setPlayerDirection}
                indicatorPositions={indicatorPositions}
                setIndicatorPositions={setIndicatorPositions}
                boxPositions={boxPositions}
                setBoxPositions={setBoxPositions}
                playerPosition={playerPosition}
                setPlayerPosition={setPlayerPosition}
                specialBox={specialBox}
                setSpecialBox={setSpecialBox}
                specialBoxIndicator={specialBoxIndicator}
                setSpecialBoxIndicator={setSpecialBoxIndicator}
                specialDoor={specialDoor}
                setSpecialDoor={setSpecialDoor}
            />

            {mapData.map((row, rowIndex) => (
                <div key={rowIndex} className="grid-row">
                    {row.map((column: string, columnIndex: number) => {
                        const className = getClassNameForSymbol(column, columnIndex, rowIndex);
                        // const tokenClass = column === 'T' ? 'token' : '';

                        return (
                            <div
                                key={columnIndex}
                                className={`grid-item ${className}`}
                            >
                                {className === 'boxindicator' && (<div className="boxindicator-container"></div>)}
                                {className === 'box' && <div className="box-container"></div>}
                                {className === 'boxindicator' && playerPosition.x === columnIndex && playerPosition.y === rowIndex && (<div className={`player-${playerDirection}`}></div>)}
                                {className === 'special' && playerPosition.x === columnIndex && playerPosition.y === rowIndex && (<div className={`player-${playerDirection}`}></div>)}

                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
