import { Texture } from "pixi.js";
import { GameObject } from "./GameObject";
import gsap from "gsap";
import config from "../gameConfig.json";

const { home, leap, moveDuration } = config.tiger;

export class Tiger extends GameObject {
  constructor() {
    super(Texture.from("tiger.png"));
  }

  public async leap() {
    await Promise.all([
      gsap.to(this.position, { duration: moveDuration, x: leap.x, y: leap.y }),
      gsap.to(this.scale, {
        duration: moveDuration,
        x: leap.scale,
        y: leap.scale,
      }),
    ]);
  }

  public async returnToCage() {
    await Promise.all([
      gsap.to(this.position, { duration: moveDuration, x: home.x, y: home.y }),
      gsap.to(this.scale, {
        duration: moveDuration,
        x: home.scale,
        y: home.scale,
      }),
    ]);
  }
}
