import * as THREE from "three";
import GUI from "lil-gui";
import { Timer } from "three/addons/misc/Timer.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { Sky } from "three/addons/objects/Sky.js";
const canvas = document.querySelector(".webgl");

const gui = new GUI({
  width: 300,
  closeFolders: true,
  title: "Tweaks",
});

gui.close();

const scene = new THREE.Scene();
const house = new THREE.Group();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const debugObject = {
  color: "lightBlue",
};
// texture loader
const textureLoader = new THREE.TextureLoader();

// textures
const floorAlphaMap = textureLoader.load("./floor/alpha.jpg");
const floorColorTexture = textureLoader.load("./grass/color.jpg");
// const floorArmTexture = textureLoader.load("./floor/arm.jpg");
const floorNormalTexture = textureLoader.load("./grass/normal.jpg");
const floorDisplacementTexture = textureLoader.load("./grass/disp.jpg");

// door texture
// Door
const doorColorTexture = textureLoader.load("./door/d_color.png");
const doorAOTexture = textureLoader.load("./door/d_ao.png");
const doorHeightTexture = textureLoader.load("./door/d_height.jpg");
const doorNormalTexture = textureLoader.load("./door/d_normal.png");
const doorRoughnessTexture = textureLoader.load("./door/d_rough.png");

// wall textures

const wallColorTexture = textureLoader.load("./wall/color.jpg");
const wallArmTexture = textureLoader.load("./wall/arm.jpg");
const wallNormalTexture = textureLoader.load("./wall/normal.jpg");
const wallDispTexture = textureLoader.load("./wall/disp.jpg");

// lawn

const lawnColorTexture = textureLoader.load("./lawn/color.png");
const lawnArmTexture = textureLoader.load("./lawn/arm.png");
const lawnNormalTexture = textureLoader.load("./lawn/normal.png");

const lawnAOTexture = textureLoader.load("./lawn/ao.png");
const lawnRoughness = textureLoader.load("./lawn/roughness.png");
// Roof
const roofColorTexture = textureLoader.load("./roof/color.jpg");
const roofARMTexture = textureLoader.load("./roof/arm.jpg");
const roofNormalTexture = textureLoader.load("./roof/normal.jpg");

// lawn
lawnColorTexture.colorSpace = THREE.SRGBColorSpace;

// roof
roofColorTexture.colorSpace = THREE.SRGBColorSpace;

// srgb
floorColorTexture.colorSpace = THREE.SRGBColorSpace;
// wall srgb
wallColorTexture.colorSpace = THREE.SRGBColorSpace;

// repeat
floorColorTexture.repeat.set(8, 8);
// floorArmTexture.repeat.set(8, 8);
floorNormalTexture.repeat.set(8, 8);
floorDisplacementTexture.repeat.set(8, 8);

// repeat
lawnColorTexture.repeat.set(8, 8);
lawnArmTexture.repeat.set(8, 8);
lawnNormalTexture.repeat.set(8, 8);

// wrapping-S
lawnColorTexture.wrapS = THREE.RepeatWrapping;
lawnArmTexture.wrapS = THREE.RepeatWrapping;
lawnNormalTexture.wrapS = THREE.RepeatWrapping;

// wrapping-T
lawnColorTexture.wrapT = THREE.RepeatWrapping;
lawnArmTexture.wrapT = THREE.RepeatWrapping;
lawnNormalTexture.wrapT = THREE.RepeatWrapping;

// wrapping-S
floorColorTexture.wrapS = THREE.RepeatWrapping;
// floorArmTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;

// wrapping-T
floorColorTexture.wrapT = THREE.RepeatWrapping;
// floorArmTexture.wrapT = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

