import { useState, useEffect } from "react";
import { SelectPageProps } from "./../components/InterfacePages";
import { playSound } from "./../components/playSound";

export function SelectLevel({ onPageChange }: SelectPageProps) {
	const [mapFiles, setMapFiles] = useState<string[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);

	// Set amount of maps & maps per page
	const mapCount = 60;
	const perPage = 20;
	const startIndex = currentPage * perPage;
	const endIndex = Math.min((currentPage + 1) * perPage, mapFiles.length);

	useEffect(() => {
		// Set mapFiles with some map data
		const mapFilesData: string[] = [];
		for (let i = 1; i <= mapCount; i++) {
			mapFilesData.push(`map${i}.json`);
		}
		setMapFiles(mapFilesData);
	}, []);

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

	return (
		<>
			<div id="startpageui">
				<div id="selectlevel">
					<h1>Select Level</h1>

					<div className="levels">
						<ul>
							{mapFiles.slice(startIndex, endIndex).map((map, index) => (
								<li
									key={startIndex + index}
									data-name={map}
									onMouseOver={map === "map1.json" ? handleMouseOver : undefined}
									className={map !== "map1.json" ? "notplayable" : ""}
								>
									{startIndex + index + 1}
									<span>2 moves</span>
								</li>
							))}
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
				<div id="retrogrid"></div>
				<div id="copyright">© 2024 Studio5</div>
			</div>
		</>
	);
}
