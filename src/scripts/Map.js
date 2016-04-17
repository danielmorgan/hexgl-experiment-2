'use strict';

import PIXI from 'pixi.js';
import PointOfInterest from './PointOfInterest';
import Generator from './Generator';

export default class Map {
    constructor() {
        this.pois = [];
        this.displayObject = new PIXI.Container();

        for (let i = 0; i < 3; i++) {
            let poi = new PointOfInterest();
            if (! this.collidesWithExistingPois(poi)) {
                this.pois.push(poi);
                this.displayObject.addChild(poi.displayObject);
            }
        }
    }

    collidesWithExistingPois(poi) {
        for (let existingPoi of this.pois) {
            let a = existingPoi.displayObject;
            let b = poi.displayObject;

            // if a width intersects b width
            // && a height intersects b height
                // return false
        }

        return false;
    }

    resize() {
    }

    update() {
    }
}
