const mapFiles = await import.meta.glob("../maps/*.json");

const allMaps = [];

const paths = Object.keys(mapFiles).sort((a, b) => {
	const numA = parseInt(a.match(/\d+/)![0]);
	const numB = parseInt(b.match(/\d+/)![0]);
	return numA - numB;
});

for (const path of paths) {
	const mapData = await mapFiles[path]();
	allMaps.push(mapData);
}

export default allMaps;
