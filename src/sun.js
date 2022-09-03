import { toRadians } from "./positionsCalc"
import * as THREE from "three";

export function setSun(){
  const degrees = 360;
  const secondsInDay = 60 * 60 * 24;

  const time = new Date();
  let curSecondsAtGren = time.getSeconds();
  curSecondsAtGren += time.getMinutes() * 60;
  curSecondsAtGren += time.getHours() * 60;

  const sunHorizonPosition = (degrees/secondsInDay) * curSecondsAtGren;

  const distanceToEarth = 30;

  const light = new THREE.PointLight(0xFFF93C, 3, 1000, 1/distanceToEarth);
  const position = getPositionSun(distanceToEarth,sunHorizonPosition);
  light.position.set(position[0], position[1], position[2]);
  
  return light;
}

export function getPositionSun (sunDistance,sunDegreePosition) {

  let z = sunDistance * Math.cos(toRadians(sunDegreePosition));
  let y = 0
  let x = sunDistance * Math.sin(toRadians(sunDegreePosition));

  console.log(x,y,z)

  return [x,y,z]
}