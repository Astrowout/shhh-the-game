import Bird from './Bird.js';
//
import { getRandomInt } from "../libs/lib.js";

class Enemies {
  constructor(amount, dimension, seed) {
    this.amount = amount;
    this.dimension = dimension;
    this.seed = seed;
    this.birds = [];
  }

  loop(scene) {

    if(this.birds.length < this.amount){
      const seed = getRandomInt(0, this.seed);

      if(seed < 1){
        console.log('DEBUG: Enemy spawned')
        //
        const distanceOrigin = this.dimension / 2;
        const randomAngle = getRandomInt(0, 2 * Math.PI);
        this.birds.push(new Bird({'x': distanceOrigin * Math.cos(randomAngle), 'y': 25, 'z': distanceOrigin * Math.sin(randomAngle)}, 5, 1, randomAngle, scene));
      }
    }
    
    this.birds.forEach((bird, index) => {
      bird.loop();

      if(bird.mesh){
        if(Math.abs(bird.position.x) < Math.abs(bird.mesh.position.x) && Math.abs(bird.position.z) < Math.abs(bird.mesh.position.z)){
          this.kill(bird, index);
        }
      }
    });
  }

  kill(bird, index){
    console.log("DEBUG: Enemy erased from array");
    //
    this.birds.splice(index, 1);
    bird.kill();
  }
}

export default Enemies;