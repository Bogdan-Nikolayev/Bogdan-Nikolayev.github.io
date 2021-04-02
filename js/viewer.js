import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
// import * as THREE from "../node_modules/three/build/three.module.js";
// import { GLTFLoader } from "https://unpkg.com/browse/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";
// import { GLTFLoader } from "https://github.com/mrdoob/three.js/tree/dev/examples/jsm/loaders/GLTFLoader.js";
// import * as THREE from "three";
// import { GLTFLoader } from "../node_modules/three/examples/js/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// createCube();
// loadGltf();

document.body.appendChild(renderer.domElement);

camera.position.z = 5;

animate();

function createCube() {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}

function loadGltf() {
  const loader = new GLTFLoader();

  // Optional: Provide a DRACOLoader instance to decode compressed mesh data
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/examples/js/libs/draco/");
  loader.setDRACOLoader(dracoLoader);

  // Load a glTF resource
  loader.load(
    // resource URL
    "models/Astronaut.glb",
    // called when the resource is loaded
    function (gltf) {
      scene.add(gltf.scene);

      gltf.animations; // Array<THREE.AnimationClip>
      gltf.scene; // THREE.Group
      gltf.scenes; // Array<THREE.Group>
      gltf.cameras; // Array<THREE.Camera>
      gltf.asset; // Object
    },
    // called while loading is progressing
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    // called when loading has errors
    function (error) {
      console.log("An error happened");
    }
  );
}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