// floor
const floorMaterial = new THREE.MeshStandardMaterial();
const floorGeo = new THREE.PlaneGeometry(30, 30, 100, 100);
const floorMat = floorMaterial;
floorMat.side = THREE.DoubleSide;
// ..............
floorMat.alphaMap = floorAlphaMap;
floorMat.transparent = true;
floorMat.map = floorColorTexture;
// ..........................
// floorMat.aoMap = floorArmTexture;
// floorMat.roughnessMap = floorArmTexture;
// floorMat.metalnessMap = floorArmTexture;
floorMat.normalMap = floorNormalTexture;
// ...
floorMat.displacementMap = floorDisplacementTexture;
floorMat.displacementScale = 0.5;
floorMat.displacementBias = -0.1;

const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI * 0.5;
floor.receiveShadow = true;
scene.add(floor);

// wall
const wallMaterial = new THREE.MeshStandardMaterial({});
const wallGeo = new THREE.BoxGeometry(5, 5, 5);
const wallMat = wallMaterial;
wallMat.map = wallColorTexture;
wallMat.aoMap = wallArmTexture;
wallMat.roughnessMap = wallArmTexture;
wallMat.metalnessMap = wallArmTexture;
wallMat.normalMap = wallNormalTexture;

const wall = new THREE.Mesh(wallGeo, wallMat);
wall.castShadow = true;
wall.receiveShadow = true;
wall.position.y = 2.5;

// door

const doorGeo = new THREE.PlaneGeometry(2, 3);
const doorMaterial = new THREE.MeshStandardMaterial({
  map: doorColorTexture,
  aoMap: doorAOTexture,
  aoMapIntensity: 2,
  displacementMap: doorHeightTexture,
  normalMap: doorNormalTexture,
  roughnessMap: doorRoughnessTexture,
});
const doorMat = doorMaterial;
// doorMat.color = new THREE.Color("red");
doorMat.side = THREE.DoubleSide;
const door = new THREE.Mesh(doorGeo, doorMat);
door.position.y = 1.54;
door.position.z = 2.52;

// roof
const coneMaterial = new THREE.MeshStandardMaterial();
const coneGeo = new THREE.ConeGeometry(5, 3, 4);
const coneMat = coneMaterial;
coneMat.map = roofColorTexture;
coneMat.aoMap = roofARMTexture;
coneMat.roughnessMap = roofARMTexture;
coneMat.metalnessMap = roofARMTexture;
coneMat.normalMap = roofNormalTexture;
const roof = new THREE.Mesh(coneGeo, coneMat);
roof.position.y = 6.4;
roof.rotation.y = 0.8;

// const roofTweaks = gui.addFolder("cRTweaks");
// roofTweaks.add(roof.rotation, "y").min(-3).max(3).step(0.01).name("spin");

// const sphereMaterial = new THREE.MeshStandardMaterial();
// const sphereGeo = new THREE.SphereGeometry(1, 16, 16);
// const sphereMat = sphereMaterial;
// const sphere = new THREE.Mesh(sphereGeo, sphereMat);

// Function to create a realistic bush-like geometry
function createBushGeometry(radius, detail) {
  const geometry = new THREE.BufferGeometry();

  // Generate vertices for a bush-like shape
  const vertices = [];
  const normals = [];
  const colors = [];
  const color = new THREE.Color();

  for (let i = 0; i < detail; i++) {
    // Create a spherical distribution of points with slight randomness
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius + Math.random() * 0.2 - 0.1; // Add some variation to the radius

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    vertices.push(x, y, z);

    // Add normals for lighting calculations
    const normal = new THREE.Vector3(x, y, z).normalize();
    normals.push(normal.x, normal.y, normal.z);

    // Add vertex colors for subtle green variation
    color.setHSL(0.33, 0.5 + Math.random() * 0.1, 0.3 + Math.random() * 0.2);
    colors.push(color.r, color.g, color.b);
  }

  // Convert arrays to Float32BufferAttributes
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  return geometry;
}

// Bush
const bushGeometry = createBushGeometry(1, 1000); // radius 1, 1000 vertices
const bushMaterial = new THREE.MeshStandardMaterial({
  vertexColors: true,
  roughness: 0.8,
  metalness: 0.3,
});
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(1.27, 0.4, 3);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(2, 0.2, 2.8);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-1.4, 0.3, 3);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.25, 0.25, 0.25);
bush4.position.set(-1.9, 0.2, 2.8);

