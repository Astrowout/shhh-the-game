
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
      color: '#C03B36'
    });
    const geo = model.scene.children[0].children[0].children[0].children[0].children[0].geometry;

    this.mesh = new THREE.Mesh(geo, mat);
    
    this.update(scene);
  }

  update(scene){
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.mesh.scale.set(this.size, this.size, this.size);
    this.mesh.rotation.x -= 1;
    //
    this.render(scene)
  }

  render(scene){
    console.log(scene, this.mesh);
    scene.add(this.mesh);
  }
}

export default Heart;