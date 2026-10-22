import { Sprite, Texture } from "pixi.js";

export class Background extends Sprite {
    constructor() {
        super(Texture.from("background.jpg"));
        this.anchor.set(0.5);
    }

    public resize(width: number, height: number): void {
        this.position.set(width * 0.5, height * 0.5);
        this.scale.set(Math.max(width / this.texture.width, height / this.texture.height));
    }
};