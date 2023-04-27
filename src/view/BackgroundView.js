import * as PIXI from 'pixi.js';
import Signals from "../signals/Signals";

export default class BackgroundView extends PIXI.Sprite {
  constructor() {
    super();

    this.name = 'bg.png';
    Signals.onInit.add(this.onInit, this);
  }

  onInit(textures) {
    this.texture = textures['bg.png'];
    this.scale.set(1.4)
  }
}
