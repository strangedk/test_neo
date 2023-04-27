import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import Signals from "../signals/Signals";

export default class ItemView extends PIXI.Sprite {
  constructor(texture) {
    super();

    this.interactive = true;
    this.buttonMode = true;
    this.sourceScale = 0.6;
    this.selected = false;
    this.setEnable(true);

    this.anchor.set(0.5);

    this.setTexture(texture);

    this.on('pointerdown', this.onClick);

    Signals.onOk.add(() => this.setEnable(true));
    Signals.disableItems.add(() => this.setEnable(false));
    Signals.enableItems.add(() => this.setEnable(true));
  }

  onClick() {
    if(!this.enabled || this.selected) return;

    Signals.onChoose.dispatch(this.name);
    this.selected = true;
    this.setEnable(false);

    gsap.to(this.scale, {y:"-=0.2", x:"-=0.2", duration: 0.5});
  }

  setTexture(texture) {
    this.texture = texture;

    this.scale.set(this.sourceScale);
  }

  setEnable(value) {
    this.enabled = value;
    if (!value) {
      this.alpha = 0.5;
    } else {
      this.alpha = 1;
    }
  }
}
