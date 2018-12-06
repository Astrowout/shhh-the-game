import Bird from './Bird.js';
//
import { getRandomInt } from "../libs/lib.js";

class Enemies {
  constructor(amount, dimensions, scene) {
    this.amount = amount;
    this.dimensions = dimensions;
    //
    this.create(scene);
  }

  create(scene) {
    this.birds = new Array(this.amount).fill("pending enemy", 0, this.amount);
    this.birds.forEach((bird, index) => {
      const distanceOrigin = this.dimensions.x / 2;
      const randomAngle = getRandomInt(0, 2 * Math.PI);
      this.birds[index] = new Bird({'x': distanceOrigin * Math.cos(randomAngle), 'y': 25, 'z': distanceOrigin * Math.sin(randomAngle)}, 5, randomAngle, scene);
    });
  }

  loop() {
    this.birds.forEach(bird => {
      bird.loop();
    })
  }
}

export default Enemies;