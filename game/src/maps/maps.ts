const mapFiles = import.meta.glob("../maps/*.json");

const allMaps = [];

for (const path in mapFiles) {
	const mapData = await mapFiles[path]();
	allMaps.push(mapData);
}

export default allMaps;
