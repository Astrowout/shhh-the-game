import Colors from './Colors.js';

class Bonfire {
  constructor(position, size, scene) {
    this.position = position;
    this.size = size;
    //
    this.create(scene);
  }

  create(scene){
    const loader = new THREE.GLTFLoader();
    loader.load('../../assets/models/bonfire.glb', model => this.handleLoadModel(model, scene));
    // 
    this.light = new THREE.PointLight(Colors.brightOrange, 10, 200);
  }

  handleLoadModel(model, scene){

    const mat = new THREE.MeshPhongMaterial({
      flatShading: true,
      wireframe: false,
      color: '#FF7200'
    });
    const geo = model.scene.children[0].children[1].geometry;

    this.mesh = new THREE.Mesh(geo, mat);
    
    this.update();
    this.render(scene);
  }

  update(){
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.mesh.scale.set(this.size, this.size - 2, this.size);
    this.light.position.set(this.position.x, this.position.y + 2, this.position.z);
  }

  render(scene){
    scene.add(this.mesh);
    scene.add(this.light);
  }
}

export default Bonfire;