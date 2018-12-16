import Colors from "../Colors.js";

let blocks = [];

class Cloud {
  constructor(size, speed) {
    this.size = size;
    this.speed = speed;
    //
    this.create();
  }

  create(){
    this.mesh = new THREE.Object3D();
    const geom = new THREE.DodecahedronGeometry(15, 0);
    const mat = new THREE.MeshLambertMaterial({
      color: Colors.purpleLight,
    });

    let nBlocs = 3 + Math.floor(Math.random() * 3);

    for (let i = 0; i < nBlocs; i++) {
     let m = new THREE.Mesh(geom, mat);
      
      m.position.x = i*15;
      m.position.y = Math.random()*10;
      m.position.z = Math.random()*10;
      m.rotation.z = Math.random()*Math.PI*2;
      m.rotation.y = Math.random()*Math.PI*2;
      
      let s = .8 + Math.random()*this.size;
      m.scale.set(s,s,s);
      
      m.receiveShadow = true;
      
      this.mesh.add(m);
      blocks.push(m);
    }
  }

  loop() {
    blocks.forEach(block => {
      block.rotation.z += this.speed / 10000;
    });
  }
}

export default Cloud