import Phaser from "phaser";

class StartMenu extends Phaser.Scene {
  constructor() {
    super({ key: "StartMenu" });
  }
  create() {
    // const logo = this.add.image(400, 150, "logo");
    // this.tweens.add({
    //   targets: logo,
    //   y: 450,
    //   duration: 2000,
    //   ease: "Power2",
    //   yoyo: true,
    //   loop: -1
    // });

    this.add.sprite(150, 400, "start-bg");

    this.add
      .text(
        30,
        230,
        `
Keyboard:
ARROW LEFT to move left 
ARROW RIGHT to move right
ARROW UP to change order
      
Touch Screen:
SWIPE to move
Touch to change order

      
Press any key to Start`
      )
      .setColor("0x000000")
      .setFontStyle("bold")
      .setFontFamily("Arial");

    this.input.on("pointerdown", () => this.scene.start("Game"));
    this.input.on("keydown", () => this.scene.start("Game"));
  }
}

export default StartMenu;
