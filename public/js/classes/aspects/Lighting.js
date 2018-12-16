import Colors from '../Colors.js';

export default class Lighting {
    constructor() {
        //
    }

    create(){
        this.hemisphereLight = new THREE.HemisphereLight(Colors.purpleLight, Colors.greenLight);
        this.shadowLight = new THREE.DirectionalLight(0xffffff, .3);
    }

    update(){
        this.shadowLight.position.set(0, 1500, -1000);
        this.shadowLight.castShadow = true;
        //
        this.shadowLight.shadow.camera.left = -500;
        this.shadowLight.shadow.camera.right = 500;
        this.shadowLight.shadow.camera.top = 500;
        this.shadowLight.shadow.camera.bottom = -1000;
        this.shadowLight.shadow.camera.near = 1;
        this.shadowLight.shadow.camera.far = 2000;
        //
        this.shadowLight.shadow.mapSize.width = 2048;
        this.shadowLight.shadow.mapSize.height = 2048;
    }

    render(scene){
        scene.add(this.hemisphereLight);
        scene.add(this.shadowLight);
    }

    loop(){
        //
    }
  }