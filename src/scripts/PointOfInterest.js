'use strict';

import PIXI from 'pixi.js';
import Generator from './Generator';

export default class PointOfInterest {
    constructor(name = 'Foo Keep', type = 'Castle', description) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.displayObject = new PIXI.Sprite(Generator.sprite());
        this.displayObject.width = this.displayObject.height = 200;
    }
}
