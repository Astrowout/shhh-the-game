import Sea from './classes/Sea.js';
import Sky from './classes/Sky.js';
import Plane from './classes/Plane.js';

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

  let sea;
  
  let hemisphereLight,
  shadowLight,
  ambientLight

  let sky;

  let plane;

  let mousePos = { x: 0, y: 0 };

  let Colors = {
    red: 0xf25346,
    white: 0xd8d0d1,
    brown: 0x59332e,
    pink: 0xF5986E,
    brownDark: 0x23190f,
    blue: 0x68c3c0,
  };

  const init = () => {
    // set up the scene, the camera and the renderer
    createScene();

    //VR

    // add the lights
    createLights();

    // add the objects
    createPlane();
    createSea();
    createSky();

    document.addEventListener('mousemove', handleMouseMove, false);

    //start de render loop
    loop();
  }

  const createScene = () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    scene = new THREE.Scene();
    
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane= 10000;
    camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );
    camera.position.x = 0;
    camera.position.y = 100;
    camera.position.z = 200;

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
  }

  const createLights = () => {
    // A hemisphere light is a gradient colored light; 
    // the first parameter is the sky color, the second parameter is the ground color, 
    // the third parameter is the intensity of the light
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);

    //A directional light shines from a specific direction. 
    //It acts like the sun, that means that all the rays produced are parallel. 
    shadowLight = new THREE.DirectionalLight(0xffffff, .9);

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

    ambientLight = new THREE.AmbientLight (0xdc8874, .4);

    // to activate the lights, just add them to the scene
    scene.add(hemisphereLight);
    scene.add(shadowLight);
    scene.add(ambientLight);
  }

  const createSea = () => {
    sea = new Sea();
    sea.mesh.position.y = -800;
    scene.add(sea.mesh);
  }

  const createSky = () => {
    sky = new Sky();
    sky.mesh.position.y = -600;
    scene.add(sky.mesh);
  }

  const createPlane = () => {
    plane = new Plane();
    plane.mesh.scale.set(.25, .25, .25);
    plane.mesh.position.y = 100;
    scene.add(plane.mesh);
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

  const updatePlane = () => {

    var targetY = normalize(mousePos.y, -.75, .75, 25, 175);
    var targetX = normalize(mousePos.x, -.75, .75, -100, 100);

    // Move the plane at each frame by adding a fraction of the remaining distance
    plane.mesh.position.y += (targetY - plane.mesh.position.y) * 0.1;

    // Rotate the plane proportionally to the remaining distance
    plane.mesh.rotation.z = (targetY - plane.mesh.position.y) * 0.0128;
    plane.mesh.rotation.x = (plane.mesh.position.y - targetY) * 0.0064;

    plane.movePlane();
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

    sea.moveWaves();
    sky.moveSky();
    updatePlane();

    renderer.render(scene, camera);
  }


  init();
}