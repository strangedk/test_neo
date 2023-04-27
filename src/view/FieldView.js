import * as PIXI from 'pixi.js';
import ButtonView from "./ButtonView";
import ItemView from "./ItemView";
import Signals from "../signals/Signals";
import gsap from 'gsap';

export default class FieldView extends PIXI.Sprite {
  constructor() {
    super();

    this.maxItems = 6;
    this.textures = null;
    this.items = null;

    this.interactive = true;
    this.buttonMode = true;

    Signals.onInit.add(this.onInit, this);
    Signals.onGameOver.add(this.startGame, this);
    Signals.onWin.add(this.onWin, this);
  }

  onInit(textures) {
    this.textures = textures;

    this.startGame();
  }

  startGame() {
    this
      .createItems()
      .placeItems();

    Signals.disableItems.dispatch();
  }

  onWin() {
    this.bonus.visible = true;
    Signals.disableItems.dispatch();
    this.button.visible = false;

    gsap.to(this.bonus, {alpha: 1, duration: 3, onComplete: () => {
      Signals.enableItems.dispatch();
      this.bonus.alpha = 0;
      this.bonus.visible = false;
      this.button.visible = true
      }})
  }

  createItems() {
    this.removeChildren();

    this.items = [];
    new Array(this.maxItems).fill(0).map((v,i) => {
      const textureName = this.getRandomItemName();
      const texture = this.textures[textureName];
      const item = new ItemView(texture);
      item.name = ''+i;
      this.items.push(item);
      this.addChild(item);
    });

    this.button = new ButtonView();
    this.button.x = 50;
    this.button.y = 250;
    this.addChild(this.button);

    this.bonus = new PIXI.Sprite();
    this.bonus.texture = this.textures['bonus.png'];
    this.bonus.alpha = 0;
    this.bonus.visible = false;
    this.addChild(this.bonus);

    return this;
  }

  placeItems() {
    let index = 0;

    for (let i=0; i<this.maxItems/2; ++i, index++) {
      const item = this.items[index];
      item.x = i * item.width;
    }
    for (let i=0; i<this.maxItems/2; ++i, index++) {
      const item = this.items[index];
      item.x = i * item.width;
      item.y = item.height;
    }
  }

  getRandomItemName() {
    const number = 1 + Math.floor(Math.random() * this.maxItems);
    const name = `0${number}.png`;
    console.log(name);
    return name;
  }
}
