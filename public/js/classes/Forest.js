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

    this.trees.forEach((star, index) => {
      this.trees[index] = new Tree({'x': (getRandomInt(-this.dimensions.x, this.dimensions.x)/7), 'y': -10, 'z': (getRandomInt(-this.dimensions.y, this.dimensions.y))/7}, getRandomInt(15, 30), scene);
    });
  }

  update(){
    this.trees.forEach(tree => {
      //tree.update({'x': getRandomInt(-this.dimensions.x, this.dimensions.x), 'y': 0, 'z': getRandomInt(-this.dimensions.y, this.dimensions.y)});
    });
  }
}

export default Forest;