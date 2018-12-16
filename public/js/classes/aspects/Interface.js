import Colors from '../Colors.js';

import Heart from '../objects/Heart.js';

export default class Interface {
    constructor() {
        this.heart = new Heart({'x': -8, 'y': 8, 'z': -15}, 0.03);
    }

    create(scene){
        this.heart.create(scene);
    }

    update(){
        //
    }

    render(scene){
        //
    }

    loop(){
        //
    }
  }