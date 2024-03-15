import { useState } from "react";
import { StartPageUI } from "./pages/StartPageUI";
import { SelectLevel } from "./pages/SelectLevel";
import { Credits } from "./pages/Credits";
import { Play } from "./pages/Play";
import { Music } from "./components/Music";
import { Settings } from "./pages/Settings";
import musicSong from "./assets/neon-gaming-128925.mp3";
import "./App.css";
import { MapRender } from "./components/mapRender";
import map8 from "./maps/map8.json"; //import the map data

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
      <MapRender initialMapData={map8.mapdata} /> //place in the app component
      to render the map
    </>
  );
}

export default App;
