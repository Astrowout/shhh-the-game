
export default class Mechanics {
    constructor(health, score, soundRange) {
        this.mic;
        this.score;
        //
        this.health = health;
        this.score = score;
        this.soundRange = soundRange;
        //
        this.VREnabled = false;
        this.soundDetected = false;
        this.gameOver = false;
    }

    create(){
        //
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
                console.log("DEBUG: Sound detected");
                //
                this.soundDetected = true;
            }else{
                this.soundDetected = false;
            }
        }

        if(this.health <= 0){
            console.log("DEBUG: Game Over");
            //
            this.gameOver = true;
        }
    }
  }