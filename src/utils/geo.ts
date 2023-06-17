const geodist = require("geodist");

type GeoPoint = {
  lat: number;
  lon: number;
};

export const getDistanceBetween = (A: GeoPoint, B: GeoPoint) => {
  return geodist(A, B, { exact: true, unit: "m" });
};
