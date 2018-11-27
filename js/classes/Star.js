import Colors from "./Colors.js";

class Star {
  constructor(scene, size, pos, light) {

    const geom = new THREE.DodecahedronGeometry(size, 1);
    const mat = new THREE.MeshBasicMaterial({
      color: '#FFF6E0',
      flatShading: true
    });

    if(light){
      const light = new THREE.PointLight('#FFF6E0', 3, size*10);
      light.position.set(pos.x, pos.y, pos.z);
      scene.add(light);
    }

    this.mesh = new THREE.Mesh(geom, mat);
    scene.add(this.mesh);
    this.init(pos);
  }

  init(pos){
    this.mesh.position.set(pos.x, pos.y, pos.z);
    
  }
}

export default Star;
