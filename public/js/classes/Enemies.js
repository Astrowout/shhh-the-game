import Bird from './Bird.js';
//
import { getRandomInt } from "../libs/lib.js";

class Enemies {
  constructor(amount, dimension, seed) {
    this.amount = amount;
    this.dimension = dimension;
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
      console.log('new enemy spawned')
      const distanceOrigin = this.dimension / 2;
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