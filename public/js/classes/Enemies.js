import Bird from './Bird.js';
//
import { getRandomInt } from "../libs/lib.js";

class Enemies {
  constructor(amount, dimensions, seed) {
    this.amount = amount;
    this.dimensions = dimensions;
    this.seed = seed;
    //
    this.create();
  }

  create() {
    this.birds = new Array(this.amount);
  }

  loop(scene, isSound) {
    const seed = getRandomInt(0, this.seed);

    if(seed < 1){
      console.log('DEBUG: new enemy spawned')
      const distanceOrigin = this.dimensions.x / 2;
      const randomAngle = getRandomInt(0, 2 * Math.PI);
      this.birds.push(new Bird({'x': distanceOrigin * Math.cos(randomAngle), 'y': 25, 'z': distanceOrigin * Math.sin(randomAngle)}, 5, randomAngle, scene));
    }

    this.birds.forEach(bird => {
      bird.loop();
    });

    if(isSound){
      console.log('DEBUG: sound detected');
    }
  }
}

export default Enemies;