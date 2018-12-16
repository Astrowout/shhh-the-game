import Colors from '../Colors.js';

import Heart from '../objects/Heart.js';

export default class Interface {
    constructor(amount) {
        this.amount = amount;

        this.geometry = new THREE.PlaneGeometry(80, 80);
        this.material = new THREE.MeshBasicMaterial({ color: Colors.redDark, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
        this.flashOverlay = new THREE.Mesh(this.geometry, this.material);
    }

    create(scene){
        console.log("DEBUG: Game started");
        //
        this.lifes = new Array(this.amount).fill('pending life', 0, this.amount);
        this.lifes.forEach((life, index) => {
            const space = 1;
            this.lifes[index] = new Heart({'x': -2 + (index * space), 'y': -5, 'z': -10}, 0.01);
        });

        this.lifes.forEach(life => {life.create(scene)});

        this.flashOverlay.position.set(0, 0, -5)
    }

    update(scene, amount){
        scene.remove(this.lifes[amount].mesh);
        scene.add(this.flashOverlay);
        window.setTimeout(() => scene.remove(this.flashOverlay), 100);
        this.lifes.splice(amount, 1);
    }

    render(scene){
        //
    }

    loop(){
    }
  }