house.add(wall, roof, door, bush1, bush2, bush3, bush4);
scene.add(house);

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.x = 7;
camera.position.y = 7;
camera.position.z = 16;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;

// ambientLight
const ambientLight = new THREE.AmbientLight("white", 1);
scene.add(ambientLight);

// directionalLight
const directionalLight = new THREE.DirectionalLight("white", 2);
directionalLight.position.x = -10;
directionalLight.position.y = 8.03;
directionalLight.position.z = 4.2;
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.near = -7;
directionalLight.shadow.camera.top = 8.5;
directionalLight.shadow.camera.left = -15;
directionalLight.shadow.camera.right = 15;

directionalLight.position.set(-4.7, 7.13, 2.95);

scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  1
);
scene.add(directionalLightHelper);
directionalLightHelper.visible = false;

const dlcHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(dlcHelper);
dlcHelper.visible = false;

const dlTweaks = gui.addFolder("dlTweaks");
dlTweaks
  .add(directionalLight.position, "x")
  .step(0.01)
  .min(-10)
  .max(10)
  .name("swiper");

dlTweaks
  .add(directionalLight.position, "y")
  .step(0.01)
  .min(-10)
  .max(10)
  .name("elevate");

dlTweaks
  .add(directionalLight.position, "z")
  .step(0.01)
  .min(-10)
  .max(18)
  .name("zoomer");

// pointLight
// Door light
const doorLight = new THREE.PointLight("orange", 30);

doorLight.castShadow = true;
doorLight.position.set(0, 4.5, 3.3);
doorLight.shadow.mapSize.width = 1024;
doorLight.shadow.mapSize.height = 1024;
doorLight.shadow.camera.far = 8;
doorLight.shadow.camera.near = 1;

house.add(doorLight);

const pointLightHelper = new THREE.PointLightHelper(doorLight, 1);
scene.add(pointLightHelper);
pointLightHelper.visible = false;

const plcHelper = new THREE.CameraHelper(doorLight.shadow.camera);
scene.add(plcHelper);
plcHelper.visible = false;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

