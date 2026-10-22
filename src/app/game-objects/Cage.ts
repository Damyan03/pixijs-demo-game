import { Texture } from "pixi.js";
import { GameObject } from "./GameObject";
import { Bar } from "./Bar";

export class Cage extends GameObject {
  public bars: Bar[] = [];

  constructor(onBarOpen: (bar: Bar) => void) {
    super(Texture.from("cage.png"));
    this.scale.set(0.65);

    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 3; i++) {
        const bar = new Bar(j === 1, j * 3 + i, onBarOpen);
        this.bars.push(bar);
        bar.y = 200 * i - 150;
        this.addChild(bar);
      }
    }
  }

  public resetBars() {
    this.bars.forEach((bar) => bar.resetBar());
  }
}
