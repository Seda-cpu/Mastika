import { readFile, writeFile } from "node:fs/promises";

const sourcePath = process.argv[2] ?? "/private/tmp/ne_10m_admin_0_countries.geojson";
const outputPath = new URL("../src/data/turkeyOutline.ts", import.meta.url);

const bounds = {
  minLongitude: 25.6,
  maxLongitude: 44.9,
  minLatitude: 35.8,
  maxLatitude: 42.2
};

const mapBounds = {
  minX: -2.42,
  maxX: 2.48,
  northY: 0.68,
  southY: -0.68
};

function project([longitude, latitude]) {
  const longitudeProgress = (longitude - bounds.minLongitude) / (bounds.maxLongitude - bounds.minLongitude);
  const latitudeProgress = (bounds.maxLatitude - latitude) / (bounds.maxLatitude - bounds.minLatitude);

  return [
    Number((mapBounds.minX + (mapBounds.maxX - mapBounds.minX) * longitudeProgress).toFixed(4)),
    Number((mapBounds.northY + (mapBounds.southY - mapBounds.northY) * latitudeProgress).toFixed(4))
  ];
}

function ringArea(ring) {
  let area = 0;
  for (let index = 0; index < ring.length - 1; index += 1) {
    const [x1, y1] = ring[index];
    const [x2, y2] = ring[index + 1];
    area += x1 * y2 - x2 * y1;
  }
  return Math.abs(area / 2);
}

function simplifyRing(ring, step) {
  const simplified = ring.filter((_, index) => index % step === 0);
  const first = simplified[0];
  const last = simplified[simplified.length - 1];
  if (first && last && (first[0] !== last[0] || first[1] !== last[1])) {
    simplified.push(first);
  }
  return simplified;
}

const geojson = JSON.parse(await readFile(sourcePath, "utf8"));
const turkey = geojson.features.find((feature) => {
  const props = feature.properties ?? {};
  return props.ADM0_A3 === "TUR" || props.ISO_A3 === "TUR" || props.ADMIN === "Turkey" || props.NAME === "Turkey";
});

if (!turkey) {
  throw new Error("Turkey feature could not be found in source GeoJSON.");
}

const polygons =
  turkey.geometry.type === "Polygon"
    ? [turkey.geometry.coordinates]
    : turkey.geometry.type === "MultiPolygon"
      ? turkey.geometry.coordinates
      : [];

const rings = polygons
  .map((polygon) => polygon[0])
  .filter((ring) => Array.isArray(ring) && ring.length > 8)
  .map((ring) => ring.map(project))
  .filter((ring) => ringArea(ring) > 0.0008)
  .sort((a, b) => ringArea(b) - ringArea(a))
  .map((ring, index) => simplifyRing(ring, index === 0 ? 16 : 8));

const output = `export type OutlinePoint = readonly [number, number];

// Generated from Natural Earth Admin 0 Countries GeoJSON.
// Regenerate with: npm run build:map-data -- /path/to/ne_10m_admin_0_countries.geojson
export const turkeyOutlineRings: OutlinePoint[][] = ${JSON.stringify(rings)};

export const turkeyFacetSeeds = [
  [-2.1, -0.18, 0.2],
  [-1.58, -0.2, 0.17],
  [-1.02, 0.02, 0.22],
  [-0.48, -0.16, 0.18],
  [0.02, 0.08, 0.2],
  [0.52, -0.12, 0.19],
  [1.08, 0.05, 0.23],
  [1.62, -0.14, 0.18],
  [2.05, 0.02, 0.2],
  [0.0, -0.34, 0.16],
  [0.88, -0.34, 0.16],
  [-1.5, 0.18, 0.14]
] as const;
`;

await writeFile(outputPath, output);
console.log(`Wrote ${rings.length} Turkey outline ring(s) to ${outputPath.pathname}`);
