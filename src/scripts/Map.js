'use strict';

import PIXI from 'pixi.js';
import PointOfInterest from './PointOfInterest';
import Generator from './Generator';

export default class Map {
    constructor() {
        this.pois = [];
        this.displayObject = new PIXI.Container();

        let placed = 0;
        for (let attempts = 0; attempts < 20; attempts++) {
            let poi = new PointOfInterest();
            if (! this.collidesWithExistingPois(poi)) {
                this.pois.push(poi);
                this.displayObject.addChild(poi.displayObject);
                if (placed++ >= 3) {
                    return false;
                }
            }
        }
    }

    collidesWithExistingPois(poi) {
        for (let existingPoi of this.pois) {
            let a = existingPoi.displayObject;
            let b = poi.displayObject;

            if (a.x < b.x + b.width &&
                a.x + a.width > b.x &&
                a.y < b.y + b.height &&
                a.height + a.y > a.y) {
                return true;
            }
        }

        return false;
    }

    resize() {
    }

    update() {
    }
}
