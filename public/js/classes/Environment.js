import Sky from './Sky.js';
import Floor from './Floor.js';
import Clouds from './Clouds.js';
import Star from './Star.js';
import Campfire from './Campfire.js';
import Forest from './Forest.js';
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
    this.sky = new Sky(this.radius);
    this.floor = new Floor({'width': this.radius, 'height': this.radius}, 0);
    this.clouds = new Clouds(20, 5, 1);
    this.moon = new Star(100, true);
    this.stars = new Array(80).fill('pending star', 0, 80);

    this.stars.forEach((star, index) => {
      this.stars[index] = new Star(8, false);
    });

    this.campfire = new Campfire();
    this.forest = new Forest(300, {'x': this.radius, 'y': this.radius}, this.scene);
  }

  update(){
    this.floor.update({'x': 0, 'y': -15, 'z': 0});
    this.moon.update({'x': 0, 'y': this.height - 500 , 'z': -1000});
    this.stars.forEach(star => star.update({'x': getRandomInt(-this.radius, this.radius), 'y': getRandomInt(0, this.height), 'z': getRandomInt(-this.radius, this.radius)}));
    this.clouds.update();
    this.campfire.update({'x': 40, 'y': 0, 'z': 0});
    this.forest.update();
  }

  loop(){
    this.clouds.loop();
  }

  render(){
    this.scene.add(this.sky.mesh);
    this.scene.add(this.floor.mesh);
    this.scene.add(this.clouds.mesh);
    this.scene.add(this.moon.mesh);
    this.scene.add(this.moon.light);
    //this.scene.add(this.campfire.mesh);
    this.scene.add(this.campfire.light);

    this.stars.forEach(star => {
      this.scene.add(star.mesh);
    });
  }
}

export default Environment;