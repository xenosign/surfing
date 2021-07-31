export class Wave {
    constructor(color, speed, total, bottom, top) {
        this.color = color;
        this.speed = speed;
        this.total = total;
        this.bottom = bottom;
        this.top = top;
    }

    resize(seaWidth, seaHeight) {
        this.seaWidth = seaWidth;
        this.seaHeight = seaHeight;

        this.points = [];
        this.gap = Math.ceil(this.seaWidth / (this.total - 2));

        for (let i = 0; i < this.total; i++) {
            this.points[i] = {
                x: i * this.gap,
                y: this.getYpos(this.bottom, this.top),
            };
        }
    }

    drawWave(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();

        let cur = this.points[0];
        let prev = cur;

        let dots = [];
        cur.x += this.speed;

        if (cur.x > -this.gap) {
            this.points.unshift({
                x: -(this.gap * 2),
                y: this.getYpos(this.bottom, this.top)
            });
        } else if (cur.x > this.seaWidth + this.gap) {
            this.points.splice(-1);
        }

        ctx.moveTo(cur.x, cur.y);

        let prevCx = cur.x;
        let prevCy = cur.y;

        for (let i = 0; i < this.points.length; i++) {
            cur = this.points[i];
            cur.x += this.speed;
            const cx = (prev.x + cur.x) / 2;
            const cy = (prev.y + cur.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

            dots.push({
                x1: prevCx,
                y1: prevCy,
                x2: prev.x,
                y2: prev.y,
                x3: cx,
                y3: cy,
            });

            prev = cur;
            prevCx = cx;
            prevCy = cy;
        }

        ctx.lineTo(prev.x, prev.y);
        ctx.lineTo(this.seaWidth, this.seaHeight);
        ctx.lineTo(this.points[0].x, this.seaHeight);
        ctx.fill();

        return dots;
    }

    getYpos(bottom, top) {
        const min = this.seaHeight / 8;
        const max = this.seaWidth - min;
        return min + this.getMinMax(bottom, top) * max;
    }

    getMinMax(min, max) {
        return Math.random() * (max - min) + min;
    }
}