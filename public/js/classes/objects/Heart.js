import Colors from "../Colors.js";

class Heart {
  constructor(position, size) {
    this.position =  position;
    this.size = size;
  }

  create(scene){
    const loader = new THREE.GLTFLoader();
    loader.load('../../../assets/models/heart.glb', model => this.handleLoadModel(model, scene));
  }

  handleLoadModel(model, scene){

    const mat = new THREE.MeshPhongMaterial({
      flatShading: true,
      wireframe: false,
      color: Colors.redDark
    });
    const geo = model.scene.children[0].children[0].children[0].children[0].children[0].geometry;

    this.mesh = new THREE.Mesh(geo, mat);
    
    this.update(scene);
  }

  update(scene){
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.mesh.scale.set(this.size, this.size, this.size);
    this.mesh.rotation.x -= 2;
    //
    this.render(scene)
  }

  render(scene){
    scene.add(this.mesh);
  }
}

export default Heart;