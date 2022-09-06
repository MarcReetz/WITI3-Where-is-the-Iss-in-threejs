
//get PositionIss returns an array with 3 values [x,y,z]; 
export function getPositionIss (earthSize,longitude,latitude) {
  let radius = earthSize;

  const rLatitude = toRadians(latitude);
  const rLongitude = toRadians(-longitude + 90);

  let x = radius * Math.cos(rLatitude) * Math.cos(rLongitude);
  let z = radius * Math.cos(rLatitude) * Math.sin(rLongitude);
  let y = radius * Math.sin(rLatitude);

//   var cosLat = Math.cos(lat * Math.PI / 180.0);
//   var sinLat = Math.sin(lat * Math.PI / 180.0);
// var cosLon = Math.cos(lon * Math.PI / 180.0);
// var sinLon = Math.sin(lon * Math.PI / 180.0);
// var rad = 500.0;
// marker_mesh.position.x = rad * cosLat * cosLon;
// marker_mesh.position.y = rad * cosLat * sinLon;
// marker_mesh.position.z = rad * sinLat;

  return [x,y,z]
}

export function toRadians (angle) {
  return angle * (Math.PI / 180);
}