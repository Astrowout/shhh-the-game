import Bird from './Bird.js';
//
// import { getRandomInt } from "../libs/lib.js";

class Enemies {
  constructor(enemyModel, scene) {
    this.enemy = enemyModel;
    this.scene = scene;
    //
    this.create();
    this.update();
    this.render();
  }

  create() {
    this.bird = new Bird(this.enemy, 5);
  }

  update() {
    this.bird.update({ 'x': 0, 'y': 100, 'z': -200 });
  }

  loop() {
    this.bird.loop();
  }

  render() {
    this.scene.add(this.bird.mesh);
  }
}

export default Enemies;