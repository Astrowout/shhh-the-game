let mixer,
clock = new THREE.Clock();

class Bird {
  constructor(enemy, speed, position) {
    this.enemy = enemy;
    this.speed = speed;
    this.position = position;
    //

    this.create();
  }

  create() {
    const material = new THREE.MeshNormalMaterial({ skinning: true });
    this.enemy.scene.children[0].children[2].material = material;
    const geometry = this.enemy.scene.children[0].children[2].geometry;
    //
    this.mesh = new THREE.Mesh(geometry, material);

    //create animation
    mixer = new THREE.AnimationMixer(this.enemy.scene);
    let clip = THREE.AnimationClip.findByName(this.enemy.animations, "ArmatureAction");
    let mixerAction = mixer.clipAction(clip);
    mixerAction.play();
  }

  update(position) {
    if (!this.position) {
      this.position = position;
    }
    //
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
  }

  loop() {
    let dt = clock.getDelta();
    if (mixer) {
      mixer.update(dt)
    }
  }
}

export default Bird