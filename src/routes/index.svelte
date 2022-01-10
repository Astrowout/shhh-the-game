<svelte:head>
	<title>Shhh The Game</title>
	<link rel="stylesheet" href="/css/reset.css">
	<link rel="stylesheet" href="/css/main.css">
</svelte:head>

<script>
	import * as THREE from 'three';
	import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

	import volumeMeter from "../js/helpers/volume-meter";
	import Game from '../js/classes/Game.js';
	import Colors from "../js/classes/Colors.js";

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
		const meter = volumeMeter(stream);

		game.play.mechanics.mic = meter();
	}

	const initVR = () => {
		const renderer = game.play.scene.renderer;
		const vrButton = document.body.appendChild(VRButton.createButton(renderer));
		renderer.xr.enabled = true;
		vrButton.addEventListener('click', handleClickVRButton);
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
		let intro = document.querySelector(`.splashscreen-js`);
		if (intro) {
			intro.remove();
		}

		const container = document.querySelector(`#world`);
		container.appendChild(game.play.scene.renderer.domElement);

		game.play.mechanics.VREnabled = true;
		game.play.init();
	}

	init();

</script>

<div class="splashscreen-js splashscreen"></div>
<div id="world"></div>