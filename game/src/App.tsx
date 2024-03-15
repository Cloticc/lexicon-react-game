import { useState } from "react";
import { StartPageUI } from "./pages/StartPageUI";
import { SelectLevel } from "./pages/SelectLevel";
import { Credits } from "./pages/Credits";
import { Play } from "./pages/Play";
import { Music } from "./components/Music";
import { Settings } from "./pages/Settings";
import musicSong from "./assets/neon-gaming-128925.mp3";
import "./App.css";
import { LevelDisplay } from "./components/LevelDisplay";

type Page = "start" | "selectlevel" | "play" | "credits";

function App() {
	const [currentPage, setCurrentPage] = useState("start");
	const [settings, toggleSettings] = useState(false);

	function handleToggleSettings() {
		if (settings) {
			toggleSettings(false);
		} else {
			toggleSettings(true);
		}
	}

	const handlePageChange = (page: Page) => {
		setCurrentPage(page);
	};

	return (
		<>
			<button id="btn-settings" className="button" onClick={handleToggleSettings}></button>
			{settings && <Settings />}

			<button id="btn-fullscreen" className="button"></button>
			<LevelDisplay/>
			{/* Music Player */}
			{/* <Music audio={musicSong} /> */}

			{/* StartPage UI */}
			{/* {currentPage === "start" && <StartPageUI onPageChange={handlePageChange} />} */}

			{/* Select Level */}
			{/* {currentPage === "selectlevel" && <SelectLevel onPageChange={handlePageChange} />} */}

			{/* Credits */}
			{/* {currentPage === "credits" && <Credits onPageChange={handlePageChange} />} */}

			{/* Play */}
			{/* {currentPage === "play" && <Play onPageChange={handlePageChange} />} */}
		</>
	);
}

export default App;
