
class Bird {
  constructor(scene, position, angle) {
    this.scene = scene;
    this.position = position;
    this.angle = angle;
    //

    this.load();
  }

  load() {
    const loader = new THREE.GLTFLoader();
    loader.load("../assets/bird.glb", loadedModel => this.create(loadedModel));
  }

  create(bird) {
    const mat = new THREE.MeshNormalMaterial({ skinning: true });
    bird.scene.children[0].children[2].material = mat;
    // const geo = bird.scene.children[0].children[2].geometry;
    this.scene.add(bird.scene);

    this.bird = bird.scene;

    //create animation
    this.mixer = new THREE.AnimationMixer(bird.scene);
    let clip = bird.animations[0];
    let mixerAction = this.mixer.clipAction(clip);
    mixerAction.setDuration(0.8).play();

    this.clock = new THREE.Clock();

    this.update();
  }

  update() {
    if (!this.position) {
      this.position = position;
    }
    this.bird.position.set(this.position.x, this.position.y, this.position.z);

    //set rotation to centerpoint
    this.bird.rotation.y = -this.angle - Math.PI / 2;
  }

  loop() {
    if (this.mixer) {
      let dt = this.clock.getDelta();
      this.mixer.update(dt)
      // console.log(this.mixer);
      
      this.bird.position.x += this.bird.position.x * -0.01;
      this.bird.position.z += this.bird.position.z * -0.01;

      //dive to player
      this.bird.position.y += this.bird.position.y * -0.002;
    }
  }
}


export default Bird