import * as signals from "signals";
import Signals from "../signals/Signals";

class Controller {
  constructor(model, view) {
    this.add = () => new signals.Signal()

    this.model = model;
    this.view = view;

    // Inversion control
    model.controller = this;
    view.controller = this;

    Signals.onChoose.add(this.onChoose, this);
  }

  onChoose(name) {
    ++this.model.openedChests;
    if (this.model.openedChests >= this.model.maxChests) {
      Signals.onGameOver.dispatch();
    }
  }
}

export default Controller;
