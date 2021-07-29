import {
    Wave
} from './wave.js'

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.waves = [
            new Wave('#0b57a2', 0.2, 4),
            new Wave('#50d2f9', 0.5, 5),
            new Wave('#4295f2', 1.4, 6),
        ];

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.seaWidth = document.body.clientWidth;
        this.seaHeight = document.body.clientHeight;

        this.canvas.width = this.seaWidth * 2;
        this.canvas.height = this.seaHeight * 2;

        this.ctx.scale(2, 2);

        for (let i = 0; i < this.waves.length; i++) {
            this.waves[i].resize(this.seaWidth, this.seaHeight);
        }
    }

    animate (t) {
        requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.seaWidth, this.seaHeight);

        let dots;
        for (let i = 0; i < this.waves.length; i++) {
            dots = this.waves[i].drawWave(this.ctx);
        }

    }
}

window.onload = () => {
    new App();
};

