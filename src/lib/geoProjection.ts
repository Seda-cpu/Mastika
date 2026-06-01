import type { Peak } from "@/types/domain";

const TURKEY_BOUNDS = {
  minLongitude: 25.6,
  maxLongitude: 44.9,
  minLatitude: 35.8,
  maxLatitude: 42.2
};

const MAP_BOUNDS = {
  minX: -2.42,
  maxX: 2.48,
  northZ: 0.68,
  southZ: -0.68
};

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

export function projectGeoToMap(latitude: number, longitude: number) {
  const longitudeProgress =
    (longitude - TURKEY_BOUNDS.minLongitude) / (TURKEY_BOUNDS.maxLongitude - TURKEY_BOUNDS.minLongitude);
  const latitudeProgress =
    (TURKEY_BOUNDS.maxLatitude - latitude) / (TURKEY_BOUNDS.maxLatitude - TURKEY_BOUNDS.minLatitude);

  return {
    x: lerp(MAP_BOUNDS.minX, MAP_BOUNDS.maxX, longitudeProgress),
    z: lerp(MAP_BOUNDS.northZ, MAP_BOUNDS.southZ, latitudeProgress)
  };
}

export function projectPeakToMap(peak: Peak) {
  const projected = projectGeoToMap(peak.geoPosition.latitude, peak.geoPosition.longitude);

  return {
    x: projected.x + (peak.atlasOffset?.x ?? 0),
    z: projected.z + (peak.atlasOffset?.z ?? 0)
  };
}
