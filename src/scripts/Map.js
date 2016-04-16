'use strict';

import PIXI from 'pixi.js';
import PointOfInterest from './PointOfInterest';
import Generator from './Generator';

export default class Map {
    constructor() {
        this.displayObject = new PIXI.Container();

        for (let i = 0; i < 3; i++) {
            let poi = new PointOfInterest();
            let coord = Generator.coordinates(500);
            poi.displayObject.x = coord.x;
            poi.displayObject.y = coord.y;
            this.displayObject.addChild(poi.displayObject);
        }
    }

    resize() {
    }

    update() {
    }
}
