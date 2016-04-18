'use strict';

import PIXI from 'pixi.js';

export default class Generator {
    static sprite() {
        let key = Object.keys(PIXI.loader.resources)[this._randomInt(0, Object.keys(PIXI.loader.resources).length)];
        return PIXI.loader.resources[key].texture;
    }
    
    static coordinates(size = 0) {
        return new PIXI.Point(
            this._randomInt(0, window.innerWidth - size),
            this._randomInt(0, window.innerHeight - size)
        );
    }

    static height() {
        return this._randomInt(0, 255);
    }

    static heightColor(height) {
        let hexHeight = height.toString(16);
        return '0x' + hexHeight + hexHeight + hexHeight;
    }

    static noise(originX, originY, w, h) {
        let c = new PIXI.Container();

        for (let x = originX; x < w + originX; x++) {
            for (let y = originX; y < h + originY; y++) {
                let g = new PIXI.Graphics()
                g.beginFill(this.heightColor(this.height()), 1);
                g.drawRect(x, y, 1, 1);
                g.endFill();
                c.addChild(g);
            }
        }

        return c;
    }

    static _randomInt(min = 0, max = 1) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
