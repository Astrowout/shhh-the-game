
class Bird {
  constructor(position, scale, speed, entry, enemiesIntersected, scene) {
    this.position = position;
    this.scale = scale;
    this.entry = entry;
    this.speed = speed;
    this.enemiesIntersected = enemiesIntersected;
    this.scene = scene;
    //
    this.collision = false;
    this.scared = false;
    this.valued = false;
    //
    this.object;
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

    //define object for enemiesIntersected
    this.object = model.scene.children[0];

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

  loop(scene) {
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
        console.log("DEBUG: Enemy scared");
        //
        this.mesh.rotation.y =  -this.entry + Math.PI / 2;
        this.mesh.position.x += this.mesh.position.x * (this.speed * 0.07);
        this.mesh.position.z += this.mesh.position.z * (this.speed * 0.07);
        this.mesh.position.y += this.mesh.position.y * (this.speed * 0.05);
      }

      if(this.coin){
        this.coin.loop();
      }

      if(Math.abs(this.mesh.position.x) < 10 && Math.abs(this.mesh.position.z) < 10){
        console.log("DEBUG: Enemy collided with player");
        //
        this.collision = true;
      }
    }
  }

  render(scene){
    scene.add(this.mesh);
    this.enemiesIntersected.push(this.object);
  }

  kill(scene){
    scene.remove(this.mesh);
    this.enemiesIntersected.splice(this.object, 1);
  }
}

export default Bird