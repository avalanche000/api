"use strict";

const twoPI = 2 * Math.PI;

class DrawingUtils {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx || canvas.getContext("2d");
    }

    clearRect(x, y, w, h) {
        this.ctx.clearRect(x, y, w, h);
    }

    clear() {
        this.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    rect(color, x, y, w, h) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
    }

    circle(color, x, y, radius, w) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, twoPI);
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        if (w) {
            this.ctx.strokeWidth = w;
            this.ctx.stroke();
        } else {
            this.ctx.fill();
        }
        this.ctx.closePath();
    }

    line(color, startx, starty, endx, endy, width = 3) {
        this.ctx.beginPath();
        this.ctx.lineWidth = width;
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(startx, starty);
        this.ctx.lineTo(endx, endy);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    poly(color, points) {
        this.ctx.beginPath();
        this.ctx.moveTo(...points[0]);
        points.forEach((point, idx) => {
            if (idx != 0) this.ctx.lineTo(...point);
        });
        this.ctx.closePath();
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    fill(color) {
        this.rect(color, 0, 0, this.canvas.width, this.canvas.height);
    }

    image(image, x, y) {
        this.ctx.drawImage(image, x, y);
    }
}


class CanvasUtils {
    constructor(canvas, target_elm) {
        this.canvas = canvas || document.createElement("canvas");
        this.target_elm = target_elm || this.canvas.parentNode || window.document.body;
        this.canvas.width = this.target_elm.clientWidth;
        this.canvas.height = this.target_elm.clientHeight;
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.events = [
            {
                name: "resize",
                callback: () => {
                    this.canvas.width = this.target_elm.clientWidth;
                    this.canvas.height = this.target_elm.clientHeight;
                }
            },
        ];
        this.addEventListeners();
        this.draw = new DrawingUtils(this.canvas);
    }

    addToTarget() {
        if (!this.target_elm.contains(this.canvas)) {
            this.target_elm.appendChild(this.canvas);
        }
    }

    addEventListeners() {
        this.events.forEach(event => {
            window.addEventListener(event.name, event.callback);
        });
    }

    removeEventListeners() {
        this.events.forEach(event => {
            window.removeEventListener(event.name, event.callback);
        });
    }

    setEventListener(index, callback) {
        this.removeEventListeners();
        this.events[index].callback = callback;
        this.addEventListeners();
    }

    setTarget(element) {
        this.removeEventListeners();
        this.target_elm = element;
        this.addEventListeners();
    }
}

export default CanvasUtils;
