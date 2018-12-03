import Bird from './Bird.js';
//
// import { getRandomInt } from "../libs/lib.js";

class Enemies {
  constructor(scene) {
    this.scene = scene;
    //
    this.create();
  }

  create() {
    this.bird = new Bird(this.scene, {'x': 0, 'y': 40, 'z': -20});
  }

  loop() {
    this.bird.loop();
  }
}

export default Enemies;