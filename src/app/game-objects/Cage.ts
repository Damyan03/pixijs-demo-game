import { Texture } from "pixi.js";
import { GameObject } from "./GameObject";
import { Bar } from "./Bar";

export class Cage extends GameObject {
  public bars: Bar[] = [];

  constructor(onBarTap: (bar: Bar) => void) {
    super(Texture.from("cage.png"));
    this.scale.set(0.65);

    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 3; i++) {
        const bar = new Bar(j === 1, j * 3 + i, onBarTap);
        this.bars.push(bar);
        bar.y = 200 * i - 150;
        this.addChild(bar);
      }
    }
  }

  public async resetBars() {
    await Promise.all(this.bars.map((bar) => bar.close()));
  }

  public setInteractive(interactive: boolean) {
    this.interactiveChildren = interactive;
  }
}
