import Colors from './Colors.js';

class Floor {
  constructor(size, relief, position) {
    this.size = size;
    this.relief = relief;
    this.position = position;
    //
    this.create();
  }

  create(){
    const geom = new THREE.PlaneGeometry(this.size.width, this.size.height, this.size.width / (this.size.width / 100), this.size.height / (this.size.height / 100));
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(1.6));
    geom.mergeVertices();

    geom.vertices.forEach(vertex => {
      vertex.x += Math.cos(Math.random() * Math.PI * 2) * (Math.random() * 10 + this.relief);
      vertex.y += Math.sin(Math.random() * Math.PI * 2) * (Math.random() * 10 + this.relief);
    });

    const mat = new THREE.MeshPhongMaterial({
      color: Colors.greenLight,
      side: THREE.DoubleSide,
      wireframe: false,
      flatShading: true
    })
    //
    this.mesh = new THREE.Mesh(geom, mat);
  }

  update(position){
    if(!this.position){
      this.position = position;
    }
    //
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
  }
}

export default Floor;