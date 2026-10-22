import { Texture } from "pixi.js";
import { InteractableObject } from "./InteractableObject";

export class Bar extends InteractableObject {
    constructor(inverted: boolean = false) {
        super(Texture.from("bar.png"));
        this.sprite.scale.set(2.3);
        this.sprite.anchor.set(1, 0.5);
        //flips the sprite for the right side of the cage
        if (inverted) { this.sprite.scale.x *= -1;}
        this.eventMode = "static";
    }
    protected onTap(): void {
        console.log({ bar: this });
    }
}