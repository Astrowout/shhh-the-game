import Colors from './Colors.js';

const loader = new THREE.GLTFLoader();


class Tree {
  constructor(position, size, scene) {
    this.position = position;
    this.size = size;
    //
    this.create(scene);
  }

  create(scene){
    loader.load('../../assets/models/tree.glb', model => this.handleLoadModel(model, scene));
  }

  handleLoadModel(model, scene){

    const mat = new THREE.MeshPhongMaterial({
      flatShading: true,
      color: Colors.greenDark
    });
    const geo = model.scene.children[4].children[0].geometry;

    this.mesh = new THREE.Mesh(geo, mat);

    this.update();
    this.render(scene);
  }

  update(){
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.mesh.scale.set(this.size, this.size, this.size);
  }

  render(scene){
    scene.add(this.mesh);
  }
}

export default Tree;