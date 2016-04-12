'use strict';

import Entity from './Entity';
import MapGenerator from './MapGenerator';

export default class Map extends Entity {
    constructor() {
        super();

        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        let w = 100;
        let h = 100;

        this.displayObject = new PIXI.Graphics();
        this.displayObject.lineStyle(20, 0xff00ff, 1);
        this.displayObject.beginFill(0xffff00, 1);
        this.displayObject.drawRect(x - w/2, y - h/2, w, h);
        this.displayObject.endFill();

        this.points = MapGenerator.generatePOIs(3);
    }

    update() {
        this.displayObject.alpha = Math.random();
        this.displayObject.x += Math.cos(performance.now() * 50);
        this.displayObject.y += Math.sin(performance.now() * 50);
    }
}
