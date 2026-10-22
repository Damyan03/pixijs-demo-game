import { Texture } from "pixi.js";
import { GameObject } from "./GameObject";
import { Bar } from "./Bar";

export class Cage extends GameObject {
    public bars: Bar[] = [];

    constructor() {
        super(Texture.from("cage.png"));
        this.scale.set(0.65);
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 2; j++) {
                const bar = new Bar(j === 1);
                this.bars.push(bar);
                this.bars[i * 2 + j].x = j;
                this.bars[i * 2 + j].y = 200 * i - 150;
                this.addChild(bar);
            }
        }
    }
}