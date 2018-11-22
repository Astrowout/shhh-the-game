import Colors from './Colors.js';
import Floor from './Floor.js';

class Landscape {
  constructor(scene) {
      this.scene = scene;
      //
      this.floor = new Floor;
      //
      this.init();
      this.addToScene();
  }

  init(){
    this.floor.mesh.position.y = -15;
  }

  addToScene(){
    this.scene.add(this.floor.mesh);
  }
}

export default Landscape;