import { useState } from "react";
import { StartPageUI } from "./pages/StartPageUI";
import { SelectLevel } from "./pages/SelectLevel";
import { Credits } from "./pages/Credits";
import { Settings } from "./pages/Settings";
import { Play } from "./pages/Play";
import { Music } from "./components/Music";
import { playSound } from "./components/playSound";
import { FullscreenToggle } from "./components/fullscrenToggle";
import musicSong from "./assets/neon-gaming-128925.mp3";
import "./App.css";
import "./css/MediaQueries.css";
import allMaps from "./maps/maps";

type Page = "start" | "selectlevel" | "play" | "credits";

function App() {
	const [currentPage, setCurrentPage] = useState<Page>("start");
	const [settings, toggleSettings] = useState<boolean>(false);
	const [level, setLevel] = useState<number>(1); // lvl state starts at 1

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
			<button
				id="btn-settings"
				className="button"
				onClick={handleToggleSettings}
				onMouseOver={handleMouseOver}
			></button>

			<FullscreenToggle />
			{settings && <Settings />}

			{/* Music Player */}
			{<Music audio={musicSong} />}

			<div id="startpageui">
				{/* StartPage UI */}
				{currentPage === "start" && <StartPageUI onPageChange={handlePageChange} />}

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
	);
}

export default App;
