import Colors from './Colors.js';
import Tree from './Tree.js';
//
import {getRandomInt} from '../libs/lib.js';

class Forest {
  constructor(amount, dimensions, scene) {
    this.amount = amount;
    this.dimensions = dimensions;
    //
    this.create(scene);
  }

  create(scene){
    this.trees = new Array(this.amount).fill('pending tree', 0, this.amount);
  }

  update(scene){
    this.trees.forEach((tree, index) => {
      const randomDistance = getRandomInt(120, 1000);
      const randomAngle = getRandomInt(0, 2 * Math.PI);
      this.trees[index] = new Tree({'x': (randomDistance * Math.cos(randomAngle)), 'y': -10, 'z': (randomDistance * Math.sin(randomAngle))}, getRandomInt(15, 30), scene);
    });
  }
}

export default Forest;