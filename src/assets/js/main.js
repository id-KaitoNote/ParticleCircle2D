"use strict";

var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

var mouse = {
    x: undefined,
    y: undefined,
};

var maxRadius = 40;
var minRadius = 10;

var colorArray = ["#363ED9", "#364FD9", "#04B2D9", "#05DBF2", "#0CF2DB"];

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
});

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if (
            mouse.x - this.x < 50 &&
            mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 &&
            mouse.y - this.y > -50
        ) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    };
}

var circleArray = [];

for (var i = 0; i < 1800; i++) {
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = Math.random() - 0.5;
    var dy = Math.random() - 0.5;
    var radius = Math.random() * 3 + 1;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {

    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerWidth);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}

animate();


