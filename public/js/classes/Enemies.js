import Bird from './Bird.js';
//
import { getRandomInt } from "../libs/lib.js";

class Enemies {
  constructor(scene, radius, amount) {
    this.scene = scene;
    this.radius = radius;
    this.amount = amount;
    //
    this.create();
  }

  create() {
    this.birds = new Array(this.amount).fill("pending enemy", 0, this.amount);
    this.bird = new Bird(this.scene, {
      'x': 0,
      'y': 30,
      'z': -20
    })
    this.birds.forEach((bird, index) => {
      this.birds[index] = new Bird(this.scene, {
        'x': getRandomInt(-600, 600) / 8,
        'y': 20,
        'z': getRandomInt(-600, 600) / 8
      });
    });
  }

  loop() {
    this.birds.forEach(bird => {
      bird.loop();
    })
  }
}

export default Enemies;