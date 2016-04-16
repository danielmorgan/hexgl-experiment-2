'use strict';

import PIXI from 'pixi.js';
import PointOfInterest from './PointOfInterest';

export default class Map {
    constructor() {
        this.displayObject = new PIXI.Container();

        this.poi = new PointOfInterest();
        this.resize();

        this.displayObject.addChild(this.poi.displayObject);
    }

    resize() {
        this.poi.displayObject.x = (window.innerWidth / 2) - (this.poi.displayObject.width / 2);
        this.poi.displayObject.y = (window.innerHeight / 2) - (this.poi.displayObject.height / 2);
    }

    update() {
    }
}
