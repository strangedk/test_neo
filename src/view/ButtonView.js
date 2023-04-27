import * as PIXI from 'pixi.js';
import Signals from "../signals/Signals";

export default class ButtonView extends PIXI.Sprite {
  constructor() {
    super();

    this.interactive = true;
    this.buttonMode = true;

    const shadow = new PIXI.Graphics();
    shadow.beginFill(0x111111,1);
    shadow.drawRoundedRect(8,8,200,60, 15);
    shadow.endFill();

    const graphics = new PIXI.Graphics();
    graphics.beginFill(0x336688,1);
    graphics.drawRoundedRect(0,0,200,60, 15);
    graphics.endFill();

    this.addChild(shadow, graphics);

    const style = new PIXI.TextStyle({
      fill: [
        "#ffffff",
        "#acaaaa"
      ],
      fontWeight: "bold"
    });
    const text = new PIXI.Text('Play', style);
    text.x = 77;
    text.y = 16;

    this.addChild(text);

    this.on('pointerdown', this.onClick);

    Signals.enableItems.add(this.onEnableItems, this);
    Signals.disableItems.add(this.onDisableItems, this);
  }

  onClick() {
    if (this.enable) {
      this.setEnable(false);
      Signals.onOk.dispatch();
    }
  }

  onEnableItems() {
    this.setEnable(false);
  }

  onDisableItems() {
    this.setEnable(true);
  }

  setEnable(value) {
    this.enable = value;
    if (!value) {
      this.alpha = 0.5;
    } else {
      this.alpha = 1;
    }
  }
}
