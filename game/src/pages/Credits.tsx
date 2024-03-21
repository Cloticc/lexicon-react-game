import { SelectPageProps } from "./../components/InterfacePages";
import { playSound } from "./../components/playSound";

export function Credits({ onPageChange }: SelectPageProps) {
	const handleBackClick = () => {
		onPageChange("selectlevel");
		playSound("click", 0.25);
		playSound("swoosh", 0.15);
	};

	function handleMouseOver() {
		playSound("hover", 0.15);
	}

	return (
		<>
			<div id="selectlevel">
				<h1>Credits</h1>
				<div id="credits">
					<h2>Graphics</h2>
					<h4>
						<a href="https://opengameart.org/content/sokoban-100-tiles" target="_blank">
							Kenny
						</a>
					</h4>
					<h2>Sound</h2>
					<h4>
						<a href="https://pixabay.com/">Pixabay</a>
					</h4>
					<h2>HTML, CSS, JavaScript</h2>
					<h5>Fredrik Berglund</h5>
					<h5>Andreas</h5>
					<h5>Konstantios</h5>
					<h5>Abbas Mansoori</h5>
					<h5>Alireza Kafshdartoosi</h5>
				</div>

				<div id="menubuttons">
					<div
						id="btn-levels"
						className="button"
						onClick={handleBackClick}
						onMouseOver={handleMouseOver}
					></div>
				</div>
			</div>
		</>
	);
}
