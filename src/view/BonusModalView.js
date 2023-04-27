import * as PIXI from 'pixi.js';

export default class BonusModalView extends PIXI.Sprite {
  constructor(width, height, image) {
    super();

    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRect(0,0, width, height);
    graphics.endFill();
    this.addChild(graphics);

    const bg = new PIXI.Sprite();
    bg.texture

    const style = new PIXI.TextStyle({
      fill: [
        "#0066ff",
        "#ffff00"
      ],
      fontSize: 120,
      fontWeight: "bold"
    });
    const text = new PIXI.Text('Extra Win!', style);
    text.x = 360;
    text.y = 240;
    text.anchor.set(0.5);

    this.addChild(text);
  }

  onInit(textures) {
  }
}
