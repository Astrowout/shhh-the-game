import Floor from './Floor.js';
import Clouds from './Clouds.js';
import Star from './Star.js';
import Bonfire from './Bonfire.js';
import Forest from './Forest.js';
import Camp from './Camp.js';
//
import {getRandomInt} from "../libs/lib.js";

class Environment {
  constructor(radius, height, scene) {
    this.radius = radius;
    this.height = height;
    this.scene = scene;
    //
    this.create();
    this.update();
    this.render();
  }

  create(){
    this.floor = new Floor({'width': this.radius, 'height': this.radius}, 0);
    this.moon = new Star(200, true);
    this.stars = new Array(80).fill('pending star', 0, 80);

    this.stars.forEach((star, index) => {
      this.stars[index] = new Star(3, false);
    });

    this.clouds = new Clouds(20, 4, 1);
    this.bonfire = new Bonfire({'x': 30, 'y': -15, 'z': 0}, 5, this.scene);
    this.camp = new Camp({'x': 35, 'y': -14.9, 'z': 35}, 20, this.scene);
    this.forest = new Forest(600, {'x': this.radius, 'y': this.radius}, this.scene);
  }

  update(){
    this.floor.update({'x': 0, 'y': -15, 'z': 0});
    this.moon.update({'x': 0, 'y': this.height - 500 , 'z': -1000});
    this.stars.forEach(star => star.update({'x': getRandomInt(-this.radius, this.radius), 'y': getRandomInt(100, this.height), 'z': getRandomInt(-this.radius, this.radius)}));
    this.clouds.update();
  }

  loop(){
    this.clouds.loop();
  }

  render(){
    this.scene.add(this.floor.mesh);
    this.scene.add(this.clouds.mesh);
    this.scene.add(this.moon.mesh);
    this.scene.add(this.moon.light);

    this.stars.forEach(star => {
      this.scene.add(star.mesh);
    });
  }
}

export default Environment;