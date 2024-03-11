import { useState } from "react";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	function generateMap() {
		const data = document.querySelector("#container").innerHTML;
		console.log(data);
		// Convert the JSON data to a Blob
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });

		// Create a temporary link element
		const link = document.createElement("a");
		link.href = window.URL.createObjectURL(blob);
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
			thisEl.classList.remove("ground");
		} else if (thisEl.classList.contains("boxed")) {
			thisEl.innerHTML = "";
			thisEl.innerHTML = '<div class="boxindicator"></div>';
			thisEl.classList.remove("boxed");
			thisEl.classList.add("ground2");
			thisEl.classList.add("indicator");
		} else if (thisEl.classList.contains("indicator")) {
			thisEl.innerHTML = "";
			thisEl.innerHTML = '<div class="player"></div>';
			thisEl.classList.remove("indicator");
			thisEl.classList.add("player1");
		} else if (thisEl.classList.contains("player1")) {
			thisEl.innerHTML = "";
			thisEl.classList.remove("player");
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
			thisEl.innerHTML = '<div class="box"></div>';
			thisEl.classList.add("boxed");
			thisEl.classList.add("ground2");
			thisEl.classList.remove("indicator");
		} else if (thisEl.classList.contains("boxed")) {
			thisEl.innerHTML = "";
			thisEl.classList.remove("ground");
			thisEl.classList.remove("ground2");
			thisEl.classList.remove("boxed");
			thisEl.classList.add("wall");
		} else if (thisEl.classList.contains("wall")) {
			thisEl.innerHTML = "";
			thisEl.classList.remove("wall");
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
			<div id="generate" onClick={generateMap}>
				Generate Map
			</div>
			<div id="container">
				<Emptydivs />
			</div>
		</>
	);
}

export default App;
