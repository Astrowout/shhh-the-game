import Scene from '../aspects/Scene.js';
import Environment from '../aspects/Environment.js';
import Lighting from '../aspects/Lighting.js';
import Mechanics from '../aspects/Mechanics.js';
import Enemies from '../aspects/Enemies.js';

export default class Play {
  constructor(){
    this.scene = new Scene(180, 1, 2000);
    this.lighting = new Lighting();
    this.environment = new Environment(2000, 1500, this.scene.scene);
    this.mechanics = new Mechanics(0.18);
  }

  init(){
    this.create();
    this.update();
    this.render();
  }

  create(){
    this.enemies = new Enemies(20, 1000, 50);
    //
    this.scene.create();
    this.lighting.create();
    this.environment.create(this.scene.scene); // TODO: this.scene.scene doorgeven via this.render (promised based models)
    this.mechanics.create();
    this.enemies.create();
  }

  update(){
    this.scene.update();
    this.lighting.update();
    this.environment.update();
    this.mechanics.update();
    this.enemies.update();
  }

  render(){
    this.scene.render();
    this.lighting.render(this.scene.scene);
    this.environment.render(this.scene.scene);
    this.mechanics.render();
    this.enemies.render();
  }

  loop(){
    this.scene.loop();
    this.lighting.loop();
    this.environment.loop();
    this.mechanics.loop();

    if(this.mechanics.VREnabled){
      this.enemies.loop(this.scene.scene, this.mechanics.soundDetected); // TODO: this.scene.scene doorgeven via this.render (promised based models)
    }
  }

  shutdown() {
    //
  }
}
