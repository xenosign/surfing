import { Surfer } from "./surfer.js";

export class SurferController {
  constructor() {
    this.img = new Image();
    this.img.onload = () => {
      this.loaded();
    };
    this.img.src = "surfer.png";

    this.items = [];

    this.cur = 0;
    this.isLoaded = false;
  }

  resize(seaWidth, seaHeight) {
    this.seaWidth = seaWidth;
    this.seaHeight = seaHeight;
  }

  loaded() {
    this.isLoaded = true;
    this.addSurfer();
  }

  addSurfer() {
    this.items.push(new Surfer(this.img, this.seaWidth));
  }

  draw(ctx, t, dots) {
    if (this.isLoaded) {
      this.cur += 1;
      if (this.cur > 300) {
        this.cur = 0;
        this.addSurfer();
      }

      for (let i = this.items.length - 1; i >= 0; i--) {
        const item = this.items[i];
        if (item.x < -item.width) {
          this.items.splice(i, 1);
        } else {
          item.draw(ctx, t, dots);
        }
      }
    }
  }
}
