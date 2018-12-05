let meter,
    mediaStreamSource;

export const getRandomInt = (min, max) => {
    return Math.random() * (max - min + 1) + min;
}

export const handleClickVRButton = () => {
    const intro = document.querySelector(`.title-container`);
    intro.classList.add("hidden");
    intro.classList.remove("title-container");
}

export const getVolumeFromMic = () => {
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
    // check if we're currently clipping
    if (meter.checkClipping()) {
      console.warn(meter.volume);
    } else {
        if(meter.volume > .2){
            console.log('shh');
        }
    }

    window.requestAnimationFrame(onVolumeChange);
}

export default {getRandomInt, getVolumeFromMic, handleClickVRButton};
