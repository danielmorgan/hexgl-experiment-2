'use strict';

import PIXI from 'pixi.js';
import $ from 'jquery';
import Stats from 'stats.js';

import Test from './Test';

class Bootstrapper {
    constructor() {
        this.$container = $('#container');
        this.stage = new PIXI.Container();
        this.renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
            backgroundColor: 0xd6cca9
        });
        this.stats = new Stats();

        this.$container.append(this.renderer.view);
        this.$container.append(this.stats.dom);

        this.entities = [
            new Test()
        ];

        this.bindEvents();
        this.update();
    }

    bindEvents() {
        $(window).on('resize', this.resize.bind(this));
    }

    resize() {
        this.renderer.resize(window.innerWidth, window.innerHeight);

        this.entities.forEach(entity => {
            if (typeof entity.resize == 'function') {
                entity.resize(window.innerWidth, window.innerHeight);
            }
        })
    }

    update() {
        this.stats.begin();
        this.entities.forEach(entity => {
            if (typeof entity.update == 'function') {
                entity.update();
            }
        });
        this.renderer.render(this.stage);
        this.stats.end();

        requestAnimationFrame(this.update.bind(this));
    }
}

new Bootstrapper();