window.addEventListener("resize", () => {
  (sizes.width = window.innerWidth), (sizes.height = window.innerHeight);

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

function createGraveGeometry(width, height, depth, curveSegments) {
  const shape = new THREE.Shape();

  // Draw a rectangle with a rounded top
  shape.moveTo(-width / 2, 0); // Bottom-left corner
  shape.lineTo(-width / 2, height - depth); // Left vertical side
  shape.absarc(0, height - depth, width / 2, Math.PI, 0, false); // Rounded top
  shape.lineTo(width / 2, 0); // Right vertical side
  shape.lineTo(-width / 2, 0); // Close the shape

  // Extrude the shape into 3D
  const extrudeSettings = {
    depth: depth, // Extrude depth
    bevelEnabled: true,
    bevelThickness: 0.1, // Thickness of the bevel
    bevelSize: 0.1, // Size of the bevel
    bevelSegments: 2, // Number of bevel segments
    curveSegments: curveSegments, // Smoothness of the curve
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  return geometry;
}

// Create the grave geometry
const graveGeometry = createGraveGeometry(1, 2, 0.5, 12); // Width, height, depth, curve smoothness
const graveMaterial = new THREE.MeshStandardMaterial({
  color: "gray",
  roughness: 0.8,
  metalness: 0.2,
});

const grave = new THREE.Mesh(graveGeometry, graveMaterial);
grave.castShadow = true;
grave.receiveShadow = true;
const grave2 = new THREE.Mesh(graveGeometry, graveMaterial);
grave2.castShadow = true;
grave2.receiveShadow = true;
const grave3 = new THREE.Mesh(graveGeometry, graveMaterial);
grave3.castShadow = true;
grave3.receiveShadow = true;

// Position the grave on the plane
grave.position.set(0, 0.15, -7);
grave.rotation.x = -Math.PI * 0.5;
grave.position.y = 0.01;

grave2.position.set(2.3, 0.15, -7);
grave2.rotation.x = -Math.PI * 0.5;
grave2.position.y = 0.01;

grave3.position.set(-2.3, 0.15, -7);
grave3.rotation.x = -Math.PI * 0.5;
grave3.position.y = 0.01;

// Add to the scene

scene.add(grave, grave2, grave3);

// Function to create a cross
function createCross() {
  // Materials for the cross
  const crossMaterial = new THREE.MeshStandardMaterial({
    color: "grey", // Wood-like color
    roughness: 0.7,
    metalness: 0.0, // No metallic sheen
  });

  // Vertical beam of the cross
  const verticalBeamGeometry = new THREE.BoxGeometry(0.2, 2, 0.2); // Narrow and tall
  const verticalBeam = new THREE.Mesh(verticalBeamGeometry, crossMaterial);

  // Horizontal beam of the cross
  const horizontalBeamGeometry = new THREE.BoxGeometry(1, 0.2, 0.2); // Wide and short
  const horizontalBeam = new THREE.Mesh(horizontalBeamGeometry, crossMaterial);

  // Position the horizontal beam
  horizontalBeam.position.y = 0.75; // Adjust height to match the vertical beam

  // Create a group for the cross
  const cross = new THREE.Group();
  cross.add(verticalBeam, horizontalBeam);

  return cross;
}

// Create the cross and position it in front of the grave
const cross = createCross();
const cross2 = createCross();
const cross3 = createCross();
cross.castShadow = true;
cross2.castShadow = true;
cross3.castShadow = true;
cross.position.set(0, 1, -6.7);
cross2.position.set(2.3, 1, -6.7);
cross3.position.set(-2.3, 1, -6.7);

// Add the cross to the scene

scene.add(cross, cross2, cross3);

// font
// Load the font
const fontLoader = new FontLoader();

// Load the first text ("Spooky")
fontLoader.load("/fonts/robo.json", (font) => {
  const textGeometry = new TextGeometry("Spooky", {
    font: font,
    size: 0.75,
    depth: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  textGeometry.center();
  const textMaterial = new THREE.MeshStandardMaterial();
  textMaterial.color = new THREE.Color("red");

  const text = new THREE.Mesh(textGeometry, textMaterial);
  text.position.y = 6.1;
  text.position.z = 2.5;

  scene.add(text); // Add the first text ("Spooky") to the scene
});

// Load the second text ("Mike")
fontLoader.load("/fonts/robo.json", (font) => {
  const textGeometry2 = new TextGeometry("Mike", {
    font: font,
    size: 0.38,
    depth: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  textGeometry2.center();
  const textMaterial2 = new THREE.MeshStandardMaterial();
  textMaterial2.color = new THREE.Color("red");

  const text2 = new THREE.Mesh(textGeometry2, textMaterial2);
  text2.position.y = 1;
  text2.position.z = -7;
  text2.rotation.y = Math.PI * 3;
  text2.position.x = -2.3;

  scene.add(text2); // Add the second text ("Mike") to the scene
});

// Load the second text ("joy")
fontLoader.load("/fonts/robo.json", (font) => {
  const textGeometry3 = new TextGeometry("Joy", {
    font: font,
    size: 0.38,
    depth: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  textGeometry3.center();
  const textMaterial3 = new THREE.MeshStandardMaterial();
  textMaterial3.color = new THREE.Color("red");

  const text3 = new THREE.Mesh(textGeometry3, textMaterial3);
  text3.position.y = 1;
  text3.position.z = -7;
  text3.rotation.y = Math.PI * 3;
  text3.position.x = 2.3;

  scene.add(text3); // Add the second text ("Mike") to the scene
});

// Load the second text ("Mike")
fontLoader.load("/fonts/robo.json", (font) => {
  const textGeometry4 = new TextGeometry("Ben", {
    font: font,
    size: 0.38,
    depth: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  textGeometry4.center();
  const textMaterial4 = new THREE.MeshStandardMaterial();
  textMaterial4.color = new THREE.Color("red");

  const text4 = new THREE.Mesh(textGeometry4, textMaterial4);
  text4.position.y = 1;
  text4.position.z = -7;
  text4.rotation.y = Math.PI * 3;
  text4.position.x = 0;

  scene.add(text4); // Add the second text ("Mike") to the scene
});

// Pumpkin geometry function with ridges
function createPumpkinGeometry(radius, segments) {
  const geometry = new THREE.SphereGeometry(radius, segments, segments);

  // Modify vertices to create ridges
  const positionAttribute = geometry.attributes.position;
  const vertex = new THREE.Vector3();

  for (let i = 0; i < positionAttribute.count; i++) {
    vertex.fromBufferAttribute(positionAttribute, i);

    // Create ridges by manipulating the y-axis vertices
    const angle = Math.atan2(vertex.z, vertex.x); // Angle around the y-axis
    const ridgeFactor = 1 + 0.2 * Math.sin(6 * angle); // Adjust for ridges
    vertex.multiplyScalar(ridgeFactor);

    positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  geometry.computeVertexNormals(); // Recalculate normals for lighting
  return geometry;
}

// Pumpkin material
const pumpkinMaterial = new THREE.MeshStandardMaterial({
  color: 0xffa500, // Orange color
  roughness: 0.7,
  metalness: 0.1,
});

// Pumpkin mesh
const pumpkinGeometry = createPumpkinGeometry(1, 32); // Radius 1, 32 segments
const pumpkin = new THREE.Mesh(pumpkinGeometry, pumpkinMaterial);
pumpkin.position.set(0, 1, 0);

// Create a group for the pumpkin
const pumpkinGroup = new THREE.Group();
pumpkinGroup.add(pumpkin);

// Scale the group to make it 50% smaller
pumpkinGroup.scale.set(0.5, 0.5, 0.5); // Scale down to 50%

// Set initial position for the group
pumpkinGroup.position.set(1.7, 6.45, 2);

// Add to the scene
scene.add(pumpkinGroup);

// Main ghost body shape
const ghostBodyShape = new THREE.Shape();

// Start at bottom-left (base of the ghost's wavy body)
ghostBodyShape.moveTo(-1.2, -1.0);

// Wavy body curve (left side)
ghostBodyShape.quadraticCurveTo(-1.5, -0.5, -1.4, 0.2);
ghostBodyShape.quadraticCurveTo(-1.3, 0.7, -1.0, 1.0);

// Left side of the head
ghostBodyShape.quadraticCurveTo(-0.8, 2.0, -0.2, 2.5);

// Top of the head
ghostBodyShape.quadraticCurveTo(0, 2.6, 0.2, 2.5);

// Right side of the head
ghostBodyShape.quadraticCurveTo(0.8, 2.0, 1.0, 1.0);

// Wavy body curve (right side)
ghostBodyShape.quadraticCurveTo(1.3, 0.7, 1.4, 0.2);
ghostBodyShape.quadraticCurveTo(1.5, -0.5, 1.2, -1.0);

// Bottom wavy body
ghostBodyShape.quadraticCurveTo(0.8, -1.5, 0.4, -1.4);
ghostBodyShape.quadraticCurveTo(0, -1.8, -0.4, -1.4);
ghostBodyShape.quadraticCurveTo(-0.8, -1.5, -1.2, -1.0);

// Close the shape
ghostBodyShape.closePath();

// Geometry for body
const ghostBodyGeometry = new THREE.ShapeGeometry(ghostBodyShape);

// Left arm shape
const leftArmShape = new THREE.Shape();
leftArmShape.moveTo(-1.0, 1.0);
leftArmShape.quadraticCurveTo(-1.5, 1.5, -2.0, 1.0);
leftArmShape.quadraticCurveTo(-2.5, 0.5, -1.6, 0.2);
leftArmShape.quadraticCurveTo(-1.3, 0.7, -1.0, 1.0);

// Geometry for left arm
const leftArmGeometry = new THREE.ShapeGeometry(leftArmShape);

// Right arm shape
const rightArmShape = new THREE.Shape();
rightArmShape.moveTo(1.0, 1.0);
rightArmShape.quadraticCurveTo(1.5, 1.5, 2.0, 1.0);
rightArmShape.quadraticCurveTo(2.5, 0.5, 1.6, 0.2);
rightArmShape.quadraticCurveTo(1.3, 0.7, 1.0, 1.0);

// Geometry for right arm
const rightArmGeometry = new THREE.ShapeGeometry(rightArmShape);

// Material: Semi-transparent with eerie glow effect
const ghostMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.7,
  roughness: 0.3,
  metalness: 0.1,
  side: THREE.DoubleSide,
});

// Meshes
const ghostBodyMesh = new THREE.Mesh(ghostBodyGeometry, ghostMaterial);
ghostBodyMesh.position.z = -6;

const leftArmMesh = new THREE.Mesh(leftArmGeometry, ghostMaterial);
leftArmMesh.position.z = -5.9; // Slightly in front of the body

const rightArmMesh = new THREE.Mesh(rightArmGeometry, ghostMaterial);
rightArmMesh.position.z = -5.9; // Slightly in front of the body

// Add components to the scene
const ghostMesh = new THREE.Group();
ghostMesh.add(ghostBodyMesh);
ghostMesh.add(leftArmMesh);
ghostMesh.add(rightArmMesh);

scene.add(ghostMesh);

// const rgbeLoader = new RGBELoader();
// rgbeLoader.load("./textures/environmentMap/sky.hdr", (environmentMap) => {
//   environmentMap.mapping = THREE.EquirectangularReflectionMapping;

//   scene.background = environmentMap;
//   scene.environment = environmentMap;
// });

const sky = new Sky();
sky.scale.set(100, 100, 100);
scene.add(sky);

sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);

scene.fog = new THREE.FogExp2("white", 0.035);

const timer = new Timer();

// Function to create a ghost soul geometry
function createGhostSoul(radius, particleCount) {
  const geometry = new THREE.BufferGeometry();

  // Create vertices for the ghostly shape
  const vertices = [];
  for (let i = 0; i < particleCount; i++) {
    // Randomize the position of particles within a spherical shape
    const theta = Math.random() * Math.PI * 2; // Random angle
    const phi = Math.acos(2 * Math.random() - 1); // Random inclination
    const r = radius * Math.random(); // Random distance from center

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    vertices.push(x, y, z);
  }

  // Convert vertices to Float32Array and set it as position attribute
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  return geometry;
}

// // Create the ghost soul
// const ghostSoulGeometry = createGhostSoul(1.5, 500); // Radius 1.5, 500 particles
// const ghostSoulMaterial = new THREE.PointsMaterial({
//  // color: 0x88ccff, //Light blue for a ghostly look
//   color: 0x932ffb,
//   size: 0.05, // Particle size
//   transparent: true,
//   opacity: 0.7, // Semi-transparent
//   depthWrite: false, // Avoid writing to the depth buffer
//   blending: THREE.AdditiveBlending, // Additive blending for a glowing effect
// });

// // Create the Points mesh for the ghost soul
// const ghostSoul = new THREE.Points(ghostSoulGeometry, ghostSoulMaterial);
// ghostSoul.position.set(0, 2, -6.5); // Position near the cross
// scene.add(ghostSoul);

// // Animate the ghost soul
// function animateGhostSoul() {
//   const time = timer.getElapsed();

//   // Make the ghost hover and pulse
//   ghostSoul.position.y = 2 + Math.sin(time * 2) * 0.2; // Hover up and down
//   ghostSoul.rotation.y += 0.01; // Slow rotation
// }

// const tick = () => {
//   timer.update();
//   const elapsedTime = timer.getElapsed();
//   ghostMesh.position.z = Math.cos(elapsedTime) * 13;
//   ghostMesh.position.x = Math.sin(elapsedTime) * 10;
//   ghostMesh.position.y = 3;

//   // pumpkin.position.y = Math.sin(elapsedTime);
//   animateGhostSoul();
//   controls.update();
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };

// tick();

// Function to generate a random hex color
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Create the ghost soul material with initial color
const ghostSoulMaterial = new THREE.PointsMaterial({
  color: 0x932ffb, // Initial color (light purple)
  size: 0.05, // Particle size
  transparent: true,
  opacity: 0.7, // Semi-transparent
  depthWrite: false, // Avoid writing to the depth buffer
  blending: THREE.AdditiveBlending, // Additive blending for a glowing effect
});

// Create the ghost soul geometry and points mesh
const ghostSoulGeometry = createGhostSoul(20, 2500); // Radius 1.5, 500 particles
const ghostSoul = new THREE.Points(ghostSoulGeometry, ghostSoulMaterial);
ghostSoul.position.set(0, 2, -6.5); // Position near the cross
scene.add(ghostSoul);

// Function to animate the ghost soul
function animateGhostSoul() {
  const time = timer.getElapsed();

  // Make the ghost hover and pulse
  ghostSoul.position.y = 2 + Math.sin(time * 2) * 0.2; // Hover up and down
  ghostSoul.rotation.y += 0.01; // Slow rotation
}

// Function to update the color of the ghost soul every second
setInterval(() => {
  const newColor = getRandomHexColor(); // Get a new random hex color
  ghostSoulMaterial.color.set(newColor); // Update the ghost soul material's color
}, 1000); // Update every 1000 milliseconds (1 second)

// Create a Realistic Grass Blade Geometry
function createGrassBladeGeometry() {
  const shape = new THREE.Shape();

  // Define the blade shape (curved and tapered at the top)
  shape.moveTo(0, 0); // Base
  shape.lineTo(0.05, 0.8); // Left side, tapering towards the top
  shape.quadraticCurveTo(0, 1, -0.05, 0.8); // Curved tip
  shape.lineTo(0, 0); // Right side back to base

  // Extrude settings for blade thickness
  const extrudeSettings = {
    steps: 10,
    depth: 0.01, // Thin blade
    bevelEnabled: false,
  };

  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

// Grass Material
const grassMaterial = new THREE.MeshStandardMaterial({
  map: lawnColorTexture,
  normalMap: lawnNormalTexture,
  roughnessMap: lawnRoughness,
  aoMap: lawnAOTexture,
  side: THREE.DoubleSide,
  transparent: true,
});

// Grass Blade Instancing
const grassBladeGeometry = createGrassBladeGeometry();
const grassCount = 5000; // Adjust for density
const grassMesh = new THREE.InstancedMesh(
  grassBladeGeometry,
  grassMaterial,
  grassCount
);

// Matrix for Random Placement
const dummyMatrix = new THREE.Matrix4();
for (let i = 0; i < grassCount; i++) {
  const x = (Math.random() - 0.5) * 20; // Random X position
  const z = (Math.random() - 0.5) * 23; // Random Z position
  const scale = 0.5 + Math.random() * 0.5; // Random height scale

  const rotation = Math.random() * Math.PI * 2; // Random rotation

  dummyMatrix.identity();
  dummyMatrix.setPosition(x, 0, z); // Place at ground level
  dummyMatrix.scale(new THREE.Vector3(scale, scale, scale)); // Scale for variation
  dummyMatrix.multiply(new THREE.Matrix4().makeRotationY(rotation)); // Random rotation
  grassMesh.setMatrixAt(i, dummyMatrix);
}

// Add Grass to the Scene
scene.add(grassMesh);

// Main animation loop
const tick = () => {
  timer.update();
  const elapsedTime = timer.getElapsed();
  ghostMesh.position.z = Math.cos(elapsedTime) * 13;
  ghostMesh.position.x = Math.sin(elapsedTime) * 10;
  ghostMesh.position.y = 3;

  // camera.position.x = Math.cos(Math.PI * elapsedTime * 0.2) * 10;
  // camera.position.z = Math.sin(Math.PI * elapsedTime * 0.2) * 20;

  // pumpkin.position.y = Math.sin(elapsedTime);
  animateGhostSoul();
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
