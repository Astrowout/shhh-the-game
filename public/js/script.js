import Environment from './classes/Environment.js';
import Enemies from './classes/Enemies.js';
import Colors from './classes/Colors.js';

{

  let scene,
      WIDTH,
      HEIGHT,
      camera,
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane,
      renderer;

  let environment,
      enemies;

  let hemisphereLight,
  shadowLight;

  let meter;

  const init = () => {
    //
    createScene();
    createEnvironment();
    createLights();
    
    // window.addEventListener("deviceorientation", handleOrientation, true);
  }

  // const handleOrientation = e => {
  //   let playerRotation = e.alpha;
  //   console.log(playerRotation);
  // }

  const createScene = () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(Colors.purpleDark);

    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 180;
    nearPlane = 1;
    farPlane= 2000;
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

    //VR
    const VRButton = document.body.appendChild(WEBVR.createButton(renderer));
    renderer.vr.enabled = true;
    VRButton.addEventListener('click', handleClickVRButton);
  }

  const handleClickVRButton = () => {
    let intro = document.querySelector(`.title-container-js`);
    intro.classList.toggle("hidden");
    intro.classList.toggle("title-container");

    const container = document.querySelector(`#world`);
    container.appendChild(renderer.domElement);

    createEnemies();

    getVolumeFromMic();
    loop();

    debug();
  }

  const createLights = () => {
    hemisphereLight = new THREE.HemisphereLight(Colors.purpleLight, Colors.greenLight);
    shadowLight = new THREE.DirectionalLight(0xffffff, .3);
    
    // Set the direction of the light
    shadowLight.position.set(0, 1500, -1000);

    // Allow shadow casting
    shadowLight.castShadow = true;

    // define the visible area of the projected shadow
    shadowLight.shadow.camera.left = -500;
    shadowLight.shadow.camera.right = 500;
    shadowLight.shadow.camera.top = 500;
    shadowLight.shadow.camera.bottom = -1000;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 2000;

    // define the resolution of the shadow; the higher the better,
    // but also the more expensive and less performant
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    // to activate the lights, just add them to the scene
    // hemiLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 10);
    // scene.add(hemiLightHelper);
    scene.add(hemisphereLight);
    scene.add(shadowLight);
  }

  const createEnvironment = () => {
    environment = new Environment(2000, 1500, scene);
  }

  const createEnemies = () => {
    enemies = new Enemies(20, 1000, 50);
  }

  const loop = () => {
    renderer.setAnimationLoop(loop);
    
    environment.loop();

    if(meter){
      onVolumeChange();
    }
    
    if(enemies){
      enemies.loop(scene);
    }

    renderer.render(scene, camera);
  }

  const debug = () => {
    camera.position.y = 1000;
  }

  const getVolumeFromMic = () => {
    try {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      navigator.getUserMedia(
        {
          "audio": {
            "mandatory": {
              "googEchoCancellation": "false",
              "googAutoGainControl": "false",
              "googNoiseSuppression": "false",
              "googHighpassFilter": "false"
            },
            "optional": []
          },
        },
        onMicrophoneGranted,
        onMicrophoneDenied
      );
    } catch (e) {
      alert("Audio error: " + e);
    }
  }

  const onMicrophoneDenied = () => {
    alert("Stream generation failed.");
  }

  const onMicrophoneGranted = (stream) => {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioContext = new AudioContext();
    audioContext.resume();

    const mediaStreamSource = audioContext.createMediaStreamSource(stream);

    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);
  }

  const onVolumeChange = () => {

    if (meter.volume > 0.2) {
      //console.log("DEBUG: 'Shh' detected");

      if(enemies.birds){
        enemies.birds.forEach((bird, index) => {
          bird.scared = true;
        });
      }
    }
  }


  init();
}
