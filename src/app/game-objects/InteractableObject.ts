import { GameObject } from "./GameObject";
import type { Texture } from "pixi.js";

export abstract class InteractableObject extends GameObject {
  constructor(texture: Texture) {
    super(texture);
    this.eventMode = "static";
    this.on("pointertap", this.onTap);
  }

  protected abstract onTap(): void;
}
