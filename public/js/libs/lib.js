
export const getRandomInt = (min, max) => {
    return Math.random() * (max - min + 1) + min;
}

export const getVolumeFromMic = () => {
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

    onVolumeChange();
}

const onVolumeChange = () => {
    if (meter.volume > 0.2) {
        console.log("clipped");
    }

    setTimeout(onVolumeChange, 300);
}

export default {getRandomInt};
