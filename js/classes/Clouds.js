import Cloud from "./Cloud.js";

let c;

class Clouds {
  constructor() {
    this.mesh = new THREE.Object3D();
    this.mesh.applyMatrix(new THREE.Matrix4().makeRotationX(1.6));

    this.nClouds = 20;

    const stepAngle = Math.PI * 2 / this.nClouds;

    for (let i = 0; i < this.nClouds; i++) {
      c = new Cloud();

      const a = stepAngle * i;
      const h = 1100 + Math.random() * 40;

      c.mesh.position.y = Math.sin(a) * h;
      c.mesh.position.x = Math.cos(a) * h;
      c.mesh.rotation.z = a + Math.PI / 2;
      c.mesh.position.z = -400 - Math.random() * 400;

      const s = 1 + Math.random() * 6;
      c.mesh.scale.set(s, s, s);

      this.mesh.add(c.mesh);
    }
  }

  move() {
    c.moveCloud();
    this.mesh.rotation.z += 0.001;
  }
}

export default Clouds;