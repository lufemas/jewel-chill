import Phaser from "phaser";

// import Jewel from "./objects/Jewel";
import Block from "./objects/Block";
import Grid from "./objects/Grid";

let command = "";
let score = 0;

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "Game" });
  }
  create() {
    this.add.sprite(150, 400, "game-bg");

    this.scoreText = this.add
      .text(100, 690, `${score}`)
      .setColor("0x000000")
      .setFontStyle("bold")
      .setFontFamily("Arial")
      .setFontSize(24);
    this.inputHandler();
    this.isPressed = false;
    this.isMatching = false;
    // const purple = this.add.image(0, 0, "purple");
    // purple.scale = 0.5;

    // const purple = new Jewel(this, 0, 0);
    // this.add.existing(purple);

    this.block = new Block(this);
    this.block.add();

    this.grid = new Grid(this, 0, 0);

    this.scoreSfx = this.sound.add("score-sfx");
    this.bgMusic = this.sound
      .add("bg-music", { loop: true, volume: 0.3 })
      .play();
  }

  update(dt) {
    if (command === "PAUSE") {
      this.scene.pause();
      command = "";
      // setTimeout(() => {
      //   this.scene.resume();
      // }, 2000);
    }

    if (!this.isMatching) {
      if (command) {
        this.block.action(command, this.grid.canSideMove(this.block));
        command = "";
      }
      this.block.fall();

      if (this.grid.collides(this.block, this)) {
        this.block.add();
        this.grid.checkMatch();
        if (this.grid.score > score) this.scoreSfx.play();
        score = this.grid.score;
        this.scoreText.text = `${score}`;
      }
    }
  }

  inputHandler() {
    this.input.on("pointerdown", function(pointer) {
      if (!this.isPressed) {
        console.log("down");
        this.downX = pointer.x;
        this.downY = pointer.y;
        this.isPressed = true;
      }
    });

    this.input.on("pointerup", function(pointer) {
      if (this.isPressed) {
        console.log("up");
        this.upX = pointer.x;
        this.upY = pointer.y;
        this.isPressed = false;
        if (this.upX < this.downX - 10) {
          // console.log("swipeleft");
          command = "LEFT";
        } else if (this.upX > this.downX + 10) {
          // console.log("swiperight");
          command = "RIGHT";
        } else if (this.upY < this.downY - 10) {
          // console.log("swipeup");
        } else if (this.upY > this.downY + 10) {
          // console.log("swipedown");
        } else if (this.upY === this.downY) {
          // console.log("touch");
          command = "CHANGE";
        }
      }
    });

    this.input.keyboard.on("keydown", function(event) {
      // console.log(event.key);

      if (event.key === "ArrowLeft") {
        command = "LEFT";
      } else if (event.key === "ArrowRight") {
        command = "RIGHT";
      }

      if (event.key === "ArrowUp") {
        command = "CHANGE";
      }

      if (event.key === "ArrowDown") {
        // command = "PAUSE";
      }
    });
  }
}

export default Game;
