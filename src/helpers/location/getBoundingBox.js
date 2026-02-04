function getBoundingBox(lat, lng, km) {
  const R = 6371;
  const deltaLat = km / R;
  const deltaLng = km / (R * Math.cos((lat * Math.PI) / 180));

  return {
    minLat: lat - deltaLat * (180 / Math.PI),
    maxLat: lat + deltaLat * (180 / Math.PI),
    minLng: lng - deltaLng * (180 / Math.PI),
    maxLng: lng + deltaLng * (180 / Math.PI),
  };
}

function getBoundingBoxInMeters(lat, lng, meters) {
  const R = 6371000;
  const deltaLat = meters / R;
  const deltaLng = meters / (R * Math.cos((lat * Math.PI) / 180));

  return {
    minLat: lat - deltaLat * (180 / Math.PI),
    maxLat: lat + deltaLat * (180 / Math.PI),
    minLng: lng - deltaLng * (180 / Math.PI),
    maxLng: lng + deltaLng * (180 / Math.PI),
  };
}
export { getBoundingBox, getBoundingBoxInMeters };
