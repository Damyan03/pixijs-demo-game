import { Sprite, Texture } from "pixi.js";

export class Background extends Sprite {
  constructor() {
    super(Texture.from("background.jpg"));
    this.anchor.set(0.5);
  }

  public coverHeight(height: number): void {
    this.scale.set(height / this.texture.height);
  }
}
