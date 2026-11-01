import { Texture } from "pixi.js";
import { GameObject } from "./GameObject";
import { Bar } from "./Bar";
import config from "../gameConfig.json";

export class Cage extends GameObject {
  public bars: Bar[] = [];

  constructor(onBarTap: (bar: Bar) => void) {
    super(Texture.from("cage.png"));
    this.scale.set(config.cage.scale);

    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < config.cage.barsPerSide; i++) {
        const bar = new Bar(j === 1, j * config.cage.barsPerSide + i, onBarTap);
        this.bars.push(bar);
        bar.y = config.cage.barSpacing * i + config.cage.firstBarY;
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
