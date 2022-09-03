import * as THREE from "three";

const getRandomParticelPos = (particleCount) => {
  const arr = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    let value = ((Math.random() - 0.5) * 20);
    if(value < 8 && value > -8){
      value = (value + 2) * 7
    }
    arr[i] = value;
  }
  return arr;
};

export const renderBackground = (scene) => {

  // const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  const geometry = new THREE.BufferGeometry();
  const noOfPoints = 1500; //1500;
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(getRandomParticelPos(noOfPoints), 3)
  );

  // create a basic material and set its color
  // const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
  const material = new THREE.PointsMaterial({
    size: 0.05
    // map: loader.load(
    //   "https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png"
    // ),
    // transparent: true
    // color: 0x44aa88
  });

  // create a Mesh
  const cube = new THREE.Points(geometry, material);

  scene.add(cube);
};
