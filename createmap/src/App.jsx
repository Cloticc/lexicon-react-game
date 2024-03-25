import { useState } from "react";
import "./css/App.css";

function App() {
	const [count, setCount] = useState(0);

	function generateMap() {
		const data = {
			mapdata: [],
			html: "",
		};

		const rows = document.querySelectorAll(".grid-row");

		let playerAmount = 0;
		let boxAmount = 0;
		let boxIndicator = 0;
		let specialBoxIndicator = 0;
		let specialBoxAmount = 0;
		let doorAmount = 0;
		rows.forEach((row) => {
			const columns = row.querySelectorAll(".grid-item");
			const array = [];
			data.mapdata.push(array);
			columns.forEach((column) => {
				let symbol;
				if (column.classList.length <= 1 && column.classList.contains("grid-item")) {
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
				} else if (column.classList.contains("cracked")) {
					symbol = "W";
				} else if (column.classList.contains("mined")) {
					symbol = "M";
				} else if (column.classList.contains("specialboxed")) {
					symbol = "O";
					++specialBoxAmount;
				} else if (column.classList.contains("special")) {
					let number = column.querySelector(".specialid").textContent;
					symbol = "S" + number;
					++specialBoxIndicator;
				} else if (column.classList.contains("door")) {
					let number = column.querySelector(".doorid").textContent;
					symbol = "D" + number;
					++doorAmount;
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

		if (specialBoxIndicator !== specialBoxAmount) {
			alert("Special boxes must have the same amount of special box indicator spaces...");
			return;
		}

		if (specialBoxIndicator !== doorAmount) {
			alert("You must place out the same amount of doors, as special box indicators...");
			return;
		}

		console.log(boxIndicator, boxAmount);

		if (boxIndicator === 0 || boxIndicator !== boxAmount) {
			alert(
				"You must have the same amount of Box indicators as you have boxes, please fix..."
			);
			return;
		}

		const dataHTML = document.querySelector("#container").innerHTML;

		data.html = dataHTML;

		// Convert the JSON data to a Blob
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
		console.log(data);
		// Create a temporary link element
		const link = document.createElement("a");
		link.href = window.URL.createObjectURL(blob);
		console.log(blob);
		var filename = prompt("Name map");
		filename += ".json";
		link.download = filename;

		// Trigger a click event on the link to start the download
		link.click();

		// Cleanup: remove the link and revoke the Blob URL
		link.remove();
		window.URL.revokeObjectURL(link.href);
	}

	function handleGridClick(e) {
		e.stopPropagation();

		const thisEl = e.target.closest(".grid-item");
		if (thisEl.classList.length === 1 && thisEl.classList.contains("grid-item")) {
			thisEl.innerHTML = "";
			thisEl.classList.add("wall");
		} else if (thisEl.classList.contains("wall")) {
			thisEl.innerHTML = "";
			thisEl.classList.add("ground");
			thisEl.classList.remove("wall");
		} else if (thisEl.classList.contains("ground")) {
			thisEl.innerHTML = "";
			thisEl.innerHTML = '<div class="box"></div>';
			thisEl.classList.add("boxed");
			thisEl.classList.add("ground2");
			thisEl.classList.remove("ground");
		} else if (thisEl.classList.contains("boxed")) {
			thisEl.innerHTML = "";
			thisEl.innerHTML = '<div class="mine"></div>';
			thisEl.classList.remove("boxed");
			thisEl.classList.add("ground2");
			thisEl.classList.add("mined");
		} else if (thisEl.classList.contains("mined")) {
			thisEl.innerHTML = "";
			thisEl.classList.remove("mined");
			thisEl.classList.remove("ground");
			thisEl.classList.remove("ground2");
			thisEl.classList.add("cracked");
		} else if (thisEl.classList.contains("cracked")) {
			thisEl.innerHTML = "";
			thisEl.innerHTML = '<div class="doorid">1</div>';
			thisEl.classList.remove("cracked");
			thisEl.classList.add("door");
		} else if (thisEl.classList.contains("door")) {
			thisEl.innerHTML = "";
			thisEl.innerHTML = '<div class="specialid">1</div>';
			thisEl.classList.remove("door");
			thisEl.classList.add("special");
			thisEl.classList.add("ground2");
		} else if (thisEl.classList.contains("special")) {
			thisEl.innerHTML = "";
			thisEl.innerHTML = '<div class="specialbox"></div>';
			thisEl.classList.remove("special");
			thisEl.classList.add("specialboxed");
		} else if (thisEl.classList.contains("specialboxed")) {
			thisEl.innerHTML = "";
			thisEl.innerHTML = '<div class="boxindicator"></div>';
			thisEl.classList.remove("specialboxed");
			thisEl.classList.add("ground2");
			thisEl.classList.add("indicator");
		} else if (thisEl.classList.contains("indicator")) {
			thisEl.innerHTML = "";
			thisEl.innerHTML = '<div class="player"></div>';
			thisEl.classList.remove("indicator");
			thisEl.classList.add("player1");
		} else if (thisEl.classList.contains("player1")) {
			thisEl.innerHTML = "";
			thisEl.classList.remove("player1");
			thisEl.classList.remove("ground2");
		}
	}

	function handleGridClickBack(e) {
		e.stopPropagation();
		e.preventDefault();
		const thisEl = e.target.closest(".grid-item");
		if (thisEl.classList.length === 1 && thisEl.classList.contains("grid-item")) {
			thisEl.innerHTML = "";
			thisEl.classList.add("ground2");
			thisEl.classList.add("player1");
			thisEl.innerHTML = `<div class="player"></div>`;
		} else if (thisEl.classList.contains("player1")) {
			thisEl.innerHTML = "";
			thisEl.classList.add("ground2");
			thisEl.classList.add("indicator");
			thisEl.classList.remove("player1");
			thisEl.innerHTML = `<div class="boxindicator"></div>`;
		} else if (thisEl.classList.contains("indicator")) {
			thisEl.innerHTML = "";
			thisEl.innerHTML = '<div class="specialbox"></div>';
			thisEl.classList.add("specialboxed");
			thisEl.classList.remove("indicator");
		} else if (thisEl.classList.contains("specialboxed")) {
			thisEl.innerHTML = "";
			thisEl.innerHTML = '<div class="specialid">1</div>';
			thisEl.classList.add("special");
			thisEl.classList.add("ground2");
			thisEl.classList.remove("specialboxed");
		} else if (thisEl.classList.contains("special")) {
			thisEl.innerHTML = "";
			thisEl.innerHTML = '<div class="doorid">1</div>';
			thisEl.classList.add("door");
			thisEl.classList.remove("ground2");
			thisEl.classList.remove("special");
		} else if (thisEl.classList.contains("door")) {
			thisEl.innerHTML = "";
			thisEl.classList.remove("door");
			thisEl.classList.remove("ground2");
			thisEl.classList.add("cracked");
		} else if (thisEl.classList.contains("cracked")) {
			thisEl.innerHTML = "";
			thisEl.classList.remove("cracked");
			thisEl.classList.add("ground2");
			thisEl.classList.add("mined");
		} else if (thisEl.classList.contains("mined")) {
			thisEl.innerHTML = "";
			thisEl.innerHTML = '<div class="box"></div>';
			thisEl.classList.remove("mined");
			thisEl.classList.add("ground2");
			thisEl.classList.add("boxed");
		} else if (thisEl.classList.contains("boxed")) {
			thisEl.innerHTML = "";
			thisEl.classList.remove("ground");
			thisEl.classList.remove("ground2");
			thisEl.classList.remove("boxed");
			thisEl.classList.add("ground");
		} else if (thisEl.classList.contains("ground")) {
			thisEl.innerHTML = "";
			thisEl.classList.add("wall");
			thisEl.classList.remove("ground");
		} else if (thisEl.classList.contains("wall")) {
			thisEl.innerHTML = "";
			thisEl.classList.remove("wall");
		}
	}

	// Define the function isMouseOverDoorOrSpecial
	function isMouseOverDoorOrSpecial(e) {
		return e.target.classList.contains("door") || e.target.classList.contains("special");
	}

	function toggleGrid() {
		const container = document.querySelector(".grid-container");
		if (container.classList.contains("gridless")) {
			container.classList.remove("gridless");
		} else {
			container.classList.add("gridless");
		}
	}

	function handleScroll(e) {
		if (isMouseOverDoorOrSpecial(e)) {
			let element = e.target.querySelector(".doorid, .specialid");
			let number = parseInt(element.textContent);
			if (e.deltaY < 0) {
				++number;
				if (number > 99) {
					number = 99;
				}
				element.textContent = number;
			}
			if (e.deltaY > 0) {
				--number;
				if (number < 1) {
					number = 1;
				}
				element.textContent = number;
			}
		}
	}

	// Generate empty divs
	function Emptydivs() {
		const rows = [];
		for (let i = 0; i < 10; i++) {
			const columns = [];

			for (let j = 0; j < 10; j++) {
				columns.push(
					<div
						key={j}
						className="grid-item"
						onClick={(e) => {
							handleGridClick(e);
						}}
						onContextMenu={(e) => {
							handleGridClickBack(e);
						}}
						onWheel={(e) => {
							handleScroll(e);
						}}
					></div>
				);
			}

			rows.push(
				<div key={i} className="grid-row">
					{columns}
				</div>
			);
		}
		return <div className="grid-container">{rows}</div>;
	}

	return (
		<>
			<div id="buttons">
				<div id="generate" onClick={generateMap}>
					Generate Map
				</div>
				<div id="togglegrid" onClick={toggleGrid}>
					Toggle Grid Look
				</div>
			</div>

			<div id="container">
				<Emptydivs />
			</div>
		</>
	);
}

export default App;
