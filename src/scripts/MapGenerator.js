'use strict';

import PIXI from 'pixi.js';

import PointOfInterest from './PointOfInterest';

export default class MapGenerator {
    constructor() {
    }

    static generatePOIs(amount = 1) {
        let pointsOfInterest = [];

        let names = ['Foo Keep', 'Bar Castle', 'The Seat of Baz'];
        let types = ['Keep', 'Castle', 'Royal Palace'];

        for (let i = 0; i < amount; i++) {
            pointsOfInterest.push(new PointOfInterest(names[i], types[i]));
        }

        return pointsOfInterest;
    }
}
