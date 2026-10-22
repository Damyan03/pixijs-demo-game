import { Texture } from "pixi.js";
import { GameObject } from "./GameObject";
import { Bar } from "./Bar";

export class Cage extends GameObject {
    public bars: Bar[] = [];

    constructor() {
        super(Texture.from("cage.png"));
        this.scale.set(0.65);
        
        for (let j = 0; j < 2; j++) {
            for (let i = 0; i < 3; i++) {
                const bar = new Bar(j === 1, j * 3 + i);
                this.bars.push(bar);
                bar.x = j;
                bar.y = 200 * i - 150;
                this.addChild(bar);
            }
        }
    }
}