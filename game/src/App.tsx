import "./App.css";
import "./css/MediaQueries.css";

import { useEffect, useState } from "react";

import { Credits } from "./pages/Credits";
import { FullscreenToggle } from "./components/fullscrenToggle";
import { MapRender } from "./components/mapRender";
import { Music } from "./components/Music";
import { Play } from "./pages/Play";
import { SelectLevel } from "./pages/SelectLevel";
import { Settings } from "./pages/Settings";
import { StartPageUI } from "./pages/StartPageUI";
import allMaps from "./maps/maps";
import map1 from "./maps/map1";
import musicSong from "./assets/neon-gaming-128925.mp3";
import { playSound } from "./components/playSound";

type Page = "start" | "selectlevel" | "play" | "credits";


function App() {
    const [currentPage, setCurrentPage] = useState<Page>("start");
    const [settings, toggleSettings] = useState<boolean>(false);
    const [level, setLevel] = useState<number>(1); // lvl state starts at 1

    //maprender
    const initialMapData = map1.mapdata;
    // console.log(initialMapData);

    const [mapData, setMapData] = useState<string[][]>([]);
    const [playerDirection, setPlayerDirection] = useState('down');
    const [playerPosition, setPlayerPosition] = useState({ x: 5, y: 6 });
    const [indicatorPositions, setIndicatorPositions] = useState<{ x: number; y: number }[]>([]);
    const [boxPositions, setBoxPositions] = useState<{ x: number; y: number }[]>([]);

    useEffect(() => {
        setMapData(initialMapData);

        let playerStartPosition = { x: 5, y: 6 };
        for (let y = 0; y < initialMapData.length; y++) {
            const x = initialMapData[y].indexOf("P");
            if (x !== -1) {
                playerStartPosition = { x, y };
                break;
            }
        }
        setPlayerPosition(playerStartPosition);

        const indicatorStartPositions = [];
        for (let y = 0; y < initialMapData.length; y++) {
            for (let x = 0; x < initialMapData[y].length; x++) {
                if (initialMapData[y][x] === "I") {
                    indicatorStartPositions.push({ x, y });
                }
            }
        }
        setIndicatorPositions(indicatorStartPositions);

        const boxStartPositions = [];
        for (let y = 0; y < initialMapData.length; y++) {
            for (let x = 0; x < initialMapData[y].length; x++) {
                if (initialMapData[y][x] === "B") {
                    boxStartPositions.push({ x, y });
                }
            }
        }
        setBoxPositions(boxStartPositions);
    }, [initialMapData]);
    // maprender

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
                {currentPage === "selectlevel" && <SelectLevel onPageChange={handlePageChange} mapCount={mapCount} currentLevel={level} onLevelChange={handleLevelChange} />}



                {/* Credits */}
                {currentPage === "credits" && <Credits onPageChange={handlePageChange} />}

                {/* Play */}
                {currentPage === "play" && <Play
                    mapData={mapData}
                    setMapData={setMapData}
                    playerDirection={playerDirection}
                    setPlayerDirection={setPlayerDirection}
                    playerPosition={playerPosition}
                    setPlayerPosition={setPlayerPosition}
                    indicatorPositions={indicatorPositions}
                    setIndicatorPositions={setIndicatorPositions}
                    boxPositions={boxPositions}
                    setBoxPositions={setBoxPositions}
                    onPageChange={handlePageChange} />}

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