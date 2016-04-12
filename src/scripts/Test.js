'use strict';

export default class Test {
    constructor() {
        console.log('Test::constructor');
    }

    resize(w, h) {
        console.log('Test::resize', w, h)
    }

    update() {
        console.log('Test::update');
    }
}
