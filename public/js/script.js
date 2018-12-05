import Environment from './classes/Environment.js';
import Enemies from './classes/Enemies.js';
import Colors from './classes/Colors.js';

import {getVolumeFromMic, handleClickVRButton} from "./libs/lib.js";

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

  let environment,
      enemies;

  let hemisphereLight,
  shadowLight,
  ambientLight;

  const init = () => {
    createScene();

    createEnvironment();
    createEnemies();

    createLights();

    window.addEventListener('touchstart', getVolumeFromMic);
    window.addEventListener('click', getVolumeFromMic);
    loop();

    debug();
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

    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    const VRButton = document.body.appendChild(WEBVR.createButton(renderer));
    renderer.vr.enabled = true;
    VRButton.addEventListener('click', handleClickVRButton);

    container = document.querySelector(`#world`);
    container.appendChild(renderer.domElement);
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

    // to activate the lights, just add them to the scene
    scene.add(hemisphereLight);
    scene.add(shadowLight);
    //scene.add(ambientLight);
  }

  const createEnvironment = () => {
    environment = new Environment(5000, 1500, scene);
  }

  const createEnemies = () => {
    enemies = new Enemies(5000, 20, scene);
  }

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

    environment.loop();
    if (enemies) {
      enemies.loop();
    }

    renderer.render(scene, camera);
  }

  const debug = () => {
    camera.position.y = 1000;
  }


  init();
}
