import { Texture } from "pixi.js";
import { InteractableObject } from "./InteractableObject";
import gsap from "gsap";

export class Bar extends InteractableObject {

    private readonly direction: number;

    constructor(inverted: boolean = false) {
        super(Texture.from("bar.png"));
        this.direction = inverted ? 1 : -1;
        this.sprite.scale.set(2.3);
        this.sprite.anchor.set(1, 0.5);
        //flips the sprite for the right side of the cage
        if (inverted) { this.sprite.scale.x *= -1;}
    }
    protected onTap(): void {
        gsap.to(this, { duration: 0.5, x: this.x + (350 * this.direction) });
    }
}