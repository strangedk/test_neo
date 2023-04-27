import * as PIXI from 'pixi.js'
import loadResources from "./model/resources/Resources";
import GameView from "./view/GameView";
import Controller from "./controller/Controller";
import Model from "./model/Model";
import Signals from "./signals/Signals";

const options = {
  width: 820,
  height: 520,
  antialias: true,
  transparent: true,
};

const app = new PIXI.Application(options);

void async function init() {

  const data = await loadResources();

  const model = new Model();
  const view = new GameView(app, options);
  const controller = new Controller(model, view);

  Signals.onInit.dispatch(data.textures);

  app.stage.addChild(view);
}();

const appDiv = document.getElementById('app');
appDiv.append(app.view);
