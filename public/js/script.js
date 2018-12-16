import Game from './classes/Game.js';
import Colors from "./classes/Colors.js";

{
  let game;

  const init = () => {
    game = new Game();
    //
    initLoop();
    initVR();
    initMic();
  }

  const initLoop = () => {
    game.play.scene.renderer.setAnimationLoop(initLoop);
    game.play.loop();
    game.play.scene.renderer.render(game.play.scene.scene, game.play.scene.camera);
  }

  const initMic = () => {
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

    const meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);

    game.play.mechanics.mic = meter;
  }

  const initVR = () => {
    const VRButton = document.body.appendChild(WEBVR.createButton(game.play.scene.renderer));
    game.play.scene.renderer.vr.enabled = true;
    VRButton.addEventListener('click', handleClickVRButton);
    handleOrientation();
  }

  const handleOrientation = () => {
    let crosshair = new THREE.Mesh(new THREE.RingBufferGeometry(0.02, 0.04, 32), new THREE.MeshBasicMaterial(
        {
          color: Colors.white,
          opacity: 0.5,
          transparent: true
        }
      ));
    crosshair.position.z = -2;
    game.play.scene.camera.add(crosshair);

    window.addEventListener("vrdisplaypointerrestricted", onPointerRestricted, false);
    window.addEventListener("vrdisplaypointerunrestricted", onPointerUnrestricted, false);
  };

  const onPointerRestricted = () => {
    let pointerLockElement = renderer.domElement;
    if (pointerLockElement && typeof pointerLockElement.requestPointerLock === "function") {
      pointerLockElement.requestPointerLock();
    }
  }

  const onPointerUnrestricted = () => {
    let currentPointerLockElement = document.pointerLockElement;
    let expectedPointerLockElement = renderer.domElement;
    if (currentPointerLockElement && currentPointerLockElement === expectedPointerLockElement && typeof document.exitPointerLock === "function") {
      document.exitPointerLock();
    }
  }

  const handleClickVRButton = () => {
      let intro = document.querySelector(`.header-js`);
      intro.classList.toggle("hidden");

      const container = document.querySelector(`#world`);
      container.appendChild(game.play.scene.renderer.domElement);
      //
      game.play.mechanics.VREnabled = true;
      game.play.init();
  }

  init();
}
