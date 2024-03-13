import { useState, useEffect } from "react";
import { SelectPageProps } from "./../components/InterfacePages";

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
	};

	const handleNextClick = () => {
		setCurrentPage((prevPage) =>
			Math.min(prevPage + 1, Math.ceil(mapFiles.length / perPage) - 1)
		);
	};

	const handleStartClick = () => {
		onPageChange("start");
	};

	const handlePlayClick = () => {
		onPageChange("play");
	};

	const handleCreditsClick = () => {
		onPageChange("credits");
	};

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
							disabled={currentPage === 0}
						></button>

						<button
							className="arrow next"
							onClick={handleNextClick}
							disabled={currentPage === Math.ceil(mapFiles.length / perPage) - 1}
						></button>
					</div>
					<div id="menubuttons">
						<span>{`Page ${currentPage + 1} of ${Math.ceil(
							mapFiles.length / perPage
						)}`}</span>
						<div id="btn-start" className="button" onClick={handleStartClick}></div>
						<div id="btn-credits" className="button" onClick={handleCreditsClick}></div>
						<div id="btn-play" className="button" onClick={handlePlayClick}></div>
					</div>
				</div>
				<div id="retrogrid"></div>
				<div id="copyright">© 2024 Studio5</div>
			</div>
		</>
	);
}
