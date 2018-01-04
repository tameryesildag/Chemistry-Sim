var y = 100;
var canvas
var i = 1;
function setup() {
 canvas = createCanvas(720, 400);
 canvas.position(350, 200);
 canvas.class("lemon");
 frameRate(100);
}

function draw() {
    background(0);
    stroke(255);
    line(0, y, width, y);
  //  window.alert(canvas.height);
    if (y >= canvas.height) {
        i = -1;
    }
    if (y == 0) {
        i = 1;
    }
    y = y + i;
}