
export default class Mechanics {
    constructor(soundRange) {
        this.mic;
        //
        this.soundRange = soundRange;
        //
        this.VREnabled = false;
        this.soundDetected = false;
        //
        this.raycaster;
        this.enemiesIntersected
    }

    create(){
        this.raycaster = new THREE.Raycaster();
    }

    update(){
        //
    }

    render(){
        //
    }

    loop(){
        if(this.mic){
            if(this.mic.volume > this.soundRange){
                console.log("DEBUG: 'Shh' detected");
                //
                this.soundDetected = true;
            }else{
                this.soundDetected = false;
            }
        }
    }
  }