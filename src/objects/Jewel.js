import Phaser from "phaser";

class Jewel extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, value) {
    let texture = "";

    switch (value) {
      case 1:
        texture = "blue";
        break;

      case 2:
        texture = "green";
        break;

      case 3:
        texture = "purple";
        break;

      case 4:
        texture = "red";
        break;

      case 5:
        texture = "yellow";
        break;

      default:
        texture = "blue";
        value = 1;
        break;
    }

    super(scene, x, y, texture);
    this.scale = 0.5;
    this.setOrigin(0, 0);
    this.value = value;
  }

  tweenPosition(toX, toY) {
    this.scene.tweens.add({
      targets: this,
      y: toY,
      x: toX,
      duration: 200,
      ease: "Power2",
      onComplete: () => {}
    });
  }
}

export default Jewel;
