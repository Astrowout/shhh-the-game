import Colors from './Colors.js';

class Sky {
  constructor(radius) {
    this.radius = radius;
    //
    this.create()
  }

  create(){
    const geom = new THREE.SphereGeometry(this.radius, 255, 255);

    const mat = new THREE.MeshPhongMaterial({
      color: Colors.purpleLight,
      side: THREE.DoubleSide,
      wireframe: false,
      flatShading: true
    });
    //
    this.mesh = new THREE.Mesh(geom, mat);
  }

  update(){
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
  }
}

export default Sky;