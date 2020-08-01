import Phaser from "phaser";
import Jewel from "./Jewel";

class jwGrid extends Phaser.GameObjects.GameObject {
  constructor(scene, score) {
    super(scene, "jwGrid");
    this.score = score;
    /*
0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0,
*/

    this.grid = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];
    this.jewelGrid = [...this.grid];

    // const jewelsValues = [this.rndJewel(), this.rndJewel(), this.rndJewel()];

    // this.jewels = [];

    // jewelsValues.forEach((value, ind) => {
    //   this.jewels.push(new Jewel(this.scene, x, y + ind * 54, value));
    // });

    // this.isMoving = false;

    // this.
  }

  collides(block, currScene) {
    const { x, y } = block.gridPosition;
    // console.log(block.gridPosition);
    const bottomY = y + 2;

    if (bottomY >= 11 || this.grid[x + (bottomY + 1) * 6] > 0) {
      const blockJewelBuffer = [...block.jewels];
      block.restart();

      blockJewelBuffer.forEach((jewel, ind) => {
        this.grid[x + (y + ind) * 6] = jewel.value;
        this.jewelGrid[x + (y + ind) * 6] = jewel;

        jewel.tweenPosition(x * 50, (y + ind) * 50);
        // this.scene.tweens.add({
        //   targets: jewel.position,
        //   y: (y + ind) * 50,
        //   duration: 100,
        //   ease: "Power2",
        //   onComplete: () => {
        //     console.log(console.log((y + ind) * 50));
        //   }
        // });

        // jewel.setPosition(x * 50, (y + ind) * 50);
      });

      // this.grid[x + y * 6] = block.jewels[0].value;
      // this.grid[x + (y + 1) * 6] = block.jewels[1].value;
      // this.grid[x + bottomY * 6] = block.jewels[2].value;

      console.log("-------------");
      for (let i = 0; i < 12; i++) {
        console.log(
          `|${this.grid[0 + i * 6]},${this.grid[1 + i * 6]},${
            this.grid[2 + i * 6]
          },${this.grid[3 + i * 6]},${this.grid[4 + i * 6]},${
            this.grid[5 + i * 6]
          }|`
        );
      }
      console.log("-------------");

      if (bottomY <= 1) {
        setTimeout(() => {
          currScene.add
            .rectangle(150, 400, 300, 800)
            .setFillStyle(0xffffff, 0.6);
          currScene.add
            .text(
              20,
              300,
              `GAME
OVER`
            )
            .setColor("red")
            .setFontStyle("bold")
            .setFontFamily("Arial")
            .setFontSize(80);
          currScene.scene.pause();
          setTimeout(() => {
            currScene.sound.stopAll();
            currScene.scene.start("StartMenu");
          }, 5000);
        }, 300);
      }
      return true;
    }
    return false;
  }

  canSideMove(block) {
    const { x, y } = block.gridPosition;
    // console.log(block.gridPosition);
    const bottomY = y + 2;
    const freeSides = { left: true, right: true };

    if (x <= 0 || this.grid[x - 1 + bottomY * 6] > 0) {
      freeSides.left = false;
    }

    if (x >= 5 || this.grid[x + 1 + bottomY * 6] > 0) {
      freeSides.right = false;
    }

    return freeSides;
  }

  update() {}

  updateAllPos() {}

  IndToGrid(ind) {
    return { x: ind % 6, y: Math.floor(ind / 6) };
  }

  checkMatch() {
    let matchingCells = [];

    this.grid.forEach((cell, ind) => {
      if (cell > 0) {
        // Horizontal Check -----
        const matchingHCells = [];
        this.checkHmatch(matchingHCells, ind, true, true);

        const finalmatchingHCells = [];
        matchingHCells.forEach(ind => {
          if (
            finalmatchingHCells.indexOf(ind) < 0 &&
            matchingCells.indexOf(ind) < 0
          )
            finalmatchingHCells.push(ind);
        });

        if (finalmatchingHCells.length >= 3) {
          matchingCells = [...matchingCells, ...finalmatchingHCells];
        }

        // Vertical Check -----

        const matchingVCells = [];
        this.checkVmatch(matchingVCells, ind, true, true);

        const finalmatchingVCells = [];
        matchingVCells.forEach(ind => {
          if (
            finalmatchingVCells.indexOf(ind) < 0 &&
            matchingCells.indexOf(ind) < 0
          )
            finalmatchingVCells.push(ind);
        });

        if (finalmatchingVCells.length >= 3) {
          matchingCells = [...matchingCells, ...finalmatchingVCells];
        }
      }
    });

    const finalMatches = [];

    matchingCells.forEach(ind => {
      if (finalMatches.indexOf(ind) < 0) finalMatches.push(ind);
    });

    if (finalMatches.length >= 3) {
      this.score += finalMatches.length;
      finalMatches.forEach(ind => {
        const jewelBuffer = this.jewelGrid[ind];
        jewelBuffer.destroy();
        // this.jewelGrid[ind].destroy();
        this.jewelGrid[ind] = 0;
        this.grid[ind] = 0;
      });

      this.gravityActs();
      setTimeout(() => this.checkMatch(), 200);
    }

    return false;
  }

  checkHmatch(matchArr, ind, left, right) {
    const { x, y } = this.IndToGrid(ind);

    matchArr.push(ind);

    if (x <= 0) left = false;
    if (x >= 5) right = false;

    if (left) {
      if (this.jewelGrid[x - 1 + y * 6].value === this.jewelGrid[ind].value) {
        this.checkHmatch(matchArr, x - 1 + y * 6, true, false);
      }
    }

    if (right) {
      if (this.jewelGrid[x + 1 + y * 6].value === this.jewelGrid[ind].value) {
        this.checkHmatch(matchArr, x + 1 + y * 6, false, true);
      }
    }
    return;
  }

  checkVmatch(matchArr, ind, up, down) {
    const { x, y } = this.IndToGrid(ind);

    matchArr.push(ind);

    if (y <= 0) up = false;
    if (y >= 11) down = false;

    if (up) {
      if (this.jewelGrid[x + (y - 1) * 6].value === this.jewelGrid[ind].value) {
        this.checkVmatch(matchArr, x + (y - 1) * 6, true, false);
      }
    }

    if (down) {
      if (this.jewelGrid[x + (y + 1) * 6].value === this.jewelGrid[ind].value) {
        this.checkVmatch(matchArr, x + (y + 1) * 6, false, true);
      }
    }
  }

  gravityActs() {
    // for (let y = 11; y >= 0; y--) {
    //   for (let x = 5; x >= 0; x--) {
    //     if(this.grid[])
    //   }
    // }

    for (let ind = this.grid.length - 1; ind >= 0; ind--) {
      if (this.grid[ind] === 0) {
        const { x, y } = this.IndToGrid(ind);
        const upInd = x + (y - 1) * 6;
        if (this.grid[upInd] > 0) {
          this.grid[ind] = this.grid[upInd];
          this.grid[upInd] = 0;

          this.jewelGrid[ind] = this.jewelGrid[upInd];
          this.jewelGrid[upInd] = 0;
          this.jewelGrid[ind].tweenPosition(x * 50, y * 50);
          this.gravityActs();
        }
      }
    }

    // for (let ind = this.grid.length - 1; ind >= 0; ind--) {
    //   if (this.grid[ind] === 0) {
    //     let upInd = ind;
    //     while (this.grid[upInd] === 0 || upInd > 0) {
    //       const { x, y } = this.IndToGrid(upInd);
    //       upInd = x + (y - 1) * 6;
    //       console.log("upInd : " + upInd + ", x y : " + x + " " + y);
    //       if (this.grid[upInd] > 0) {
    //         this.grid[ind] = this.grid[upInd];
    //         this.grid[upInd] = 0;

    //         this.jewelGrid[ind] = this.jewelGrid[upInd];
    //         this.jewelGrid[upInd] = 0;
    //         const newPos = this.IndToGrid(ind);
    //         this.jewelGrid[ind].tweenPosition(newPos.x * 50, newPos.y * 50);
    //         // jewel.tweenPosition(x * 50, (y + ind) * 50);
    //       }
    //     }
    //   }
    // }
  }
}

export default jwGrid;
