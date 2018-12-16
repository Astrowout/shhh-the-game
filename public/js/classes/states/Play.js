import Scene from '../aspects/Scene.js';
import Environment from '../aspects/Environment.js';
import Lighting from '../aspects/Lighting.js';
import Mechanics from '../aspects/Mechanics.js';
import Enemies from '../aspects/Enemies.js';
import Interface from '../aspects/Interface.js';

export default class Play {
  constructor(){
    this.scene = new Scene(180, 1, 2000);
    this.lighting = new Lighting();
    this.environment = new Environment(2000, 1500, this.scene.scene);
    this.mechanics = new Mechanics(5, 0, 0.1);
    this.interface = new Interface(this.mechanics.health);
  }

  init(){
    this.create();
    this.update();
    this.render();
  }

  create(){
    this.enemies = new Enemies(5, 1000, 50);
    //
    this.scene.create();
    this.lighting.create();
    this.environment.create(this.scene.scene); // TODO: this.scene.scene doorgeven via this.render (promised based models)
    this.mechanics.create();
    this.enemies.create();
    this.interface.create(this.scene.camera);
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
    this.mechanics.loop(this.enemies, this.scene);


    // EVENTS

    if(this.mechanics.VREnabled){
      this.enemies.loop(this.scene.scene, this.mechanics.soundDetected, this.mechanics.enemiesIntersected); // TODO: this.scene.scene doorgeven via this.render (promised based models)
    }

    if(this.enemies){

      if(this.enemies.scared){
        this.mechanics.score += 10;
        console.log("DEBUG: Points gained. Current points: ", this.mechanics.score);
        this.enemies.scared = false;
      }

      if(this.enemies.collision){
        this.mechanics.health -= 1;
        console.log("DEBUG: Life lost. Current health: ", this.mechanics.health);
        this.enemies.collision = false;
        //
        this.interface.update(this.scene.camera, this.mechanics.health);
      }
    }

    if(this.mechanics.gameOver){
      this.reboot();
    }
  }

  reboot() {
    console.log("DEBUG: Rebooting game");
    //
    this.mechanics.score = 0;
    this.mechanics.health = 5;
    this.mechanics.gameOver = false;
    this.enemies.killAll(this.scene.scene);
    this.interface.create(this.scene.camera);
  }
}
