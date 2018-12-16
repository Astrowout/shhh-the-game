import Colors from '../Colors.js';

class Tree {
  constructor(position, size, scene) {
    this.position = position;
    this.size = size;
    //
    this.create(scene);
  }

  create(scene){
    const loader = new THREE.GLTFLoader();
    loader.load('../../../assets/models/tree.glb', model => this.handleLoadModel(model, scene));
  }

  handleLoadModel(model, scene){
    const mat = new THREE.MeshPhongMaterial({
      flatShading: true,
      color: Colors.greenDark
    });
    const geo = model.scene.children[4].children[0].geometry;

    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    //
    this.update(scene);
  }

  update(scene){
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.mesh.scale.set(this.size, this.size, this.size);
    //
    this.render(scene);
  }

  render(scene){
    scene.add(this.mesh);
  }
}

export default Tree;