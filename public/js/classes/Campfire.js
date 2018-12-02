import Colors from './Colors.js';

class Campfire {
  constructor(position) {
    this.position = position
    //
    this.create();
  }

  create(){
    // ...
    // 
    this.light = new THREE.PointLight(Colors.brightOrange, 3, 200);
  }

  update(position){
    if(!this.position){
      this.position = position;
    }
    //
    //this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.light.position.set(this.position.x, this.position.y, this.position.z);
  }
}

export default Campfire;