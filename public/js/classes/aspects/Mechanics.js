let tempTime;

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
        //
        this.raycaster;
        this.enemiesIntersected = [];
        this.intersected;
        //
        this.create();
    }

    create(){
        this.raycaster = new THREE.Raycaster();
        this.startTime = new Date();
    }

    update(){
        //
    }

    render(){
        //
    }

    loop(enemies, scene){
        this.raycaster.setFromCamera({ x: 0, y: 0 }, scene.camera);
        let intersects = this.raycaster.intersectObjects(this.enemiesIntersected, true);
        if (intersects.length > 0) {
            this.intersected = intersects[0].object.parent.id;
            this.onVolumeChange(enemies);
        } else {
            this.intersected = undefined;
        }

        if(this.health <= 0){
            console.log("DEBUG: Game Over");
            //
            this.gameOver = true;
        }
    }

    time(){
        this.endTime = new Date();
        this.elapsedTime = Math.round((this.endTime - this.startTime) / 1000);
    }

    onVolumeChange(enemies){
        if (this.mic) {
            if (this.mic.volume > this.soundRange) {
                if(enemies.birds) {
                    enemies.birds.forEach(bird => {
                        if(bird.mesh){
                            if(bird.mesh.children[0].id == this.intersected) {
                                bird.scared = true;
                            }
                        }
                    });
                }
            } else {
                this.soundDetected = false;
            }
        }
    }
  }