import Colors from './Colors.js';

class Sky {
  constructor() {

    const geom = new THREE.SphereGeometry(10000, 250, 250);

    const mat = new THREE.MeshPhongMaterial({
      color: Colors.purpleLight,
      side: THREE.DoubleSide,
      wireframe: false,
      flatShading: true
    });

    this.mesh = new THREE.Mesh(geom, mat);

    //geom.applyMatrix(new THREE.Matrix4().makeRotationX(1.6));
    //geom.mergeVertices();

    /*
    const geom = new THREE.PlaneGeometry(8000, 8000, 100, 100);
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(1.6));
    geom.mergeVertices();

    geom.vertices.forEach(vertex => {
      vertex.x += Math.cos(Math.random() * Math.PI * 2) * (Math.random() * 15 + 5);
      vertex.y += Math.sin(Math.random() * Math.PI * 2) * (Math.random() * 15 + 5);
    })

    const mat = new THREE.MeshPhongMaterial({color: '#5F7837', side: THREE.DoubleSide, wireframe: false, flatShading: true})
    this.mesh = new THREE.Mesh(geom, mat);
    */
  }
}

export default Sky;