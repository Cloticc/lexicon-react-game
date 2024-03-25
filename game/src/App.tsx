import "./App.css";
import "./css/MediaQueries.css";

import { useContext, useEffect, useState } from "react";

import { Credits } from "./pages/Credits";
import { FullscreenToggle } from "./components/fullscrenToggle";
import { Music } from "./components/Music";
import { MyComponent } from "./pages/MyComponent";
import { MyContext } from "./ContextProvider/ContextProvider";
import { Play } from "./pages/Play";
import { SelectLevel } from "./pages/SelectLevel";
import { Settings } from "./pages/Settings";
import { StartPageUI } from "./pages/StartPageUI";
import allMaps from "./maps/maps";
import { playSound } from "./components/playSound";

type Page = "start" | "selectlevel" | "play" | "credits" | "MapGenerator";

function App() {
	const [currentPage, setCurrentPage] = useState<Page>("start");

	const [level, setLevel] = useState(0);
	const { settings, toggleSettings } = useContext(MyContext);
	const { music, setMusic } = useContext(MyContext);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		// Simulate loading by setting a timeout
		const timeout = setTimeout(() => {
			setIsReady(true);
		}, 1000); // Adjust the duration as needed

		// Cleanup by clearing the timeout when the component unmounts
		return () => {
			clearTimeout(timeout);
		};
	}, []);

	useEffect(() => {
		setMusic("ui");
	}, []);

	function handleToggleSettings() {
		toggleSettings(!settings);
		playSound("click", 0.25);
		playSound("swoosh", 0.25);
	}

	function handleMouseOver() {
		playSound("hover", 0.15);
	}

	const handlePageChange = (page: Page) => {
		setCurrentPage(page);
	};

	// Function to handle level change
	const handleLevelChange = () => {
		const mapKeys = Object.keys(allMaps);
		const nextIndex = (level % mapKeys.length) + 1;
		setLevel(nextIndex);
	};

	// Calculate map count
	const mapCount = Object.keys(allMaps).length;

	return (
		<>
			{/* Show loader while document is not ready */}
			{!isReady && <div className="loader"></div>}

			{/* <MyComponent /> */}
			{isReady && (
				<>
					<button
						id="btn-settings"
						className="button"
						onClick={handleToggleSettings}
						onMouseOver={handleMouseOver}
					></button>
					<FullscreenToggle />
					{settings && <Settings />}
					{/* Music Player */}
					{<Music audio={music} />}
					<div id="startpageui">
						{/* StartPage UI */}
						{currentPage === "start" && <StartPageUI onPageChange={handlePageChange} />}
						{/* MapGenerator */}
						{currentPage === "MapGenerator" && <MapGenerator onPageChange={handlePageChange} />}					{/* MyComponent */}
						{/* Select Level*/}
						{currentPage === "selectlevel" && (
							<SelectLevel
								onPageChange={handlePageChange}
								mapCount={mapCount}
								currentLevel={level}
								onLevelChange={handleLevelChange}
							/>
						)}

						{/* Credits */}
						{currentPage === "credits" && <Credits onPageChange={handlePageChange} />}

						{/* Play */}
						{currentPage === "play" && <Play onPageChange={handlePageChange} />}

						<div id="space">
							<div className="stars"></div>
							<div className="stars"></div>
							<div className="stars"></div>
							<div className="stars"></div>
							<div className="stars"></div>
						</div>
						<div id="retrogrid"></div>
						<div id="copyright">© 2024 Studio5</div>
					</div>
				</>
			)}
		</>
	);
}

export default App;
