import Tree from './Tree.js';
//
import {getRandomInt} from '../../libs/lib.js';

class Forest {
  constructor(amount, dimensions, scene) {
    this.amount = amount;
    this.dimensions = dimensions;
    this.trees = new Array(this.amount).fill('tree pending', 0, this.amount);
    //
    this.create(scene);
  }

  create(scene){
    this.trees.forEach((tree, index) =>  {
      const distanceOrigin = getRandomInt(100, this.dimensions.x)
      const randomAngle = getRandomInt(0, 2 * Math.PI);

      this.trees[index] = new Tree({
        'x': (distanceOrigin * Math.cos(randomAngle)),
        'y': -10,
        'z': (distanceOrigin * Math.sin(randomAngle))
      }, getRandomInt(15, 30), scene)
    });
  }

  update(){
    //this.trees.forEach(tree => tree.update());
    //this.render(scene);
  }

  render(scene){
    //scene.add(this.mesh);
    //this.trees.forEach(tree => {tree.render(scene)});
  }
}

export default Forest;