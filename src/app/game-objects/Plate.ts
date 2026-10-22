import { Texture } from "pixi.js";
import { GameObject } from "./GameObject";
import { Label } from "../ui/Label";

export class Plate extends GameObject {
    private barsRemainingLabel: Label;

    constructor() {
        super(Texture.from("plate.png"))

        this.barsRemainingLabel = new Label({
            text: "",
            style: {fontSize: 125, fill: `#FFFFFF`, stroke: { color: "#000000", width: 20 }}
        })
        this.addChild(this.barsRemainingLabel)
    }

    public setBarsRemaining(barsRemaining: number) {
        this.barsRemainingLabel.text = `Bars\nremaining:\n${barsRemaining}`;
    }
}