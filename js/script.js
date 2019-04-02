var keys = {
    LEFT: 37,
    RIGHT: 39
};
var speed = 15;
var xSpeed = 8;
var ySpeed = 8;

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

var urlBase = document.URL;

//   Selecting canvas and defining some variables
var canvas = document.getElementById("main");
canvas.setAttribute('width', (parseInt(screenWidth * 0.98) + "px"));
canvas.setAttribute('height', (parseInt(screenHeight * 0.9) + "px"));
var paper = canvas.getContext("2d");

//Adding the listener to mmove the cevap
document.addEventListener("keydown", movingCevap);



// Super CrniLuk

var xc = (canvas.width / 2) * Math.random();
var yc = (canvas.height / 2) * Math.random();
var crniLuk = new Image();
crniLuk.src = urlBase+"/images/crniLuk.png";



//   SuperCevap
var x = canvas.width / 2;
var y;
var cevap = new Image();
cevap.src = urlBase+"/images/cevap.png";
var factorSize = 1;
var wCevap;
var hCevap;

//Initialize the cevap image
cevap.onload = function () {
    wCevap = cevap.width / factorSize;
    hCevap = cevap.height / factorSize;
    y = canvas.height - hCevap;
    paper.drawImage(cevap, x, y, wCevap, hCevap);
}

//Initialize the crniLuk image
crniLuk.onload = function () {
    paper.drawImage(crniLuk, xc, yc, crniLuk.width, crniLuk.height);
}

//Each time I want to draw everything I call this function
function drawingElements() {
    paper.drawImage(crniLuk, xc, yc, crniLuk.width, crniLuk.height);
    paper.drawImage(cevap, x, y, wCevap, hCevap);
}

// Here I put the 'ball' in action, each 0.05s
var moving = setInterval(crniLukMoving, 50);

//function that have all the logic
function crniLukMoving() {
    erasePaper(canvas, paper);
    xc += xSpeed;
    yc += ySpeed;

    //Bouncing the walls
    if (xc < 0) xSpeed = (-1) * xSpeed;
    if ((xc + crniLuk.width) > canvas.width) xSpeed = (-1) * xSpeed;
    if (yc < 0) ySpeed = (-1) * ySpeed;

    //Game Over
    if (yc > canvas.height) {
        clearInterval(moving);
        document.getElementById('end').style.display = "block";
    }

    //Bouncing against cevap
    if (xc > x && (xc + crniLuk.width) < (x + cevap.width * 0.8) && (yc + crniLuk.height) > y) {
        var random = ((x + cevap.width / 1.35) - xc) / cevap.width;
        xSpeed = xSpeed * (random + 0.5);
        ySpeed = ySpeed * (random + 0.5);
        ySpeed = (-1) * ySpeed;
        yc += ySpeed - cevap.height * 0.5;
    }
    drawingElements();

}

//Control cevap
function movingCevap(event) {
    erasePaper(canvas, paper);
    switch (event.keyCode) {
        case keys.LEFT:
            x = x - speed;
            break;
        case keys.RIGHT:
            x = x + speed;
            break;
    }
    // Whatching the limits
    if (x + wCevap > canvas.width) x = canvas.width - wCevap
    if (x < 0) x = 0
    drawingElements();
}


//Clean the canvas
function erasePaper(canvas, paper) {
    paper.clearRect(0, 0, canvas.width, canvas.height);
}