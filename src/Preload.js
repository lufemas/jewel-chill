import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import blueImg from "./assets/blue.png";
import greenImg from "./assets/green.png";
import purpleImg from "./assets/purple.png";
import redImg from "./assets/red.png";
import yellowImg from "./assets/yellow.png";
import bgMusicMp3 from "./assets/bg.mp3";
import bgMusicOgg from "./assets/bg.ogg";
import scoreSfx from "./assets/score.wav";
import gameBg from "./assets/gameBg.png";
import startBg from "./assets/startBg.png";

class Preload extends Phaser.Scene {
  constructor() {
    super({ key: "Preload" });
  }
  preload() {
    this.load.audio("bg-music", [bgMusicMp3, bgMusicOgg]);
    this.load.audio("score-sfx", scoreSfx);
    this.load.image("game-bg", gameBg);
    this.load.image("start-bg", startBg);
    this.load.image("logo", logoImg);
    this.load.image("blue", blueImg);
    this.load.image("green", greenImg);
    this.load.image("purple", purpleImg);
    this.load.image("red", redImg);
    this.load.image("yellow", yellowImg);
  }
  create() {
    this.scene.start("StartMenu");
    this.add.text(100, 395, "Loading...");
  }
}

export default Preload;
