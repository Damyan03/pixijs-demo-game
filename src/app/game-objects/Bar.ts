import { Sprite, Texture } from "pixi.js";
import { InteractableObject } from "./InteractableObject";
import gsap from "gsap";
import { Label } from "../ui/Label";
import config from "../gameConfig.json";

export class Bar extends InteractableObject {
  private readonly direction: number;
  public readonly id: number;
  public isOpen: boolean = false;
  private shadow: Sprite;
  private barLabel: Label;

  private readonly onBarTap: (bar: Bar) => void;

  constructor(inverted: boolean, id: number, onBarTap: (bar: Bar) => void) {
    super(Texture.from("bar.png"));
    this.direction = inverted ? 1 : -1;
    this.id = id;
    this.sprite.scale.set(config.bar.scale);
    this.sprite.anchor.set(1, 0.5);
    this.cursor = "pointer";
    //flips the sprite for the right side of the cage
    if (inverted) {
      this.sprite.scale.x *= -1;
    }
    this.onBarTap = onBarTap;

    //bar numbers
    this.barLabel = new Label({
      text: `${this.id + 1}`,
      style: config.bar.labelStyle,
    });
    this.barLabel.x = (this.sprite.width - config.bar.labelInset) * this.direction;
    this.addChild(this.barLabel);

    //bar shadow
    this.shadow = new Sprite(Texture.from("barShadow.png"));
    this.shadow.anchor.copyFrom(this.sprite.anchor);
    this.shadow.scale.copyFrom(this.sprite.scale);
    this.shadow.position.set(0, config.bar.shadowOffsetY);
    this.addChildAt(this.shadow, 0);
  }

  protected onTap(): void {
    console.log(`Bar ${this.id + 1} tapped!`);
    this.onBarTap(this);
  }

  public async open() {
    this.isOpen = true;
    this.cursor = "default";
    await gsap.to(this, { duration: config.bar.openDuration, x: config.bar.openDistance * this.direction });
  }

  public async close() {
    this.isOpen = false;
    this.cursor = "pointer";
    await gsap.to(this, { duration: config.bar.closeDuration, x: 0, overwrite: "auto" });
  }
}
