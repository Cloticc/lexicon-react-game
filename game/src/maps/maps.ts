export interface MapType {
    mapdata: any[]; // Update this with the actual type of mapdata
    html: string;
    solution: any[];
}

const mapFiles = await import.meta.glob('../maps/*.json');

const allMaps: MapType[] = [];

const paths = Object.keys(mapFiles).sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)![0]);
    const numB = parseInt(b.match(/\d+/)![0]);
    return numA - numB;
});

for (const path of paths) {
    // Explicitly specify the type of mapData using type assertion or casting
    const mapData = (await mapFiles[path]()) as MapType; // Type assertion
    // const mapData: MapType = await mapFiles[path]() as MapType; // Casting
    allMaps.push(mapData);
}

export default allMaps;
