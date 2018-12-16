import Colors from "../Colors.js";

class Text {
  constructor(message, position, size) {
    this.message = message;
    this.position =  position;
    this.size = size;
  }

  create(scene){
    const loader = new THREE.FontLoader();
    loader.load('../../../assets/fonts/bowlbyOne/bowlbyOne.json', font => this.handleLoadFont(font, scene));
  }

  handleLoadFont(font, scene){

    const mat = new THREE.MeshPhongMaterial({
      flatShading: true,
      wireframe: false,
      color: Colors.redDark
    });

    const geo = new THREE.TextGeometry(this.message,{
      font: font,
      size: this.size,
      height: 1
    });

    this.mesh = new THREE.Mesh(geo, mat);
    this.update(scene);
  }

  update(scene){
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.mesh.scale.set(this.size, this.size, this.size);
    this.mesh.rotation.y = 4;
    //
    this.render(scene)
  }

  render(scene){
    scene.add(this.mesh);
  }

  kill(scene){
    scene.remove(this.mesh);
  }
}

export default Text;