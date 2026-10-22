import { Container, Sprite } from "pixi.js";
import type { Texture } from "pixi.js";

export abstract class GameObject extends Container {

    protected sprite: Sprite;

    constructor(texture: Texture) {
        super();

        this.sprite = new Sprite(texture);
        this.sprite.anchor.set(0.5);
        this.addChild(this.sprite);
    }
}