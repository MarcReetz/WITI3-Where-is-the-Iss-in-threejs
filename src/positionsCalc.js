
//get PositionIss returns an array with 3 values [x,y,z]; 
export function getPositionIss (earthSize,longitude,latitude) {
  let radius = earthSize;

  const rLatitude = toRadians(latitude);
  const rLongitude = toRadians(longitude);

  let z = radius * Math.cos(rLongitude) * Math.cos(rLatitude);
  let y = radius * Math.cos(rLongitude) * Math.sin(rLatitude);
  let x = radius * Math.sin(rLongitude);

  return [x,y,z]
}

export function toRadians (angle) {
  return angle * (Math.PI / 180);
}