import { StartPageUI } from "./pages/StartPageUI";
import { Music } from "./components/Music";
import neonGaming from "./assets/neon-gaming-128925.mp3";
import "./App.css";

function App() {
	return (
		<>
			{/* Music Player */}
			<Music audio={neonGaming} />

			{/* StartPage UI */}
			<StartPageUI />
		</>
	);
}

export default App;
