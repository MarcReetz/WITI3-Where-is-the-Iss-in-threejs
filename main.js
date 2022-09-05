import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { getPositionIss, toRadians } from "./src/positionsCalc";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { renderBackground } from "./src/background";
import { initSun, setPositionSun } from "./src/sun";

const url = "https://api.wheretheiss.at/v1/satellites/25544";

const scene = new THREE.Scene();

//CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 5;
camera.rotateX = 90;

//END CAMERA

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color("#0f1514"));
document.body.appendChild(renderer.domElement);


const loader = new GLTFLoader();
let earth;

//Correct the position of the landmasses on earth. 
const earthRotationCorection = 90;

loader.load(
  "./earth/earth.glb",
  function (gltf) {
    earth = gltf.scene;
    earth.scale.set(1, 1, 1);
    earth.position.set(0, 0, 0);
    earth.rotation.y = ((earthRotationCorection * Math.PI)/180);
    scene.add(earth);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

//LIGHT
const sun = initSun();
scene.add(sun)

const color = 0x000365;
const intensity = 5;
const ambientLight = new THREE.AmbientLight(color, intensity);
scene.add(ambientLight);
//LIGHT END

//CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.maxDistance = 10;
controls.minDistance = 1.4;
controls.target.set(0, 0, 0);
controls.update();
//CONTROLS END

const geometry = new THREE.SphereGeometry(0.05, 32, 16);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  transparent: true,
  opacity: 0.5
});
const sphere = new THREE.Mesh(geometry, material);
sphere.frustumCulled = false;
scene.add(sphere);

getPosition();

//ANIMATION LOOP
let opacityPlus = true;

function animate() {
  if (opacityPlus){
    material.opacity += 0.01;
    if(material.opacity >= 1){
      opacityPlus = false;
    }
  }else{
    material.opacity -= 0.01;
    if(material.opacity <= 0.2){
      opacityPlus = true
    }
  }
  setPositionSun(sun);

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

//END ANIMATION LOOP

function updatePosi(lon, lat) {
  const positions = getPositionIss(1.25, lon, lat);
  sphere.position.set(positions[0], positions[1], positions[2]);
}

renderBackground(scene);

animate();

async function getPosition() {
  let response = await fetch(url);
  let jsonResponse = await response.json();

  console.log(jsonResponse);

  if (jsonResponse.longitude && jsonResponse.latitude) {
    updatePosi(
      jsonResponse.longitude,
      jsonResponse.latitude
    );
  } else {
    console.log("Error");
  }

  setTimeout(getPosition, 5000);
}
