import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";

setup();

function setup() {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get("path");
  if (param) setupModelViewer(param);
  else setupTree();
}

function setupModelViewer(url) {
  document.body.innerHTML +=
    '<model-viewer\
      src="assets/models/' +
    url +
    '"\
      autoplay\
      alt="See this beautiful business card"\
      ar\
      ar-modes="scene-viewer quick-look"\
      ios-src="assets/models/Astronaut.usdz"\
      camera-controls\
    ></model-viewer>';
}

function setupTree() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  const controls = new OrbitControls(camera, renderer.domElement);
  const light = new THREE.AmbientLight(0xffffff);

  camera.position.z = 5;
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Need to light up the models because its black without it.
  scene.add(light);

  loadGltf();

  document.body.appendChild(renderer.domElement);

  animate();

  function createCube() {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  }

  function loadGltf() {
    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data.
    // const dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath("/examples/js/libs/draco/");
    // loader.setDRACOLoader(dracoLoader);

    loader.load(
      "assets/models/robot_playground/scene.gltf",
      function (gltf) {
        scene.add(gltf.scene);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
      },

      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },

      function (error) {
        console.log("Error: " + error);
      }
    );
  }

  function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
  }
}
