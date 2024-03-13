import { StartPageUI } from "./pages/StartPageUI";
import { Music } from "./components/Music";
import neonGaming from "./assets/neon-gaming-128925.mp3";
import "./App.css";
import { MoveChar } from "./components/MoveChar";

function App() {
<<<<<<< HEAD
=======
  return (
	<>
  
	<MoveChar />
	</>
	
  )
>>>>>>> 0664ee1e3534c09269ee66a81e015485e951fb1b
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
