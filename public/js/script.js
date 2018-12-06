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
  shadowLight,
  ambientLight;

  let meter,
    mediaStreamSource,
    isSound;

  const init = () => {
    createScene();
    createEnvironment();
    createLights();
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

    //VR
    const VRButton = document.body.appendChild(WEBVR.createButton(renderer));
    renderer.vr.enabled = true;
    VRButton.addEventListener('click',  handleClickVRButton);
  }

  const handleClickVRButton = () => {
    const intro = document.querySelector(`.title-container`);
    intro.classList.add("hidden");
    intro.classList.remove("title-container");

    const container = document.querySelector(`#world`);
    container.appendChild(renderer.domElement);

    createEnemies();

    getVolumeFromMic();
    loop();

    debug();
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
    environment = new Environment(2000, 1500, scene);
  }

  const createEnemies = () => {
    enemies = new Enemies(20, {'x': 1000, 'y': 1000}, 50);
  }

  const loop = () => {
    renderer.setAnimationLoop(loop);

    environment.loop();
    
    if (enemies) {
      enemies.loop(scene, isSound);
    }

    renderer.render(scene, camera);
  }

  const debug = () => {
    camera.position.y = 1000;
  }

  const getVolumeFromMic = () => {
    try {
        // Retrieve getUserMedia API with all the prefixes of the browsers
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        
        // Ask for an audio input
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
        alert("sumething wong: " + e);
    }
}

  const onMicrophoneDenied = () => {
     alert("Stream generation failed.");
  }

  const onMicrophoneGranted = (stream) => {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    // Get an audio context
    let audioContext = new AudioContext();
    audioContext.resume();
    
    // Create an AudioNode from the stream.
    mediaStreamSource = audioContext.createMediaStreamSource(stream);
    
    // Create a new volume meter and connect it.
    meter = createAudioMeter(audioContext, 1, 0.95, 10);
    mediaStreamSource.connect(meter);
    
    // kick off the visual updating
    onVolumeChange();
}

const onVolumeChange = (time) => {
    isSound = false;
    // check if we're currently clipping
    if (meter.checkClipping()) {
      console.warn(meter.volume);
    } else {
        if(meter.volume > .2){
          isSound = true;
        }else{
          isSound = false;
        }
    }

    window.requestAnimationFrame(onVolumeChange);
}


  init();
}
