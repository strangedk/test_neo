import { Assets } from 'pixi.js';

async function loadResources() {
  return await Assets.load('assets/sheets.json');
}

export default loadResources;
