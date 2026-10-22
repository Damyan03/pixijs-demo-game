import { Texture } from "pixi.js";
import { GameObject } from "./GameObject";

export class Plate extends GameObject {
    constructor() {
        super(Texture.from("plate.png"));
    }
}