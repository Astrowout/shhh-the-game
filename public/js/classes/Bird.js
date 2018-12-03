let mixer,
    clock = new THREE.Clock();

class Bird {
  constructor(scene) {
    this.scene = scene;
    // this.position = position;
    //

    this.load();
  }

  load() {
    const loader = new THREE.GLTFLoader();
    loader.load("../assets/bird.glb", loadedModel => this.create(loadedModel));
  }

  create(bird) {
    const material = new THREE.MeshNormalMaterial({ skinning: true });
    bird.scene.children[0].children[2].material = material;
    this.scene.add(bird.scene);

    //create animation
    mixer = new THREE.AnimationMixer(bird.scene);
    let clip = bird.animations[0];
    let mixerAction = mixer.clipAction(clip);
    mixerAction.setDuration(0.8).play();
  }

  update(position) {
    if (!this.position) {
      this.position = position;
    }
    //
    this.enemy.position.set(this.position.x, this.position.y, this.position.z);
  }

  loop() {
    let dt = clock.getDelta();
    if (mixer) {
      mixer.update(dt)
    }
  }
}


export default Bird