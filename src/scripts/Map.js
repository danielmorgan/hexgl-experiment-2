'use strict';

import PIXI from 'pixi.js';
import Entity from './Entity';
import Generator from './Generator';

export default class Map extends Entity {
    constructor() {
        super();

        this.displayObject = new PIXI.Container();
        this.points = Generator.generatePOIs(3);

        this.points.forEach((point) => {
            let coords = Generator.pixelCoordinates(60);
            let noise = Generator.noise(coords.x, coords.y, 50, 50);
            this.displayObject.addChild(noise);
            this.displayObject.cacheAsBitmap;
        });
    }

    update() {
    }
}
