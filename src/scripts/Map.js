'use strict';

import PIXI from 'pixi.js';
import PointOfInterest from './PointOfInterest';
import Generator from './Generator';

export default class Map {
    constructor() {
        this.displayObject = new PIXI.Container();

        for (let i = 0; i < 3; i++) {
            let poi = new PointOfInterest();
            this.displayObject.addChild(poi.displayObject);
        }
    }

    resize() {
    }

    update() {
    }
}
