import Cloud from "./Cloud.js";

class Clouds {
  constructor(amount, size, speed) {
    this.amount = amount;
    this.size = size;
    this.speed = speed;
    //
    this.create();
  }

  create(){
    this.mesh = new THREE.Object3D();
    this.mesh.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 2));
    //
    this.clouds = new Array(this.amount).fill('pending cloud', 0, this.amount);
    //
    this.clouds.forEach((cloud, index) => {
      this.clouds[index] = new Cloud(this.size / 4 , this.speed * 3);
    });
  }

  update(){
    this.clouds.forEach((cloud, index) => {
      const stepAngle = Math.PI * 2 / this.clouds.length;
      const a = stepAngle * index;
      const h = 1100 + Math.random() * 40;
      cloud.mesh.position.y = Math.sin(a) * 1500;
      cloud.mesh.position.x = Math.cos(a) * h;
      cloud.mesh.rotation.z = a + Math.PI / 2;
      cloud.mesh.position.z = -400 - Math.random() * 400;
    
      const s = 1 + Math.random() * this.size;
      cloud.mesh.scale.set(s, s, s);
      this.mesh.add(cloud.mesh);
    })
  }

  loop(){
    this.clouds.forEach(cloud => {
      cloud.loop();
      this.mesh.rotation.z += this.speed / 10000;
    })
  }

  render(scene){
    scene.add(this.mesh);
  }
}

export default Clouds;