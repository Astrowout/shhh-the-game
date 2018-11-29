//import Sea from './classes/Sea.js';
//import Sky from './classes/Sky.js';
//import Plane from './classes/Plane.js';
import Environment from './classes/Environment.js';
import Enemies from './classes/Enemies.js';
import Colors from './classes/Colors.js';

import {getVolumeFromMic} from "./libs/lib.js";

{

  let scene,
      WIDTH,
      HEIGHT,
      camera,
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane,
      renderer,
      container;

  let environment;
  let enemies;
  
  let hemisphereLight,
  shadowLight,
  ambientLight,
  campFireLight;

  let mousePos = { x: 0, y: 0 };

  const init = () => {
    // window.addEventListener('touchstart', getVolumeFromMic);
    // window.addEventListener('click', getVolumeFromMic);

    loadModels();

    createScene();
    createEnvironment();
    // createEnemies();
    createLights();

    document.addEventListener('mousemove', handleMouseMove, false);
    loop();

    debug();
  }

  const loadModels = () => {
    const loader = new THREE.GLTFLoader();
    loader.load('../assets/bird.glb', enemyModel => createEnemies(enemyModel));
  }

  const createScene = () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    scene = new THREE.Scene();
    
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 180;
    nearPlane = 1;
    farPlane= 10000;
    camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );
    //camera.position.x = 0;
    //camera.position.y = 6000;
    //camera.position.z = -500;

    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(WEBVR.createButton(renderer));
    renderer.vr.enabled = true;
    
    container = document.querySelector(`#world`);
    container.appendChild(renderer.domElement);

    //const controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.enablePan = false;
  }

  const createLights = () => {
    // A hemisphere light is a gradient colored light; 
    // the first parameter is the sky color, the second parameter is the ground color, 
    // the third parameter is the intensity of the light
    hemisphereLight = new THREE.HemisphereLight(Colors.purpleLight, Colors.greenLight);

    //A directional light shines from a specific direction. 
    //It acts like the sun, that means that all the rays produced are parallel. 
    shadowLight = new THREE.DirectionalLight(0xffffff, .4);



    // Set the direction of the light  
    shadowLight.position.set(300, 350, 350);

    // Allow shadow casting 
    shadowLight.castShadow = true;

    // define the visible area of the projected shadow
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    // define the resolution of the shadow; the higher the better, 
    // but also the more expensive and less performant
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    //ambientLight = new THREE.AmbientLight (0xdc8874, .8);

    //campFireLight = new THREE.PointLight('#FF2E02', 3, 200);
    //campFireLight.position.set(10, 0, 10);

    // to activate the lights, just add them to the scene
    scene.add(hemisphereLight);
    scene.add(shadowLight);
    //scene.add(ambientLight);
    //scene.add(campFireLight);
  }

  const createEnvironment = () => {
    environment = new Environment(5000, 1500, scene);
  }

  const createEnemies = (enemyModel) => {
    enemies = new Enemies(enemyModel, scene);
  }

  const handleMouseMove = () => {
    // here we are converting the mouse position value received 
    // to a normalized value letying between -1 and 1;
    // this is the formula for the horizontal axis:

    let tx = -1 + (event.clientX / WIDTH) * 2;

    // for the vertical axis, we need to inverse the formula 
    // because the 2D y-axis goes the opposite direction of the 3D y-axis

    let ty = 1 - (event.clientY / HEIGHT) * 2;
    mousePos = { x: tx, y: ty };
  }

  /*const updatePlane = () => {

    var targetY = normalize(mousePos.y, -.75, .75, 25, 175);
    var targetX = normalize(mousePos.x, -.75, .75, -100, 100);

    // Move the plane at each frame by adding a fraction of the remaining distance
    plane.mesh.position.y += (targetY - plane.mesh.position.y) * 0.1;

    // Rotate the plane proportionally to the remaining distance
    plane.mesh.rotation.z = (targetY - plane.mesh.position.y) * 0.0128;
    plane.mesh.rotation.x = (plane.mesh.position.y - targetY) * 0.0064;

    plane.movePlane();
  }*/

  const normalize = (v, vmin, vmax, tmin, tmax) => {
    const nv = Math.max(Math.min(v, vmax), vmin);
    const dv = vmax - vmin;
    const pc = (nv - vmin) / dv;
    const dt = tmax - tmin;
    const tv = tmin + (pc * dt);
    return tv;

  }

  const loop = () => {
    renderer.setAnimationLoop(loop);

    //sea.moveWaves();
    //sky.moveSky();
    //updatePlane();

    environment.loop();
    if(enemies) {
      enemies.loop();
    }
    renderer.render(scene, camera);
  }

  const debug = () => {
    // camera.position.y = 1000;
  }


  init();
}