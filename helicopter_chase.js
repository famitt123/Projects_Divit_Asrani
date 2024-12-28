// Project Name: Helicopter Chase Game
// This game is a simple 2D game where the player controls a helicopter that follows the mouse cursor
// The objective is to catch red dots that appear randomly on the screen and each dot caught increases the score by 1 each time

// Variables
var copter;
var speed = 2;
var score = 0;
var x;
var y;

function move(e) {
    // Get the current mouse coordinates
    var mouseX = e.getX();
    var mouseY = e.getY();

    // Get the current helicopter coordinates
    var copterX = copter.getX();
    var copterY = copter.getY();

    // Calculate the angle between the helicopter and the mouse pointer
    var direction = Math.atan2(mouseY - copterY, mouseX - copterX);

    // Convert the angle from radians to degrees and set it as the helicopter's rotation
    copter.setRotation(direction * 180 / Math.PI);

    // Move the helicopter towards the mouse position
    var deltaX = Math.cos(direction) * speed;
    var deltaY = Math.sin(direction) * speed;

    // Check for collisions with red dots
    var elem = getElementAt(copterX + deltaX, copterY + deltaY);
    if (elem && elem.isDot) {
        // Collision with a red dot, increase score, remove the dot, and respawn
        score++;
        remove(elem); // Remove the red dot from the canvas
        updateScore();
        respawnCopter();
    } else {
        // Move the helicopter
        copter.move(deltaX, deltaY);
    }
}

function setup() {
    // Create a new WebImage for the helicopter
    copter = new WebImage(ImageLibrary.Objects.helicopter);
    copter.setSize(50, 20);
    copter.setPosition(getWidth() / 2, getHeight() / 2);
    copter.setColor(Color.blue);
    add(copter);

    // Add the mouseMoveMethod to update the helicopter's movement and rotation
    mouseMoveMethod(move);

    // Initialize the score display
    createScoreDisplay();
}

// outputs Score board top left of the screen
function createScoreDisplay() {
    var scoreLabel = new Text("Score: 0");
    scoreLabel.setPosition(20, 20);
    add(scoreLabel);
}

// updates score when helicopter touches red dot
function updateScore() {
    var scoreLabel = getElementAt(20, 20);
    if (scoreLabel) {
        scoreLabel.setText("Score: " + score);
    }
}

// allows helicopter to respawn
function respawnCopter() {
    copter.setPosition(getWidth() / 2, getHeight() / 2);
}

// allows function to start
function start() {
    setup();
    checkWalls();
    mouseMoveMethod(move);
    setTimer(reddot, 6000);
}
// allows the red dot to randomly get outputted around the screen except outside the map
function reddot() {
    var x = Randomizer.nextInt(20, getWidth() - 20);
    var y = Randomizer.nextInt(20, getHeight() - 20);
    var dot = new Circle(20);
    dot.setPosition(x, y);
    dot.setColor(Color.red);
    dot.isDot = true;
    add(dot);
}

function collusion() {
    var copterX = copter.getX();
    var copterY = copter.getY();
    var elem = getElementAt(copterX, copterY);
    if (elem && elem.isDot) {
        drawMessage("You Lose.");
        stopTimer(move);
        stopTimer(reddot);
    }
}

//function allows copter to stay on screen
function checkWalls() {
     x = copter.getX();
     y = copter.getY();
    // Get the current position and size of the copter

    var copterWidth = copter.getWidth();
    var copterHeight = copter.getHeight();

    // Right wall collision
    if (x + copterWidth > getWidth()) {
        copter.setPosition(getWidth() - copterWidth, y); // Move copter inside the screen
        dx = -dx; // Reverse the horizontal velocity
    }

    // Left wall collision
    if (x < 0) {
        copter.setPosition(0, y); // Move copter inside the screen
        dx = -dx; // Reverse the horizontal velocity
    }

    // Bottom wall collision
    if (y + copterHeight > getHeight()) {
        copter.setPosition(x, getHeight() - copterHeight); // Move copter inside the screen
        dy = dy; // Reverse the vertical velocity
    }

    // Top wall collision
    if (y < 0) {
        copter.setPosition(x, 0); // Move copter inside the screen
        dy = dy; // Reverse the vertical velocity
       
    }
}
