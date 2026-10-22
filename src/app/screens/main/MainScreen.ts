import { animate } from "motion";
import type { AnimationPlaybackControls } from "motion/react";
import type { Ticker } from "pixi.js";
import { Container, RenderLayer, Texture } from "pixi.js";

import { engine } from "../../getEngine";
import { Cage } from "../../game-objects/Cage";
import { Tiger } from "../../game-objects/Tiger";
import { Background } from "../../game-objects/Background";
import { Plate } from "../../game-objects/Plate";

/** The screen that holds the app */
export class MainScreen extends Container {
  /** Assets bundles required by this screen */
  public static assetBundles = ["main"];

  public mainContainer: Container;
  private background: Background;
  private cage: Cage;
  private tiger: Tiger;
  private paused = false;
  private plate: Plate;

  private frontLayer: RenderLayer;

  constructor() {
    super();
    
    this.background = new Background();
    this.addChild(this.background);

    this.mainContainer = new Container();
    this.addChild(this.mainContainer);

    this.cage = new Cage();
    this.mainContainer.addChild(this.cage);

    this.tiger = new Tiger();
    this.tiger.scale.set(0.4);
    this.tiger.position.set(0, 70);
    this.mainContainer.addChild(this.tiger);

    //renders the bars in front of the tiger
    this.frontLayer = new RenderLayer();
    this.mainContainer.addChild(this.frontLayer);
    this.frontLayer.attach(...this.cage.bars);

    this.plate = new Plate();
    this.plate.scale.set(0.4);
    this.plate.position.set(-700, 0);
    this.mainContainer.addChild(this.plate);

    const password = this.generatePassword();
    console.log("Generated password:", password);

    // const buttonAnimations = {
    //   hover: {
    //     props: {
    //       scale: { x: 1.1, y: 1.1 },
    //     },
    //     duration: 100,
    //   },
    //   pressed: {
    //     props: {
    //       scale: { x: 0.9, y: 0.9 },
    //     },
    //     duration: 100,
    //   },
    // };
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

  /** Prepare the screen just before showing */
  public prepare() {}

  /** Update the screen */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(_time: Ticker) {
    if (this.paused) return;
  }

  /** Pause gameplay - automatically fired when a popup is presented */
  public async pause() {
    this.mainContainer.interactiveChildren = false;
    this.paused = true;
  }

  /** Resume gameplay */
  public async resume() {
    this.mainContainer.interactiveChildren = true;
    this.paused = false;
  }

  /** Fully reset */
  public reset() {}

  /** Resize the screen, fired whenever window size changes */
  public resize(width: number, height: number) {
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    this.mainContainer.x = centerX;
    this.mainContainer.y = centerY;

    this.mainContainer.scale.set(Math.min(width / 1920, height / 1080));
    this.background.resize(width, height);
  }

  /** Show screen with animations */
  public async show(): Promise<void> {
    engine().audio.bgm.play("main/sounds/bgm-main.mp3", { volume: 0.5 });

    const elementsToAnimate = [this.mainContainer
    ];

    let finalPromise!: AnimationPlaybackControls;
    for (const element of elementsToAnimate) {
      element.alpha = 0;
      finalPromise = animate(
        element,
        { alpha: 1 },
        { duration: 0.3, delay: 0.75, ease: "backOut" },
      );
    }

    await finalPromise;
  }

  /** Hide screen with animations */
  public async hide() {}

}
