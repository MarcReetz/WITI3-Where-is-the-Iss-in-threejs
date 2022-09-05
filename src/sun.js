import { toRadians } from "./positionsCalc"
import * as THREE from "three";


const sunDistance = 30;

export function initSun(){
  const light = new THREE.PointLight(0xFFF93C, 3, 1000, 1/sunDistance);
  setPositionSun(light);
  
  return light;
}

export function setPositionSun (sun) {
  const degrees = 360;
  const secondsInDay = 60 * 60 * 24;

  const time = new Date();
  let curSecondsAtGren = time.getSeconds();
  curSecondsAtGren += time.getMinutes() * 60;
  curSecondsAtGren += time.getHours() * 60 * 60;

  const sunDegreePosition = (degrees/secondsInDay) * curSecondsAtGren;

  console.log(sunDegreePosition)

  let z = sunDistance * Math.cos(toRadians(sunDegreePosition));
  let y = 0
  let x = sunDistance * Math.sin(toRadians(sunDegreePosition));

  console.log("z: " + z + " x:" + x);

  sun.position.set(x,y,z);
}