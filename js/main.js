import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30,window.innerWidth / window.innerHeight,1,1000);
const renderer = new THREE.WebGLRenderer();

// Controle de órbita
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setClearColor(0xffffff, 1);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

//  criar a Luz
const light = new THREE.PointLight(0xffffff, 1000, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Carregar o arquivo .mtl
const mtlLoader = new MTLLoader();
mtlLoader.load("/models/banco cria.mtl", function (materials) {
  // Pré-carregar os materiais
  materials.preload();

  // Carregar o arquivo .obj e aplicar os materiais
  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials); // Define os materiais carregados ao modelo

  objLoader.load(
    "/models/banco cria.obj",
    (object) => {
      scene.add(object);
      object.position.set(0, 0, 0);
      object.scale.set(1, 1, 1);
    },
    undefined,
    (error) => {
      console.error(error);
    }
  );

  // Posicionar a câmera
  camera.position.z = 5;
  camera.position.y = 2;

  function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
    controls.update(); // Atualizar os controles
  }

  animate();
});

// Ajuste de tela
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
