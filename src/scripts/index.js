'use strict';

import PIXI from 'pixi.js';
import $ from 'jquery';
import Stats from 'stats.js';
import Map from './Map';

class Bootstrapper {
    constructor() {
        this.$container = $('#container');
        this.stage = new PIXI.Container();
        this.renderer = new PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
            backgroundColor: 0xffff00,
            transparent: true
        });
        this.stats = new Stats();
        this.$container.append(this.renderer.view);
        this.$container.append(this.stats.dom);

        PIXI.loader.add('castle', 'img/castle.png');
        PIXI.loader.add('forest', 'img/forest.png');
        PIXI.loader.add('town', 'img/town.png');

        this.bindEvents();
    }

    bindEvents() {
        $(window).on('resize', this.resize.bind(this));
        $(window).on('keypress', e => {
           if (e.keyCode === 104) {
               $(this.stats.dom).toggle();
           }
        });
        PIXI.loader.load(() => {
            this.setupScene();
            this.update();
        });
    }

    setupScene() {
        this.updatables = [];
        this.resizables = [];

        let map = new Map();
        this.stage.addChild(map.displayObject);
        this.updatables.push(map);
        this.resizables.push(map);
    }

    resize() {
        this.renderer.resize(window.innerWidth, window.innerHeight);
        this.resizables.forEach(r => r.resize());
    }

    update() {
        this.stats.begin();
        this.updatables.forEach(u => u.update());
        this.renderer.render(this.stage);
        this.stats.end();

        console.log('update');
        requestAnimationFrame(this.update.bind(this));
    }
}

window.app = new Bootstrapper();
