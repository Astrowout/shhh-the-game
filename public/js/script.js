import Game from './classes/Game.js';

{
  let game;

  const init = () => {
    game = new Game();
    //
    initLoop();
    initVR();
    initMic();
    // window.addEventListener("deviceorientation", handleOrientation, true);
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
}

  const handleClickVRButton = () => {
      let intro = document.querySelector(`.title-container-js`);
      intro.classList.toggle("hidden");
      intro.classList.toggle("title-container");

      const container = document.querySelector(`#world`);
      container.appendChild(game.play.scene.renderer.domElement);

      console.log('DEBUG: VR Button clicked');
      //
      game.play.mechanics.VREnabled = true;
      game.play.init();
  }

    // const handleOrientation = e => {
    //   let playerRotation = e.alpha;
    //   console.log(playerRotation);
    // }

  init();
}
