import { Sprite } from "pixi.js";
import { Container, RenderLayer, Texture } from "pixi.js";
import { waitFor } from "../../../engine/utils/waitFor";

import { Cage } from "../../game-objects/Cage";
import { Tiger } from "../../game-objects/Tiger";
import { Background } from "../../game-objects/Background";
import { Plate } from "../../game-objects/Plate";
import { Bar } from "../../game-objects/Bar";

import gsap from "gsap";
import config from "../../gameConfig.json";

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

    this.cage = new Cage((bar: Bar) => this.onBarTap(bar));
    this.mainContainer.addChild(this.cage);

    this.plate = new Plate();
    this.plate.scale.set(config.plate.scale);
    this.plate.position.set(config.plate.x, config.plate.y);
    this.mainContainer.addChild(this.plate);

    this.tiger = new Tiger();
    this.tiger.scale.set(config.tiger.home.scale);
    this.tiger.position.set(config.tiger.home.x, config.tiger.home.y);
    this.mainContainer.addChild(this.tiger);

    this.winText = new Sprite(Texture.from("txt.png"));
    this.winText.scale.set(0);
    this.winText.anchor.set(0.5);
    this.winText.position.set(config.winText.x, config.winText.y);
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
    const barCount = this.cage.bars.length;
    while (password.length < barCount) {
      const randomNumber = Math.floor(Math.random() * barCount);
      if (!password.includes(randomNumber)) {
        password.push(randomNumber);
      }
    }
    return password;
  }

  private onBarTap(bar: Bar) {
    if (bar.isOpen) return;

    if (bar.id !== this.password[this.step]) {
      this.resetGame();
      return;
    }

    this.step++;
    this.plate.setBarsRemaining(this.password.length - this.step);

    if (this.step === this.password.length) this.win(bar);
    else bar.open();
  }

  private async win(lastBar: Bar) {
    console.log("Unlocked!");
    this.setState("won");

    // let the last bar finish sliding
    await lastBar.open();

    this.frontLayer.attach(this.tiger, this.winText);
    await this.tiger.leap();
    await gsap.to(this.winText.scale, {
      duration: config.winText.showDuration,
      x: config.winText.scale,
      y: config.winText.scale,
    });

    //hold the win screen before resetting
    await waitFor(config.winText.holdDuration);

    await gsap.to(this.winText.scale, {
      duration: config.winText.hideDuration,
      x: 0,
      y: 0,
    });
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

    const { gameSize } = config;
    this.mainContainer.scale.set(
      Math.min(width / gameSize.width, height / gameSize.height),
    );
    this.background.resize(width, height);
  }
}
