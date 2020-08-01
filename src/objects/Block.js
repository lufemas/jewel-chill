import Phaser from "phaser";
import Jewel from "./Jewel";

class Block extends Phaser.GameObjects.GameObject {
  constructor(scene) {
    super(scene, "Block");

    this.restart();

    // this.
  }

  rndJewel() {
    return Math.floor(Math.random() * 5 + 1);
  }

  add() {
    this.jewels.forEach(jewel => this.scene.add.existing(jewel));
  }

  setPosition(x, y) {
    this.position.x = x;
    this.position.y = y;
    this.gridPosition.x = Math.ceil(x / 50);
    this.gridPosition.y = Math.ceil(y / 50);
  }

  update() {}

  updateAllPos() {
    this.jewels.forEach((jewel, ind) =>
      jewel.setPosition(this.position.x, this.position.y + ind * 54)
    );

    this.gridPosition.x = Math.ceil(this.position.x / 50);
    this.gridPosition.y = Math.ceil(this.position.y / 50);
  }

  fall() {
    this.position.y += 1;
    this.updateAllPos();
  }

  action(command, freeSides) {
    if (!this.isMoving) {
      if (command === "RIGHT" && freeSides.right) {
        this.isMoving = true;

        this.scene.tweens.add({
          targets: this.position,
          x: this.position.x + 50,
          duration: 150,
          ease: "Power2",
          onComplete: () => {
            this.isMoving = false;
            // this.updateAllPos();
          }
        });
      } else if (command === "LEFT" && freeSides.left) {
        this.isMoving = true;

        this.scene.tweens.add({
          targets: this.position,
          x: this.position.x - 50,
          duration: 150,
          ease: "Power2",
          onComplete: () => {
            this.isMoving = false;
            // this.updateAllPos();
          }
        });
      }
    }

    if (command === "CHANGE") this.changeOrder();
  }

  restart() {
    const gridX = Math.floor(Math.random() * 6);
    const gridY = -4;
    const x = gridX * 50;
    const y = gridY * 50;

    this.position = { x, y };
    this.gridPosition = { x, y };
    this.gridPosition.x = gridX;
    this.gridPosition.y = gridY;

    const jewelsValues = [this.rndJewel(), this.rndJewel(), this.rndJewel()];
    // const jewelsValues = [1, 1, 1];

    this.jewels = [];

    jewelsValues.forEach((value, ind) => {
      this.jewels.push(new Jewel(this.scene, x, y + ind * 54, value));
    });

    this.isMoving = false;
  }

  changeOrder() {
    this.jewels.unshift(this.jewels.pop());
  }
}

export default Block;
