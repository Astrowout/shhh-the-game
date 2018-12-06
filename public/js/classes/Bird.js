
class Bird {
  constructor(position, size, entry, scene) {
    this.position = position;
    this.size = size;
    this.entry = entry;
    //
    this.create(scene)
  }

  create(scene) {
    const loader = new THREE.GLTFLoader();
    loader.load("../assets/models/bird.glb", model => this.handleLoadModel(model, scene));
  }

  handleLoadModel(model, scene){

    // model
    const mat = new THREE.MeshNormalMaterial({
      skinning: true
    });
    this.mesh = model.scene;
    this.mesh.children[0].children[2].material = mat;

    // animation
    this.mixer = new THREE.AnimationMixer(this.mesh);
    this.clock = new THREE.Clock();
    let clip = model.animations[0];
    let mixerAction = this.mixer.clipAction(clip);
    mixerAction.setDuration(0.8).play();

    this.update();
    this.render(scene);
  }

  update() {
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.mesh.rotation.y = -this.entry - Math.PI / 2; // set rotation to player
    this.mesh.scale.set(this.size, this.size, this.size);
  }

  loop() {
    if (this.mixer) {
      let dt = this.clock.getDelta();
      this.mixer.update(dt)
      
      this.mesh.position.x += this.mesh.position.x * -0.01;
      this.mesh.position.z += this.mesh.position.z * -0.01;
      this.mesh.position.y += this.mesh.position.y * -0.002;
    }
  }
  
  render(scene){
    scene.add(this.mesh);
  }
}

export default Bird