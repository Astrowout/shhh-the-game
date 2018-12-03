import Bird from './Bird.js';
//
import { getRandomInt } from "../libs/lib.js";

class Enemies {
  constructor(radius, amount, scene) {
    this.radius = radius;
    this.amount = amount;
    //
    this.create(scene);
  }

  create(scene) {
    this.birds = new Array(this.amount).fill("pending enemy", 0, this.amount);
    this.birds.forEach((bird, index) => {
      const distanceOrigin = 500;
      const randomAngle = getRandomInt(0, 2 * Math.PI);
      this.birds[index] = new Bird(scene, {
        x: (distanceOrigin * Math.cos(randomAngle)),
        y: 25,
        z: (distanceOrigin * Math.sin(randomAngle))
      }, randomAngle);
    });
  }

  loop() {
    this.birds.forEach(bird => {
      bird.loop();
    })
  }
}

export default Enemies;