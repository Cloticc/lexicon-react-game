export function Highscore() {
	return (
		<>
			<div id="highscore">
				<h1>Highscore</h1>
				<h2>Level 1 Complete</h2>
				<input type="text" placeholder="Enter Alias" />
				<div className="showhighscore">
					<div className="result">
						<div className="row">
							<div>Alias</div>
							<div>Steps</div>
							<div>Time</div>
						</div>
					</div>
				</div>
				<div className="showhighscore">
					<div className="result">
						<div className="row">
							<div>Player1</div>
							<div>3</div>
							<div>3:22</div>
						</div>
					</div>
				</div>
				<div className="content-container">
					<button id="btn-replay-again" className="button"></button>
					<button id="btn-nextlevel" className="button"></button>
				</div>
			</div>
		</>
	);
}
