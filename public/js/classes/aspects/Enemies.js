import Bird from '../objects/Bird.js';
//
import { getRandomInt } from "../../libs/lib.js";

class Enemies {
  constructor(amount, dimension, seed) {
    this.amount = amount;
    this.dimension = dimension;
    this.seed = seed;
    this.birds = [];
    //
    this.collision = false;
  }

  create(){
    //
  }

  update(){
    //
  }

  render(){
    //
  }

  loop(scene, enemiesIntersected, time) {
    
    if(this.birds.length < this.amount + Math.floor(0.1 * time)){
      const seed = getRandomInt(0, this.seed);

      if(seed < 1){
        console.log('DEBUG: Enemy spawned')
        //
        const distanceOrigin = this.dimension / 2;
        const randomAngle = getRandomInt(0, 2 * Math.PI);
        this.birds.push(new Bird({'x': distanceOrigin * Math.cos(randomAngle), 'y': 25, 'z': distanceOrigin * Math.sin(randomAngle)}, 5, 1, randomAngle, enemiesIntersected, scene));
      }
    }
    
    this.birds.forEach((bird, index) => {
      bird.loop(scene);

      if(bird.mesh){
        if(Math.abs(bird.position.x) < Math.abs(bird.mesh.position.x) && Math.abs(bird.position.z) < Math.abs(bird.mesh.position.z)){
          this.kill(bird, index, scene);
        }
      }
    });


    // EVENTS

    this.birds.forEach((bird, index) => {
      if(bird.collision){
        this.collision = true;
        this.kill(bird, index, scene);
      }
    })
  }

  kill(bird, index, scene){
    console.log("DEBUG: Enemy erased from array");
    //
    this.birds.splice(index, 1);
    bird.kill(scene);
  }

  killAll(scene){
    this.birds.forEach(bird => {bird.kill(scene)});
    this.birds = new Array(0);
  }
}

export default Enemies;