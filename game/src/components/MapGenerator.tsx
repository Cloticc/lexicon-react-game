// import "../css/MapGenerator.css"

import "../css/MapRender.css"

import { useContext, useEffect, useMemo, useState } from "react";

import { MapRender } from "./MapRender";
import { MyContext } from "../ContextProvider/ContextProvider";

function Toolbar({ onItemSelected }) {
	const items = useMemo(() => ['wall', 'player', 'box', 'ground', 'boxindicator'], []);

	useEffect(() => {
		const handleKeyDown = (e) => {
			const keyNumber = parseInt(e.key, 10);
			if (keyNumber >= 1 && keyNumber <= items.length) {
				console.log(`Key ${keyNumber} pressed, selecting item ${items[keyNumber - 1]}`);
				onItemSelected(items[keyNumber - 1]);
			}
		};


		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [items, onItemSelected]);

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

function Emptydivs({ gridItems, handleGridClick, handleGridClickBack, onMouseDown, onMouseUp }) {
	return (
		<div className="grid-container-editor" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
			{gridItems.map((row, i) => (
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
			))}
		</div>
	);
}

export function MapGenerator() {
	const {
		mapData,
		setMapData,
	} = useContext(MyContext);

	const [count, setCount] = useState<number>(0);
	const [selectedItem, setSelectedItem] = useState(null);
	const [isShiftDown, setIsShiftDown] = useState(false);
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [showMapRender, setShowMapRender] = useState(false);
	// const [mapData, setMapData] = useState<string[][]>([]);
	const [gridItems, setGridItems] = useState(
		Array.from({ length: 10 }, () => new Array(10).fill(''))
	);


	const handleItemSelected = (item) => {
		console.log(`Item selected: ${item}`);
		setSelectedItem(item);
	};
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Shift') {
				setIsShiftDown(true);
			}
		};

		const handleKeyUp = (e) => {
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
		const data: { mapdata: string[][], html: string } = {
			mapdata: [],
			html: "",
		};

		const rows = document.querySelectorAll<HTMLDivElement>(".grid-row-editor");

		let playerAmount = 0;
		let boxAmount = 0;
		let boxIndicator = 0;
		rows.forEach((row) => {
			const columns = row.querySelectorAll<HTMLDivElement>(".grid-item-editor");
			const array: string[] = [];
			data.mapdata.push(array);
			columns.forEach((column) => {
				let symbol: string;
				if (column.classList.length <= 1 && column.classList.contains("grid-item-editor")) {
					symbol = "-";
				} else if (column.classList.contains("player1")) {
					symbol = "P";
					++playerAmount;
				} else if (column.classList.contains("boxed")) {
					symbol = "B";
					++boxAmount;
				} else if (column.classList.contains("ground")) {
					symbol = ",";
				} else if (column.classList.contains("indicator")) {
					symbol = "I";
					++boxIndicator;
				} else if (column.classList.contains("wall")) {
					symbol = "#";
				}
				array.push(symbol);
			});
		});

		if (playerAmount > 1 || playerAmount === 0) {
			alert("Can/must only have 1 player, please fix...");
			return;
		}

		if (boxAmount === 0) {
			alert("Must have at least one box, please fix...");
			return;
		}

		console.log(boxIndicator, boxAmount);

		if (boxIndicator === 0 || boxIndicator !== boxAmount) {
			alert(
				"You must have the same amount of Box indicators as you have boxes, please fix..."
			);
			return;
		}

		const dataHTML = document.querySelector("#container")!.innerHTML;

		data.html = dataHTML;

		// Convert the JSON data to a Blob
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
		console.log(data);
		// Create a temporary link element
		const link = document.createElement("a");
		link.href = window.URL.createObjectURL(blob);
		console.log(blob);
		const filename = prompt("Name map");
		if (filename) {
			link.download = filename + ".json";

			// Trigger a click event on the link to start the download
			link.click();

			// Cleanup: remove the link and revoke the Blob URL
			link.remove();
			window.URL.revokeObjectURL(link.href);
		}
	}



	const handleGridClick = (e, i, j) => {
		e.stopPropagation();

		// Only update the grid item if the mouse button is down and Shift is held, or if it's a click event
		if ((isMouseDown && isShiftDown) || e.type === 'click') {
			console.log(`Grid item clicked at (${i}, ${j}), placing item ${selectedItem}`);
			// Copy gridItems state
			const newGridItems = [...gridItems];

			// Update the class of the clicked grid item based on the selected item
			newGridItems[i][j] = selectedItem;

			// Update gridItems state
			setGridItems(newGridItems);
		}
	};

	const handleGridClickBack = (e, i, j) => {
		e.stopPropagation();
		e.preventDefault();

		// Copy gridItems state
		const newGridItems = [...gridItems];

		// Update the class of the clicked grid item
		// If the grid item is not empty, set it to empty
		if (newGridItems[i][j] !== '') {
			newGridItems[i][j] = '';
		}

		// Update gridItems state
		setGridItems(newGridItems);
	};


	function toggleGrid(): void {
		const container = document.querySelector<HTMLDivElement>(".grid-container-editor");
		container?.classList.toggle("gridless");
	}


	const generateSymbolArray = () => {
		const symbolArray = gridItems.map((row) =>
			row.map((item) => {
				switch (item) {
					case 'player':
						return 'P';
					case 'box':
						return 'B';
					case 'ground':
						return ',';
					case 'boxindicator':
						return 'I';
					case 'wall':
						return '#';
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
				<button className="generate" onClick={generateMap}>
					Generate Map
				</button>
				<button className="toggle" onClick={toggleGrid}>
					Toggle Grid
				</button>
				<button className="generate-symbol-array" onClick={generateSymbolArray}>
					Generate Symbol Array
				</button>
			</div>
			<Emptydivs
				gridItems={gridItems}
				handleGridClick={handleGridClick}
				handleGridClickBack={handleGridClickBack}
				onMouseDown={() => setIsMouseDown(true)}
				onMouseUp={() => setIsMouseDown(false)}
			/>
			<div className="toolbar">
				<Toolbar onItemSelected={handleItemSelected} />
			</div>
			
			<div>
				<button className="clear-btn" onClick={() => setGridItems(Array.from({ length: 10 }, () => new Array(10).fill('')))}>
					Clear
				</button>
			</div>
			{/* </div> */}
		</>
	);
}



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
