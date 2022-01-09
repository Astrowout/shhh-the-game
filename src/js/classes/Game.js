import Boot from './states/Boot.js';
import Preload from './states/Preload.js';
import Instructions from './states/Instructions.js';
import Leaderboard from './states/Leaderboard.js';
import Menu from './states/Menu.js';
import Play from './states/Play.js';

export default class Game {
  constructor() {
    this.play = new Play();
  }
}