import * as PIXI from 'pixi.js';
import FieldView from "./FieldView";
import BackgroundView from "./BackgroundView";
import Signals from "../signals/Signals";
import BonusModalView from "./BonusModalView";
import gsap from "gsap";

class GameView extends PIXI.Container {

    constructor(app, {width, height}) {
        super();
        this.app = app;

        this.WIDTH = width;
        this.HEIGHT = height;

        this.interactiveChildren = true;
        this.textures = undefined;

        Signals.onExtra.add(this.onExtra, this);

        this.createElements();
    }

    createElements() {
        const background = new BackgroundView();
        background.x = 0;
        background.y = 0;
        this.addChild(background);

        const field = new FieldView();
        field.x = 260;
        field.y = 140;
        this.addChild(field);

        this.bonusModal = new BonusModalView(this.WIDTH, this.HEIGHT);
        this.bonusModal.visible = false;
        this.addChild(this.bonusModal);

        return this;
    }

    onExtra() {
        const {bonusModal} = this;
        bonusModal.visible = true;
        bonusModal.alpha = 0;
        let delayID = undefined;

        function continueExtra() {
            bonusModal.alpha = 0;
            bonusModal.visible = false;
            clearTimeout(delayID);
        }

        gsap.to(bonusModal, {alpha:1, duration:0.1, onComplete:() => {
            delayID = setTimeout(() => continueExtra(), 3000);
            }})
    }
}

export default GameView;
