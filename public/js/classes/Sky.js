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
      flatShading: true
    });
    //
    this.mesh = new THREE.Mesh(geom, mat);
  }
}

export default Sky;