'use strict';

import PIXI from 'pixi.js';

export default class Generator {
    static pixelCoordinates(size = 0) {
        return {
            x: this._randomInt(0, window.innerWidth - size / 2),
            y: this._randomInt(0, window.innerHeight - size / 2)
        }
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
        let int = Math.floor(Math.random() * max - min);
        return int;
    }
}
