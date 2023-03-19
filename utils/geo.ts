const geodist = require("geodist");

type GeoPoint = {
  lat: Number;
  lon: Number;
};

export const getDistanceBetween = (A: GeoPoint, B: GeoPoint) => {
  return geodist(A, B, { exact: true, unit: "m" });
};
