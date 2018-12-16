
class Bird {
  constructor(position, scale, speed, entry, scene) {
    this.position = position;
    this.scale = scale;
    this.entry = entry;
    this.speed = speed;
    this.scene = scene;
    //
    this.scared = false;
    //
    this.create(scene);
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
    mixerAction.setDuration(0.6).play();

    this.update(scene);
  }

  update(scene) {
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.mesh.rotation.y = -this.entry - Math.PI / 2;;
    this.mesh.scale.set(this.scale, this.scale, this.scale);

    this.render(scene);
  }

  loop() {
    if(this.mesh){
      if(this.mixer){
        let dt = this.clock.getDelta();
        this.mixer.update(dt)
      }

      if(!this.scared){
        this.mesh.position.x -= this.mesh.position.x * (this.speed * 0.02);
        this.mesh.position.z -= this.mesh.position.z * (this.speed * 0.02);
        this.mesh.position.y -= this.mesh.position.y * (this.speed * 0.01);
      }else{
        console.log("DEBUG: Enemie scared");
        //
        this.mesh.rotation.y =  -this.entry + Math.PI / 2;
        this.mesh.position.x += this.mesh.position.x * (this.speed * 0.07);
        this.mesh.position.z += this.mesh.position.z * (this.speed * 0.07);
        this.mesh.position.y += this.mesh.position.y * (this.speed * 0.05);
      }
    }
  }

  render(scene){
    scene.add(this.mesh);
  }

  kill(scene){
    scene.remove(this.mesh);
  }
}

export default Bird