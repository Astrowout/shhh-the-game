import Colors from './Colors.js';

class Camp {
  constructor(position, size, scene) {
    this.position =  position;
    this.size = size;
    //
    this.create(scene);
  }

  create(scene){
    const loader = new THREE.GLTFLoader();
    loader.load('../../assets/models/camp.glb', model => this.handleLoadModel(model, scene));
  }

  handleLoadModel(model, scene){

    const mat = new THREE.MeshPhongMaterial({
      flatShading: true,
      wireframe: false,
      color: '#FF7200'
    });
    const geo = model.scene.children[0].geometry;

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

export default Camp;