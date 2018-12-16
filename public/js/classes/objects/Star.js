import Colors from "../Colors.js";

class Star {
  constructor(radius, isAlluminated, position) {
    this.radius = radius;
    this.isAlluminated = isAlluminated;
    this.position = position;
    //
    this.create();
  }

  create(){
    const geom = new THREE.DodecahedronGeometry(this.radius, 1);
    const mat = new THREE.MeshBasicMaterial({
      color: Colors.white,
      flatShading: true
    });
    //
    this.mesh = new THREE.Mesh(geom, mat);

    if(this.isAlluminated){
      this.light = new THREE.PointLight(Colors.white, .3, 0, 2);
    }
  }

  update(position){
    if(!this.position){
      this.position = position;
    }
    //
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);

    if(this.isAlluminated){
      this.light.position.set(this.position.x, this.position.y, this.position.z);
    }
  }

  render(scene){
    scene.add(this.mesh);

    if(this.isAlluminated){
      scene.add(this.light);
    }
  }
}

export default Star;
