const mapFiles = import.meta.glob("../maps/*.json");

const allMaps: { [key: string]: any } = {};

for (const path in mapFiles) {
  const mapName = path.replace(/^.*[\\\/]/, "").replace(".json", "");
  allMaps[mapName]  = await mapFiles[path]();
}

export default allMaps;