import Colors from '../Colors.js';

class Bonfire {
  constructor(position, size) {
    this.position = position;
    this.size = size;
  }

  create(scene){
    const loader = new THREE.GLTFLoader();
    loader.load('../../../assets/models/bonfire.glb', model => this.handleLoadModel(model, scene));
    // 
    this.light = new THREE.PointLight(Colors.redLight, 10, 200);
  }

  handleLoadModel(model, scene){

    const mat = new THREE.MeshPhongMaterial({
      flatShading: true,
      wireframe: false,
      color: Colors.orange
    });
    const geo = model.scene.children[0].children[1].geometry;

    this.mesh = new THREE.Mesh(geo, mat);
    //
    this.update(scene);
  }

  update(scene){
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.mesh.scale.set(this.size, this.size - 2, this.size);
    this.light.position.set(this.position.x, this.position.y + 2, this.position.z);
    //
    this.render(scene);
  }

  render(scene){
    scene.add(this.mesh);
    scene.add(this.light);
  }
}

export default Bonfire;