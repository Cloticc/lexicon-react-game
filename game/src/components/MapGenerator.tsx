// import "../css/MapGenerator.css"

// import '../css/MapRender.css';

import { SetStateAction, useContext, useEffect, useMemo, useState } from 'react';

import { MapRender } from './MapRender';
import { MyContext } from '../ContextProvider/ContextProvider';

const ITEMS = [
    'empty',
    'wall',
    'ground',
    'box',
    'boxindicator',
    'player',
    'cracked',
    'mined',
    'special',
    'specialboxed',
    'door',
];

interface ToolbarProps {
    onItemSelected: (item: string) => void;
}
// This is the toolbar component that displays the items that can be selected
function Toolbar({ onItemSelected }: ToolbarProps) {
    const { setContextMenu } = useContext(MyContext);
    // memo becuse we dont want to recreate the array every time the component rerenders
    const items = useMemo(() => ITEMS, []);
    // This is a custom hook that listens for keydown events and calls the provided callback when a number key is pressed (1-9) to select an item
    useEffect(() => {
        const handleKeyDown = (e: { key: string }) => {
            const keyNumber = parseInt(e.key, 10);
            if (keyNumber >= 1 && keyNumber <= items.length) {
                // console.log(`Key ${keyNumber} pressed, selecting item ${items[keyNumber - 1]}`);
                onItemSelected(items[keyNumber - 1]);
                // Hide the context menu
                setContextMenu({ visible: false, x: 0, y: 0 });
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [items, onItemSelected]);
    // This is the toolbar component that displays the items that can be selected
    return (
        <div>
            {items.map((item, index) => (
                <button key={item} onClick={() => onItemSelected(item)}>
                    {index + 1}. {item}
                </button>
            ))}
        </div>
    );
}

interface EmptydivsProps {
    gridItems: string[][];
    handleGridClick: (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        i: number,
        j: number
    ) => void;
    handleGridClickBack: (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        i: number,
        j: number
    ) => void;
    onMouseDown: () => void;
    onMouseUp: () => void;
}

// This is the main component that renders the grid and handles the grid item clicks and context menu
function Emptydivs({
    gridItems,
    handleGridClick,
    handleGridClickBack,
    onMouseDown,
    onMouseUp,
    onItemSelected,
}: EmptydivsProps & ToolbarProps) {
    const { contextMenu, setContextMenu } = useContext(MyContext);
    const items = useMemo(() => ITEMS, []);

    useEffect(() => {
        document.addEventListener('click', () => setContextMenu({ visible: false, x: 0, y: 0 }));
        return () => {
            document.removeEventListener('click', () =>
                setContextMenu({ visible: false, x: 0, y: 0 })
            );
        };
    }, []);

    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        if (contextMenu.visible) {
            setContextMenu({ visible: false, x: 0, y: 0 });
            return;
        }
        setContextMenu({ visible: true, x: event.pageX, y: event.pageY });
    };

    return (
        <div
            className="grid-container-editor"
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onContextMenu={handleContextMenu}
        >
            {gridItems.map((row, i) => (
                <div key={i} className="grid-row-editor">
                    {row.map((item, j) => (
                        <div
                            key={j}
                            className={`grid-item-editor ${item.type}`}
                            data-id={item.id}
                            onClick={(e) => handleGridClick(e, i, j)}
                            onMouseOver={(e) => handleGridClick(e, i, j)}
                            onContextMenu={(e) => handleGridClickBack(e, i, j)}
                        >
                            {item.type === 'specialboxed' && (
                                <div className="specialid">{item.id}</div>
                            )}
                            {item.type === 'special' && <div className="specialid">{item.id}</div>}
                            {item.type === 'door' && <div className="specialid">{item.id}</div>}
                            {/* {item.type === 'ground2' && <div className="boxindicator">{item.id}</div>} */}
                        </div>
                    ))}
                </div>
            ))}
            {/* {gridItems.map((row, i) => (
                <div key={i} className="grid-row-editor">
                    {row.map((item, j) => (
                        <div
                            key={j}
                            className={`grid-item-editor ${item}`}
                            onClick={(e) => handleGridClick(e, i, j)}
                            onMouseOver={(e) => handleGridClick(e, i, j)}
                            onContextMenu={(e) => handleGridClickBack(e, i, j)}
                        ></div>
                    ))}
                </div>
            ))} */}
            {contextMenu.visible && (
                <div className="context-menu" style={{ top: contextMenu.y, left: contextMenu.x }}>
                    {items.map((item, index) => (
                        <p key={item} onClick={() => onItemSelected(item)}>
                            <span>{index + 1}</span> {item}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}

export function MapGenerator() {
    const { mapData, setMapData } = useContext(MyContext);

    const [selectedItem, setSelectedItem] = useState(null);
    const [isShiftDown, setIsShiftDown] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [showMapRender, setShowMapRender] = useState(false);
    // const [mapData, setMapData] = useState<string[][]>([]);
    const [gridItems, setGridItems] = useState(
        Array.from({ length: 10 }, () => new Array(10).fill(''))
    );

    const handleItemSelected = (item: SetStateAction<null>) => {
        // console.log(`Item selected: ${item}`);
        setSelectedItem(item);
    };
    useEffect(() => {
        const handleKeyDown = (e: { key: string }) => {
            if (e.key === 'Shift') {
                setIsShiftDown(true);
            }
        };

        const handleKeyUp = (e: { key: string }) => {
            if (e.key === 'Shift') {
                setIsShiftDown(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    function generateMap(): void {
        const data: { mapdata: string[][]; html: string } = {
            mapdata: [],
            html: '',
        };

        // Use a more specific selector to get the grid items directly
        const gridItems = document.querySelectorAll<HTMLDivElement>(
            '.grid-row-editor .grid-item-editor'
        );

        // Define counters outside the loop
        let playerAmount = 0;
        let boxAmount = 0;
        let boxIndicator = 0;
        let specialBoxIndicator = 0;
        let specialBoxAmount = 0;
        let doorAmount = 0;

        // Define a temporary array to hold the current row
        let row: string[] = [];

        gridItems.forEach((item, index) => {
            // If index is a multiple of 10, we're starting a new row
            if (index % 10 === 0) {
                // If row is not empty, push it to mapdata and start a new row
                if (row.length > 0) {
                    data.mapdata.push(row);
                    row = [];
                }
            }
            // Determine the symbol based on the item's classes
            type ClassToSymbol = {
                [key: string]: {
                    symbol: string;
                    counter?: () => number;
                };
            };
            //add more classes here to get more symbols in the map
            const classToSymbol: ClassToSymbol = {
                player: { symbol: 'P', counter: () => ++playerAmount },
                box: { symbol: 'B', counter: () => ++boxAmount },
                ground: { symbol: ',' },
                boxindicator: { symbol: 'I', counter: () => ++boxIndicator },
                wall: { symbol: '#' },
                specialboxed: { symbol: 'O', counter: () => ++specialBoxIndicator },
                special: { symbol: 'S', counter: () => ++specialBoxAmount },
                door: { symbol: 'D', counter: () => ++doorAmount },
                cracked: { symbol: 'W' },
                mined: { symbol: 'M' },
            };

            let symbol = '-';
            for (const className in classToSymbol) {
                if (item.classList.contains(className)) {
                    symbol = classToSymbol[className].symbol;
                    classToSymbol[className].counter?.();
                    break;
                }
            }

            // Add the symbol to the current row
            row.push(symbol);
        });

        // Add the last row to mapdata
        if (row.length > 0) {
            data.mapdata.push(row);
        }

        if (playerAmount > 1 || playerAmount === 0) {
            alert('Can/must only have 1 player, please fix...');
            return;
        }

        if (boxAmount === 0) {
            alert('Must have at least one box, please fix...');
            return;
        }

        // console.log(boxIndicator, boxAmount);

        if (boxIndicator === 0 || boxIndicator !== boxAmount) {
            alert(
                'You must have the same amount of Box indicators as you have boxes, please fix...'
            );
            return;
        }

        const container = document.querySelector('#container');
        if (container) {
            const dataHTML = container.innerHTML;
            data.html = dataHTML;
        } else {
            console.error("Element with id 'container' not found" + container);
        }

        // Convert the JSON data to a Blob
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        console.log(data);
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        console.log(blob);
        const filename = prompt('Name map');
        if (filename) {
            link.download = filename + '.json';

            // Trigger a click event on the link to start the download
            link.click();

            // Cleanup: remove the link and revoke the Blob URL
            link.remove();
            window.URL.revokeObjectURL(link.href);
        }
    }

    const handleGridClick = (
        e: { stopPropagation: () => void; type: string },
        i: string | number,
        j: string | number
    ) => {
        e.stopPropagation();
        // Only update the grid item if the mouse button is down and Shift is held, or if it's a click event (not a drag)
        if ((isMouseDown && isShiftDown) || e.type === 'click') {
            const newGridItems = [...gridItems];
            // Update the class of the clicked grid item based on the selected item
            if (
                selectedItem === 'door' ||
                selectedItem === 'special' ||
                selectedItem === 'specialboxed'
            ) {
                const id = prompt('Enter an ID (1-9) for this item:');
                if (id && /^[1-9]$/.test(id)) {
                    newGridItems[Number(i)][Number(j)] = { type: selectedItem, id };
                } else {
                    alert('Invalid ID. Please enter a single digit between 1 and 9.');
                }
            } else {
                newGridItems[Number(i)][Number(j)] = { type: selectedItem };
            }

            setGridItems(newGridItems);
        }
    };

    // const handleGridClick = (
    //     e: { stopPropagation: () => void; type: string },
    //     i: string | number,
    //     j: string | number
    // ) => {
    //     e.stopPropagation();

    //     // Only update the grid item if the mouse button is down and Shift is held, or if it's a click event (not a drag)
    //     if ((isMouseDown && isShiftDown) || e.type === 'click') {
    //         // Copy gridItems state
    //         const newGridItems = [...gridItems];

    //         // Update the class of the clicked grid item based on the selected item
    //         if (selectedItem === 'door' || selectedItem === 'special' || selectedItem === 'specialboxed') {
    //             const id = prompt('Enter an ID (1-9) for this item:');
    //             if (id && /^[1-9]$/.test(id)) { // Check if the input is a single digit between 1 and 9
    //                 newGridItems[Number(i)][Number(j)] = selectedItem + '-' + id;
    //             } else {
    //                 alert('Invalid ID. Please enter a single digit between 1 and 9.');
    //             }
    //         } else {
    //             newGridItems[Number(i)][Number(j)] = selectedItem;
    //         }
    //         console.log(newGridItems);
    //         setGridItems(newGridItems);
    //     }
    // };

    // const handleGridClick = (
    //     e: { stopPropagation: () => void; type: string },
    //     i: string | number,
    //     j: string | number
    // ) => {
    //     e.stopPropagation();

    //     // Only update the grid item if the mouse button is down and Shift is held, or if it's a click event (not a drag)
    //     if ((isMouseDown && isShiftDown) || e.type === 'click') {
    //         // console.log(`Grid item clicked at (${i}, ${j}), placing item ${selectedItem}`);
    //         // Copy gridItems state
    //         const newGridItems = [...gridItems];

    //         // Update the class of the clicked grid item based on the selected item
    //         newGridItems[Number(i)][Number(j)] = selectedItem;

    //         // Update gridItems state
    //         setGridItems(newGridItems);
    //     }
    // };

    //dont remove this i to lazy to fix it
    const handleGridClickBack = () => {
        // const handleGridClickBack = (e: { stopPropagation: () => void; preventDefault: () => void; }, i: string | number, j: string | number) => {
        // // e.stopPropagation();
        // // e.preventDefault();
        // // Copy gridItems state
        // const newGridItems = [...gridItems];
        // // Update the class of the clicked grid item
        // // If the grid item is not empty, set it to empty
        // if (newGridItems[i][j] !== '') {
        // 	newGridItems[i][j] = '';
        // }
        // // Update gridItems state
        // setGridItems(newGridItems);
    };

    // function toggleGrid(): void {
    // 	const container = document.querySelector<HTMLDivElement>(".grid-container-editor");
    // 	container?.classList.toggle("gridless");
    // }

    const generateSymbolArray = () => {
        const symbolArray = gridItems.map((row) =>
            row.map((item) => {
                // Split the item string by '-' to get the item type and the ID
                const itemType = item.type;
                const id = item.id;

                switch (itemType) {
                    case 'player':
                        return 'P';
                    case 'box':
                        return 'B';
                    case 'ground':
                        return ',';
                    case 'boxIndicator':
                        return 'I';
                    case 'wall':
                        return '#';
                    case 'specialboxed':
                        return 'O' + id;
                    case 'special':
                        return 'S' + id;
                    case 'door':
                        return 'D' + id;
                    case 'cracked':
                        return 'W';
                    case 'mined':
                        return 'M';
                    default:
                        return '-';
                }
            })
        );

        console.log(symbolArray);
        setMapData(symbolArray);
        setShowMapRender(true);
    };

    const goBack = () => {
        setShowMapRender(false);
    };

    const handleHelp = () => {
        alert(
            '1. Click on the grid to place items\n' +
                '2. Use the toolbar/right click or 1-9Num to select an item\n' +
                '5. Hold Shift to place/draw multiple items\n' +
                "6. Click 'Download Map' to download the map\n" +
                "7. Click 'Test Map' to test the map\n" +
                "8. Click 'Go Back' to go back to the map editor\n" +
                '9. You must have 1 player, 1 or more boxes, and the same amount of box indicators as boxes to download map\n'
        );
    };

    return showMapRender ? (
        <>
            {/* < div className="map-render"> */}
            <MapRender initialMapData={mapData} />
            <div className="go-back">
                <button onClick={goBack}>Go Back</button>
            </div>
            {/* </div> */}
        </>
    ) : (
        <>
            {/* <div className="map-generator"> */}
            <div className="btn-container-top">
                <button onClick={handleHelp}>Help</button>
                <button className="generate" onClick={generateMap}>
                    Download Map
                </button>
                {/* <button className="toggle" onClick={toggleGrid}>
					Toggle Grid
				</button> */}
                <button className="generate-symbol-array" onClick={generateSymbolArray}>
                    Test Map
                </button>
                <div className="toolbar">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <Toolbar onItemSelected={handleItemSelected as any} />
                </div>
                <div>
                    <button
                        className="clear-btn"
                        onClick={() =>
                            setGridItems(Array.from({ length: 10 }, () => new Array(10).fill('')))
                        }
                    >
                        Clear
                    </button>
                </div>
            </div>
            <Emptydivs
                gridItems={gridItems}
                handleGridClick={handleGridClick}
                handleGridClickBack={handleGridClickBack}
                onMouseDown={() => setIsMouseDown(true)}
                onMouseUp={() => setIsMouseDown(false)}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onItemSelected={handleItemSelected as any}
            />

            {/* </div> */}
        </>
    );
}

// const rows = document.querySelectorAll<HTMLDivElement>(".grid-row-editor");

// let playerAmount = 0;
// let boxAmount = 0;
// let boxIndicator = 0;
// rows.forEach((row) => {
// 	const columns = row.querySelectorAll<HTMLDivElement>(".grid-item-editor");
// 	const array: string[] = [];
// 	data.mapdata.push(array);
// 	columns.forEach((column) => {
// 		let symbol: string;
// 		if (column.classList.length <= 1 && column.classList.contains("grid-item-editor")) {
// 			symbol = "-";
// 		} else if (column.classList.contains("player")) {
// 			symbol = "P";
// 			++playerAmount;
// 		} else if (column.classList.contains("box")) {
// 			symbol = "B";
// 			++boxAmount;
// 		} else if (column.classList.contains("ground")) {
// 			symbol = ",";
// 		} else if (column.classList.contains("boxindicator")) {
// 			symbol = "I";
// 			++boxIndicator;
// 		} else if (column.classList.contains("wall")) {
// 			symbol = "#";
// 		}
// 		array.push(symbol);
// 	});
// });

// function handleGridClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
// 	e.stopPropagation();

// 	const thisEl = e.target as HTMLDivElement;
// 	if (thisEl.classList.length === 1 && thisEl.classList.contains("grid-item")) {
// 		thisEl.innerHTML = "";
// 		thisEl.classList.add("wall");
// 	} else if (thisEl.classList.contains("wall")) {
// 		thisEl.innerHTML = "";
// 		thisEl.classList.add("ground");
// 		thisEl.classList.remove("wall");
// 	} else if (thisEl.classList.contains("ground")) {
// 		thisEl.innerHTML = "";
// 		thisEl.innerHTML = '<div class="box"></div>';
// 		thisEl.classList.add("boxed");
// 		thisEl.classList.add("ground2");
// 		thisEl.classList.remove("ground");
// 	} else if (thisEl.classList.contains("boxed")) {
// 		thisEl.innerHTML = "";
// 		thisEl.innerHTML = '<div class="boxindicator"></div>';
// 		thisEl.classList.remove("boxed");
// 		thisEl.classList.add("ground2");
// 		thisEl.classList.add("indicator");
// 	} else if (thisEl.classList.contains("indicator")) {
// 		thisEl.innerHTML = "";
// 		thisEl.innerHTML = '<div class="player"></div>';
// 		thisEl.classList.remove("indicator");
// 		thisEl.classList.add("player1");
// 	} else if (thisEl.classList.contains("player1")) {
// 		thisEl.innerHTML = "";
// 		thisEl.classList.remove("player1");
// 		thisEl.classList.remove("ground2");
// 	}
// }

// function handleGridClickBack(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
// 	e.stopPropagation();
// 	e.preventDefault();
// 	const thisEl = e.target as HTMLDivElement;
// 	if (thisEl.classList.length === 1 && thisEl.classList.contains("grid-item")) {
// 		thisEl.innerHTML = "";
// 		thisEl.classList.add("ground2");
// 		thisEl.classList.add("player1");
// 		thisEl.innerHTML = `<div class="player"></div>`;
// 	} else if (thisEl.classList.contains("player1")) {
// 		thisEl.innerHTML = "";
// 		thisEl.classList.add("ground2");
// 		thisEl.classList.add("indicator");
// 		thisEl.classList.remove("player1");
// 		thisEl.innerHTML = `<div class="boxindicator"></div>`;
// 	} else if (thisEl.classList.contains("indicator")) {
// 		thisEl.innerHTML = "";
// 		thisEl.innerHTML = '<div class="box"></div>';
// 		thisEl.classList.add("boxed");
// 		thisEl.classList.add("ground2");
// 		thisEl.classList.remove("indicator");
// 	} else if (thisEl.classList.contains("boxed")) {
// 		thisEl.innerHTML = "";
// 		thisEl.classList.remove("ground");
// 		thisEl.classList.remove("ground2");
// 		thisEl.classList.remove("boxed");
// 		thisEl.classList.add("ground");
// 	} else if (thisEl.classList.contains("ground")) {
// 		thisEl.innerHTML = "";
// 		thisEl.classList.add("wall");
// 		thisEl.classList.remove("ground");
// 	} else if (thisEl.classList.contains("wall")) {
// 		thisEl.innerHTML = "";
// 		thisEl.classList.remove("wall");
// 	}
// }
