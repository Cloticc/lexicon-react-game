import { useState } from "react";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	function Emptydivs() {
		const rows = [];
		for (let i = 0; i < 10; i++) {
			const columns = [];

			for (let j = 0; j < 10; j++) {
				columns.push(<div key={j} className="grid-item"></div>);
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
			<div id="container">
				<Emptydivs />
			</div>
		</>
	);
}

export default App;
