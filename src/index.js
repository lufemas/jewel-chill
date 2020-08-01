import Phaser from "phaser";

import config from "./config";
import Preload from "./Preload";
import StartMenu from "./StartMenu";
import Game from "./Game";

var gameConfig = Object.assign(config, {
  scene: [Preload, StartMenu, Game]
});

var game = new Phaser.Game(gameConfig);
