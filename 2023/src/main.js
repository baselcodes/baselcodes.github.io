import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

//---- BASIC parameters
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
THREE.Cache.enabled = true;

document.querySelector("#threejs").appendChild(renderer.domElement);
document.querySelector("#hack").addEventListener("touchstart", (e) => {
  e.preventDefault();
});

document.querySelectorAll("a").forEach((elem) => {
  elem.addEventListener("touchstart", stopPropagation);
  elem.addEventListener("touchmove", stopPropagation);
  elem.addEventListener("touchend", stopPropagation);
});

function stopPropagation(e) {
  e.stopPropagation();
}

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

var camera = new THREE.PerspectiveCamera(
  20,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 10, 20);

var scene = new THREE.Scene();
var city = new THREE.Object3D();
var town = new THREE.Object3D();
var group = new THREE.Group();

var linePos = true;
var uSpeed = 0.002;
var textSize = 0;
let bcd = "BASEL CODES DAY";
var scaleFactor = 0.0007;

var group, textMesh, textGeo, textMaterials, font;
let fontName = "Kollektif_Bold";

//--- FOG background
var setcolor = 0x3f33ff;
scene.background = new THREE.Color(setcolor);
scene.fog = new THREE.Fog(setcolor, 10, 35);

//--- RANDOM Functions
function mathRandom(num = 8) {
  var numValue = -Math.random() * num + Math.random() * num;
  return numValue;
}

function mathRandomBetween(min = 8, max = 10) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//--- MOUSE functions
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(),
  INTERSECTED;
var intersected;

function onMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
function onDocumentTouchStart(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
  }
}

function onDocumentTouchMove(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
  }
}

/* document.addEventListener("mousemove", onMouseMove, { passive: false });
document.addEventListener("touchstart", onDocumentTouchStart, {
  passive: false,
});
document.addEventListener("touchmove", onDocumentTouchMove, { passive: false }); */

//--- LIGHTS
var ambientLight = new THREE.AmbientLight(0x0ffff, 4);
ambientLight.position.set(0, 6, 0);

scene.add(ambientLight);
city.add(town);
scene.add(city);

//--- CITY
function init() {
  var segments = 2;
  for (var i = 1; i < 70; i++) {
    var building = new THREE.BoxGeometry(
      1,
      1.5,
      1,
      segments,
      segments,
      segments
    );
    var material = new THREE.MeshStandardMaterial({
      color: 0x00000,
      metalness: 1,
      shading: THREE.SmoothShading,
      side: THREE.DoubleSide,
    });

    var cube = new THREE.Mesh(building, material);

    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.rotationValue = 0.1 + Math.abs(mathRandom(8));

    var cubeWidth = 0.9;
    cube.scale.y = Math.abs(mathRandom(100));
    cube.scale.x = cube.scale.z = cubeWidth + mathRandom(1 - cubeWidth);
    cube.position.x = Math.round(mathRandom());
    cube.position.z = Math.round(mathRandom());
    town.add(cube);
  }

  //--- FLOOR
  var f_wire_material = new THREE.MeshPhongMaterial({
    color: 0x52ff33,
    side: THREE.DoubleSide,
    wireframe: true,
    opacity: 0.1,
    transparent: true,
  });

  var f_material = new THREE.MeshPhongMaterial({
    color: 0x00000,
    side: THREE.DoubleSide,
    wireframe: false,
    opacity: 0.9,
    transparent: true,
  });

  var fgeometry = new THREE.PlaneGeometry(60, 60, 100, 100);
  var felement = new THREE.Mesh(fgeometry, f_material);

  var f_wire_geometry = new THREE.PlaneGeometry(60, 60, 100, 100);
  var f_wire_element = new THREE.Mesh(f_wire_geometry, f_wire_material);

  felement.rotation.x = (-90 * Math.PI) / 180;
  felement.position.y = -0.001;
  felement.receiveShadow = true;

  f_wire_element.rotation.x = (-90 * Math.PI) / 180;
  f_wire_element.position.y = -0.001;
  f_wire_element.receiveShadow = true;

  city.add(felement);
  city.add(f_wire_element);
}

