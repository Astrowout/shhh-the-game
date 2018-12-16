import Floor from '../objects/Floor.js';
import Clouds from '../objects/Clouds.js';
import Star from '../objects/Star.js';
import Bonfire from '../objects/Bonfire.js';
import Forest from '../objects/Forest.js';
import Camp from '../objects/Camp.js';

import {getRandomInt} from "../../libs/lib.js";

class Environment {
  constructor(radius, height, scene) {
    this.radius = radius;
    this.height = height;
    this.scene = scene;
    //
    this.floor = new Floor({'width': this.radius, 'height': this.radius}, 0);
    this.moon = new Star(200, true);
    
    this.stars = new Array(80).fill('pending star');
    this.stars.forEach((star, index) => {this.stars[index] = new Star(3, false)});
    
    this.forest = new Forest(600, {'x': this.radius, 'y': this.radius}, this.scene);
    this.clouds = new Clouds(20, 4, 1);
    this.bonfire = new Bonfire({'x': 30, 'y': -15, 'z': 0}, 5);
    this.camp = new Camp({'x': 35, 'y': -14.9, 'z': 35}, 20);
  }

  create(scene){
    this.floor.create();
    this.moon.create();
    //
    this.stars.forEach(star => {
      star.create()
    });
    //
    this.clouds.create();

    this.createWithPromise(scene);
  }

  createWithPromise(scene){
    this.bonfire.create(scene);
    this.camp.create(scene);
  }

  update(){
    this.floor.update({'x': 0, 'y': -15, 'z': 0});
    this.moon.update({'x': 0, 'y': this.height - 500 , 'z': -1000});
    this.stars.forEach(star => star.update({'x': getRandomInt(-this.radius, this.radius), 'y': getRandomInt(100, this.height), 'z': getRandomInt(-this.radius, this.radius)}));
    this.clouds.update();
  }

  render(scene){
    this.floor.render(scene);
    this.clouds.render(scene);
    this.moon.render(scene);

    this.stars.forEach(star => {
      star.render(scene);
    });
  }

  loop(){
    this.clouds.loop();
  }
}

export default Environment;