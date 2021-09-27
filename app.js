import { Wave } from "./wave.js";

import { SurferController } from "./surfer-controlloer.js";

import { Sun } from "./sun.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    this.sun = new Sun();

    this.waves = [
      new Wave("#0b57a2", 0.5, 6, 0.1, 0.5),
      new Wave("#50d2f9", 1.0, 8, 0.2, 0.7),
      new Wave("#4295f2", 1.5, 10, 0.3, 0.9),
    ];

    this.surferController = new SurferController();

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.seaWidth = document.body.clientWidth;
    this.seaHeight = document.body.clientHeight;

    this.canvas.width = this.seaWidth * 2;
    this.canvas.height = this.seaHeight * 2;

    this.ctx.scale(2, 2);

    this.sun.resize(this.seaWidth, this.seaHeight);

    for (let i = 0; i < this.waves.length; i++) {
      this.waves[i].resize(this.seaWidth, this.seaHeight);
    }

    this.surferController.resize(this.seaWidth, this.seaHeight);
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.seaWidth, this.seaHeight);

    this.sun.draw(this.ctx, t);

    let dots = [];
    for (let i = 0; i < this.waves.length; i++) {
      dots[i] = this.waves[i].draw(this.ctx);
    }

    this.surferController.draw(this.ctx, t, dots[2]);
  }
}

window.onload = () => {
  new App();
};
