var canvas;
var drawing;
var gameState;
var randomNum;
var maxSpeed;
var isPressing = false;
var numEnemies = 10;

var drawGame = function() {
    var w = canvas.width;
    var h = canvas.height;

    drawing.fillStyle = "#000000";
    drawing.fillRect(0,0,w,h);

    drawSprite(gameState.background);
    drawSprite(gameState.background2);
    drawSprite(gameState.jeff);
    drawSprite(gameState.trex);

    for(var i = 0; i < numEnemies; i++) {
        drawSprite(gameState.enemies[i]);
    }
}

var animateGame = function()
{
    window.requestAnimationFrame(animateGame);

    var jeff = gameState.jeff;
    var background = gameState.background;
    var background2 = gameState.background2;
    var enemies = gameState.enemies;

    for(var i = 0; i < numEnemies; i++) {
        enemies[i].x += enemies[i].vx;
    }

    if(isPressing && jeff.vy > -2.0) {
        jeff.vy -= 0.05;
    }
    else if(!isPressing && jeff.vy < 3.0) {
        jeff.vy += 0.05;
    }

    background.x += background.vx;
    background2.x += background2.vx;

    if (jeff.y <= -20) {
        jeff.y += 1.0;
    }
    if (isColliding()){
        jeff.image = document.getElementById("Crash");
        drawSprite(gameState.jeff);

        alert("GAME OVER!");
        document.location.reload();
    }

    jeff.y += jeff.vy;

    if(background.x < -background.image.width) {
        background.x = background.image.width;
    }
    if(background2.x < -background2.image.width) {
        background2.x = background2.image.width;
    }

    drawGame();
}

var createSprite = function(imageName, x, y, vx, vy)
{
    var sprite = {};
    sprite.image = document.getElementById(imageName);
    sprite.x = x;
    sprite.y = y;
    sprite.w = sprite.image.width;
    sprite.h = sprite.image.height;
    sprite.vx = vx;
    sprite.vy = vy;
    return sprite;
}

var drawSprite = function(sprite)
{
    drawing.drawImage(sprite.image, sprite.x, sprite.y, sprite.w, sprite.h);
}

var onKeyUp = function(event)
{
    if(isPressing) {
        isPressing = false;
    }
}

var onKeyDown = function(event)
{
    if(event.charCode == 32 || event.keyCode == 32) {
        isPressing = true;
    }
    setTimeout(uselessFunction(), 500);
}

function isColliding()
{
    var jeff = gameState.jeff;
    var enemies = gameState.enemies;

    for(var i = 0; i < enemies.length; i++) {
        if(((jeff.x + jeff.w - 50 >= enemies[i].x && jeff.x <= enemies[i].x + enemies[i].w)  && ((jeff.y + jeff.h - 100 >= enemies[i].y) || (jeff.y >= enemies[i].y + enemies[i].h + 50))) || (jeff.y >= canvas.height - 75)) {
            return true;
        }
    }
}

function uselessFunction() {}

window.onload = function()
{
    canvas = document.getElementById("myCanvas");
    drawing = canvas.getContext("2d");

    gameState = {};
    gameState.jeff = createSprite("Jeff", 300, 200, 0.0, 3.0);
    gameState.background = createSprite("Background", 0, 0, -1.0, 0.0);
    gameState.background2 = createSprite("Background2", 1920, 0, -1.0, 0.0);
    gameState.trex = createSprite("Trex", canvas.width, canvas.height - 370, -4.0, 0.0);

    gameState.enemies = [];

    randomNum = Math.floor(Math.random() * numEnemies);

    for (var i=0; i< numEnemies; i++)
    {
        randomNum = 0.0;
        while(randomNum < 0.25) {
            randomNum = Math.random();
        }

        var enemy = createSprite("Trex", 5000, canvas.height - 370, -12.0 * randomNum, 0.0);
        var enemy = createSprite("Pt", 5000, randomNum * randomNum * 400, -15.0 * randomNum * randomNum, 0.0);

        gameState.enemies.push(enemy);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    animateGame();
}
