import Colors from '../Colors.js';

import Heart from '../objects/Heart.js';

export default class Interface {
    constructor(amount) {
        this.amount = amount;
    }

    create(scene){
        console.log("DEBUG: Game started");
        //
        this.lifes = new Array(this.amount).fill('pending life', 0, this.amount);
        this.lifes.forEach((life, index) => {
            const space = 3;
            this.lifes[index] = new Heart({'x': -6 + (index * space), 'y': -10, 'z': -11}, 0.025);
        });

        this.lifes.forEach(life => {life.create(scene)});
    }

    update(scene, amount){
        scene.remove(this.lifes[amount].mesh);
        this.lifes.splice(amount, 1);
    }

    render(scene){
        //
    }

    loop(){
    }
  }