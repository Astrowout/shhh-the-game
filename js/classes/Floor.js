import Colors from './Colors.js';

class Floor {
  constructor() {

    const geom = new THREE.PlaneGeometry(8000, 8000, 100, 100);
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(1.6));
    geom.mergeVertices();

    geom.vertices.forEach(vertex => {
      vertex.x += Math.cos(Math.random() * Math.PI * 2) * (Math.random() * 15 + 5);
      vertex.y += Math.sin(Math.random() * Math.PI * 2) * (Math.random() * 15 + 5);
    });

    const mat = new THREE.MeshPhongMaterial({
      color: Colors.greenLight,
      side: THREE.DoubleSide,
      wireframe: false,
      flatShading: true
    })
    this.mesh = new THREE.Mesh(geom, mat);
  }
}

export default Floor;