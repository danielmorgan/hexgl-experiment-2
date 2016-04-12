'use strict';

import PIXI from 'pixi.js';

export default class Entity {
    constructor() {
    }

    getDisplayObject() {
        return this.displayObject || new PIXI.Graphics();
    }
}