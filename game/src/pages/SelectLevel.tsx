interface SelectPageProps {
	onPageChange: (page: "start" | "selectlevels") => void;
}

export function SelectLevel({ onPageChange }: SelectPageProps) {
	console.log("---SELECT LEVEL---");

	const handleButtonClick = () => {
		onPageChange("start");
	};

	return (
		<>
			<div id="startpageui">
				<div id="btn-start" onClick={handleButtonClick}>
					Back
				</div>
				<div id="retrogrid"></div>
				<div id="copyright">© 2024 Studio5</div>
			</div>
		</>
	);
}
