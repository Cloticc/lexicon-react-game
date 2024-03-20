// const mapFiles = import.meta.glob("../maps/*.json");

// const allMaps = [];

// for (const path in mapFiles) {
// 	const mapData = await mapFiles[path]();
// 	allMaps.push(mapData);
// }

// export default allMaps;



const mapFiles = import.meta.glob("../maps/*.json");

const allMaps = [];

// Get the paths to the map files and sort them
/* The line `const paths = Object.keys(mapFiles).sort();` is getting an array of keys from the
`mapFiles` object using `Object.keys()`, which returns an array of the object's own enumerable
property names. The `sort()` method is then used to sort these keys alphabetically. This will give
you an array of paths to the map files sorted in alphabetical order. */
const paths = Object.keys(mapFiles).sort();
console.log(paths);

for (const path of paths) {
	const mapData = await mapFiles[path]();
	allMaps.push(mapData);
}

export default allMaps;