import { useState, useEffect } from "react";
import { SelectPageProps } from "./../components/InterfacePages";
import { playSound } from "./../components/playSound";
import allMaps from "../maps/maps";

interface SelectLevelProps extends SelectPageProps {
	mapCount: number;
	currentLevel?: number;
	onLevelChange: () => void;
}

var playedMaps: { mapId: number; score: number; elapsedTime: number }[] = []; // Declare playedMaps globally

export function SelectLevel({ onPageChange, mapCount }: SelectLevelProps) {
	const [mapFiles, setMapFiles] = useState<string[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const perPage = 20;
	const startIndex = currentPage * perPage;
	const endIndex = Math.min((currentPage + 1) * perPage, mapFiles.length);

	useEffect(() => {
		const highestScoresJSON = localStorage.getItem("highestScores");

		if (highestScoresJSON) {
			const highestScores = JSON.parse(highestScoresJSON);

			if (highestScores && Object.keys(highestScores).length > 0) {
				const mapKeys = Object.keys(highestScores);

				// Clear the existing entries in playedMaps
				playedMaps.splice(0, playedMaps.length);

				mapKeys.forEach((key) => {
					const highscoreEntry = highestScores[key];
					playedMaps.push({
						mapId: parseInt(key),
						score: highscoreEntry.score,
						elapsedTime: highscoreEntry.elapsedTime,
					});
				});
			}
		}
	}, []);

	useEffect(() => {
		const mapFilesData: string[] = [];
		for (let i = 1; i <= allMaps.length; i++) {
			mapFilesData.push(`${i - 1}`);
		}
		setMapFiles(mapFilesData);
	}, [mapCount]);

	const handlePrevClick = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
		playSound("swoosh", 0.15);
	};

	const handleNextClick = () => {
		setCurrentPage((prevPage) =>
			Math.min(prevPage + 1, Math.ceil(mapFiles.length / perPage) - 1)
		);
		playSound("swoosh", 0.15);
	};

	const handleStartClick = () => {
		onPageChange("start");
		playSound("click", 0.25);
	};

	const handlePlayClick = () => {
		onPageChange("play");
		playSound("click", 0.25);
		playSound("levelstart", 0.5);
	};

	const handleCreditsClick = () => {
		onPageChange("credits");
		playSound("click", 0.25);
		playSound("swoosh", 0.15);
	};

	function handleMouseOver() {
		playSound("hover", 0.15);
	}

	function handleMapClick() {
		playSound("click", 0.25);
		playSound("levelstart", 0.5);
	}

	return (
		<>
			<div id="selectlevel">
				<h1>Select Level</h1>

				<div className="levels">
					<ul>
						{mapFiles.slice(startIndex, endIndex).map((map, index) => {
							// Find the corresponding highscore data for the current map
							const highscoreData = playedMaps.find(
								(entry) => entry.mapId - 1 === parseInt(map)
							);

							return (
								<li
									key={startIndex + index}
									data-mapid={map}
									onMouseOver={
										playedMaps.length >= Number(map)
											? handleMouseOver
											: undefined
									}
									onClick={
										playedMaps.length >= Number(map)
											? handleMapClick
											: undefined
									}
									className={
										playedMaps.length >= Number(map) ? "" : "notplayable"
									}
								>
									{startIndex + index + 1}
									<div className="highest">
										{highscoreData && (
											<>
												<span className="highmoves">
													{highscoreData.score}
												</span>
												<span className="hightime">
													{highscoreData.elapsedTime}
												</span>
											</>
										)}
									</div>
								</li>
							);
						})}
					</ul>
					<button
						className="arrow prev"
						onClick={handlePrevClick}
						onMouseOver={handleMouseOver}
						disabled={currentPage === 0}
					></button>

					<button
						className="arrow next"
						onClick={handleNextClick}
						onMouseOver={handleMouseOver}
						disabled={currentPage === Math.ceil(mapFiles.length / perPage) - 1}
					></button>
				</div>
				<div id="menubuttons">
					<span>{`Page ${currentPage + 1} of ${Math.ceil(
						mapFiles.length / perPage
					)}`}</span>
					<div
						id="btn-start"
						className="button"
						onClick={handleStartClick}
						onMouseOver={handleMouseOver}
					></div>
					<div
						id="btn-credits"
						className="button"
						onClick={handleCreditsClick}
						onMouseOver={handleMouseOver}
					></div>
					<div
						id="btn-play"
						className="button"
						onClick={handlePlayClick}
						onMouseOver={handleMouseOver}
					></div>
				</div>
			</div>
		</>
	);
}
