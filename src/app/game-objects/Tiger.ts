import { Texture } from "pixi.js";
import { GameObject } from "./GameObject";
import gsap from "gsap";

export class Tiger extends GameObject {
  constructor() {
    super(Texture.from("tiger.png"));
  }

  public async leap() {
    await Promise.all([
      gsap.to(this.position, { duration: 0.6, x: 74, y: -130 }),
      gsap.to(this.scale, { duration: 0.6, x: 1, y: 1 }),
    ]);
  }
}
