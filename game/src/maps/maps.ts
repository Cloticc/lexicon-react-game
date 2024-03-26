interface MapObject {
	mapdata: string[][];
	html: string;
  }
  


const mapFiles = await import.meta.glob("../maps/*.json");

const allMaps: MapObject[] = [];

const paths = Object.keys(mapFiles).sort((a, b) => {
	const numA = parseInt(a.match(/\d+/)![0]);
	const numB = parseInt(b.match(/\d+/)![0]);
	return numA - numB;
});

for (const path of paths) {
	const mapData = await mapFiles[path]() as MapObject;
	allMaps.push(mapData);
}

export default allMaps;