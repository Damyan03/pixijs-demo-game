import { Sprite } from "pixi.js";
import { Container, RenderLayer, Texture } from "pixi.js";
import { waitFor } from "../../../engine/utils/waitFor";

import { Cage } from "../../game-objects/Cage";
import { Tiger } from "../../game-objects/Tiger";
import { Background } from "../../game-objects/Background";
import { Plate } from "../../game-objects/Plate";
import { Bar } from "../../game-objects/Bar";

import gsap from "gsap";

type GameState = "playing" | "resetting" | "won";

/** The screen that holds the app */
export class MainScreen extends Container {
  /** Assets bundles required by this screen */
  public static assetBundles = ["main"];

  public mainContainer: Container;
  private background: Background;
  private cage: Cage;
  private tiger: Tiger;
  private plate: Plate;
  private winText: Sprite;

  private password: number[] = [];
  private step: number = 0;

  private state: GameState = "resetting";

  private frontLayer: RenderLayer;

  constructor() {
    super();

    this.background = new Background();
    this.addChild(this.background);

    this.mainContainer = new Container();
    this.addChild(this.mainContainer);

    this.cage = new Cage((bar: Bar) => this.onBarOpen(bar));
    this.mainContainer.addChild(this.cage);

    this.plate = new Plate();
    this.plate.scale.set(0.4);
    this.plate.position.set(-700, 0);
    this.mainContainer.addChild(this.plate);

    this.tiger = new Tiger();
    this.tiger.scale.set(0.4);
    this.tiger.position.set(0, 70);
    this.mainContainer.addChild(this.tiger);

    this.winText = new Sprite(Texture.from("txt.png"));
    this.winText.scale.set(0);
    this.winText.anchor.set(0.5);
    this.winText.position.set(0, 350);
    this.mainContainer.addChild(this.winText);

    //renders the bars in front of the tiger
    this.frontLayer = new RenderLayer();
    this.mainContainer.addChild(this.frontLayer);
    this.frontLayer.attach(...this.cage.bars);

    this.resetGame();
  }
  
  private setState(state: GameState) {
    this.state = state;
    //bars only accept input while playing
    this.cage.setInteractive(this.state === "playing");
  }

  private async resetGame() {
    this.setState("resetting");
    this.password = this.generatePassword();
    this.step = 0;
    this.plate.setBarsRemaining(this.password.length);

    console.log(`Password: ${this.password.map((number) => number + 1)}`);
    await this.cage.resetBars();
    this.setState("playing");
  }

  private generatePassword(): number[] {
    const password: number[] = [];
    while (password.length < 6) {
      const randomNumber = Math.floor(Math.random() * 6);
      if (!password.includes(randomNumber)) {
        password.push(randomNumber);
      }
    }
    return password;
  }

  private onBarOpen(bar: Bar) {
    if (bar.id !== this.password[this.step]) {
      this.resetGame();
      return;
    }

    this.step++;
    this.plate.setBarsRemaining(this.password.length - this.step);
    if (this.step === this.password.length) this.win();
  }

  private async win() {
    console.log("Unlocked!");
    this.setState("won");

    // let the last bar finish sliding
    await waitFor(0.5);

    this.frontLayer.attach(this.tiger, this.winText);
    await this.tiger.leap();
    await gsap.to(this.winText.scale, { duration: 0.4, x: 0.65, y: 0.65 });

    //reset game after 5s
    await waitFor(5);
    
    await gsap.to(this.winText.scale, { duration: 0.4, x: 0, y: 0 });
    await this.tiger.returnToCage();
    this.frontLayer.detach(this.tiger, this.winText);

    this.resetGame();
  }

  /** Resize the screen, fired whenever window size changes */
  public resize(width: number, height: number) {
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    this.mainContainer.x = centerX;
    this.mainContainer.y = centerY;

    this.mainContainer.scale.set(Math.min(width / 1920, height / 1080));
    this.background.resize(width, height);
  }
}
