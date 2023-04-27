import Signals from "../signals/Signals";

class Model {
  constructor() {
    this.textures = null;

    this.maxChests = 6;
    this.openedChests = 0;

    Signals.onInit.add(this.onInit, this);
    Signals.onGameOver.add(this.reset, this);
    Signals.onChoose.add(this.onChoose, this);
  }

  onChoose(name) {
    const rand = Math.random();

    if (rand > 0.85) {
      Signals.onExtra.dispatch();
    } else if (rand > 0.6) {
      Signals.onWin.dispatch();
    } else {
      Signals.onLoose.dispatch();
    }
  }

  onInit(data) {
    this.textures = data;
  }

  reset() {
    this.openedChests = 0;
  }
}

export default Model;
