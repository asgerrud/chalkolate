import { ClimbingLocation } from "@/types/database";
import geodist from "geodist";

type GeoPoint = {
  lat: number;
  lon: number;
};

export const getDistanceBetween = (A: GeoPoint, B: GeoPoint) => {
  return geodist(A, B, { exact: true, unit: "m" });
};

export const getNearestLocationFromUser = (locations: ClimbingLocation[]): string => {
  if (!navigator.geolocation) {
    return null;
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    const userCoords = { lat: latitude, lon: longitude };
    return locations.reduce((a: ClimbingLocation, b: ClimbingLocation) => {
      const distA = getDistanceBetween(userCoords, {
        lat: a.latitude,
        lon: a.longitude
      });
      const distB = getDistanceBetween(userCoords, {
        lat: b.latitude,
        lon: b.longitude
      });
      return distA < distB ? a : b;
    })
  });
}