//--- MOVING LINES
var createLines = function (cScale = 2, cPos = 20) {
  var cMat = new THREE.MeshBasicMaterial({
    color: 0x52ff33,
    side: THREE.DoubleSide,
  });
  var cGeo = new THREE.BoxGeometry(
    mathRandomBetween(1, 5),
    cScale / mathRandomBetween(20, 50),
    cScale / mathRandomBetween(20, 50)
  );
  var lineElement = new THREE.Mesh(cGeo, cMat);
  var cAmp = 2;

  if (linePos) {
    linePos = false;
    lineElement.position.x = -cPos;
    lineElement.position.z = mathRandom(cAmp);
    TweenMax.to(lineElement.position, 3, {
      x: cPos,
      repeat: -1,
      yoyo: true,
      delay: mathRandom(3),
    });
  } else {
    linePos = true;
    lineElement.position.x = mathRandom(cAmp);
    lineElement.position.z = -cPos;
    lineElement.rotation.y = (90 * Math.PI) / 180;
    TweenMax.to(lineElement.position, 5, {
      z: cPos,
      repeat: -1,
      yoyo: true,
      delay: mathRandom(3),
      ease: Power1.easeInOut,
    });
  }

  lineElement.position.y = Math.abs(mathRandom(5));
  city.add(lineElement);
};

function generateLines() {
  for (var i = 0; i < 40; i++) {
    createLines(0.2, 20);
  }
}
//--- TEXT

function loadFont() {
  const loader = new FontLoader();
  loader.load("font/" + fontName + ".json", function (response) {
    font = response;
    createText(bcd);
  });
}

function createText(text) {
  textGeo = new TextGeometry(text, {
    font: font,
    size: window.innerWidth * scaleFactor,
    height: 0.3,
    curveSegments: 2,
  });

  textGeo.computeBoundingBox();

  textMaterials = [
    new THREE.MeshStandardMaterial({ color: 0x000000, wireframe: false }), // front
    new THREE.MeshStandardMaterial({
      color: 0x52ff33,
      wireframe: true,
      roughness: 0,
    }), // side
  ];

  const centerOffset =
    -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
  textMesh = new THREE.Mesh(textGeo, textMaterials);
  textMesh.position.x = centerOffset;
  textMesh.position.y = 0;
  textMesh.position.z = 0;
  textSize = textGeo.boundingBox.max.x;
  createBasel(textMesh);
}

function createBasel(textMesh) {
  group.position.x = 0;
  group.position.y = 1;
  group.position.z = mathRandomBetween(-3, 1);
  group.add(textMesh);
  city.add(group);
}

//--- ANIMATE

var animate = function () {
  var time = Date.now() * 0.0002;
  requestAnimationFrame(animate);
  city.rotation.y -= mouse.x * uSpeed;
  city.rotation.x -= -mouse.y * uSpeed;

  if (city.rotation.y < -0.5) city.rotation.y = -0.5;
  else if (city.rotation.y > 0.5) city.rotation.y = 0.5;

  if (city.rotation.x < -0.2) city.rotation.x = -0.2;
  else if (city.rotation.x > 0.2) city.rotation.x = 0.2;

  //console.log(city.rotation.x)
  group.position.x -= -mouse.x * 0.01;
  if (group.position.x > textSize) group.position.x = textSize;
  if (group.position.x < -textSize) group.position.x = -textSize;

  for (var i = 0; i < town.children.length; i++) {
    var object = town.children[i];
    if (object instanceof THREE.Mesh) {
      object.scale.y =
        (i + 1) *
        0.05 *
        Math.sin(time + object.position.x * 0.25 + object.position.z * 0.25);
    }
  }

  if (window.innerWidth > 800) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.needsUpdate = true;
    scaleFactor = 0.0007;
  } else {
    scaleFactor = 0.001;
  }

  camera.lookAt(city.position);
  renderer.clear();
  renderer.render(scene, camera);
};

//--- START
loadFont();
init();
generateLines();
animate();
