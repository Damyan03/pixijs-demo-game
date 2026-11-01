import { Sprite, Texture } from "pixi.js";
import { InteractableObject } from "./InteractableObject";
import gsap from "gsap";
import { Label } from "../ui/Label";

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
    this.sprite.scale.set(2.3);
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
      style: {
        fontSize: 120,
        fill: "#FFFFFF",
        stroke: { color: "#000000", width: 20 },
      },
    });
    this.barLabel.x = (this.sprite.width - 40) * this.direction;
    this.addChild(this.barLabel);

    //bar shadow
    this.shadow = new Sprite(Texture.from("barShadow.png"));
    this.shadow.anchor.copyFrom(this.sprite.anchor);
    this.shadow.scale.copyFrom(this.sprite.scale);
    this.shadow.position.set(0, 10);
    this.addChildAt(this.shadow, 0);
  }

  protected onTap(): void {
    console.log(`Bar ${this.id + 1} tapped!`);
    this.onBarTap(this);
  }

  public async open() {
    this.isOpen = true;
    await gsap.to(this, { duration: 0.5, x: 350 * this.direction });
  }

  public async close() {
    this.isOpen = false;
    await gsap.to(this, { duration: 0.5, x: 0, overwrite: "auto" });
  }
}
