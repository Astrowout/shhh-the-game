import Colors from './Colors.js';
import Sky from './Sky.js';
import Floor from './Floor.js';
import Clouds from './Clouds.js';
import Star from './Star.js';
//
import getRandomInt from "../libs/lib.js";

const nStars = 80;

class Environment {
  constructor(scene) {
      this.scene = scene;
      //
      this.sky = new Sky;
      this.floor = new Floor;
      this.clouds = new Clouds;
      this.moon = new Star(scene, 100, {'x': 0, 'y': 1000, 'z': -1000}, true);

      for(let i = 0; i < nStars; i ++){
        this.star = new Star(scene, 10, {'x': getRandomInt(-8000, 8000), 'y': getRandomInt(800, 1200), 'z': getRandomInt(-8000, 8000)}, false);
      }
      //
      this.init();
      this.builtScene();
  }

  init(){
    this.floor.mesh.position.y = -15;
  }

  loop(){
    this.clouds.move();
  }

  builtScene(){
    this.scene.add(this.sky.mesh);
    this.scene.add(this.floor.mesh);
    this.scene.add(this.clouds.mesh);
    //this.scene.add(this.moon.mesh);
  }
}

export default Environment;