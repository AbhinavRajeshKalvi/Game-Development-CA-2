const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'Rectangle 4.png';
const spriteWidth = 1024;
const spriteHeight = 1200;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrames = 10;

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight,
        spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
        if(gameFrame % staggerFrames == 0){
            if(frameX < 6) frameX++;
            else frameX = 0;
        }

        gameFrame++;
        requestAnimationFrame(animate);
};
animate();
   
let textIndex = 0;
        const textArray = ["AVOID OBSTACLES BY TIMING YOUR JUMP CAREFULLY.", "IF YOU COME ACROSS AN ENEMY,  PRESS THE 'X' TO SWING YOUR KATANA.", "IF YOU AVOID THE ENEMY, YOU WILL LOSE.","YOU CAN FIND POWERUPS THAT WILL AID YOU ON YOUR JOURNEY", "REACH AS FAR AS YOU CAN", "HAVE FUN!"]; // Array of texts to display
        const spanElement = document.querySelector('#changingText');

        function changeText() {
            spanElement.textContent = textArray[textIndex];
            textIndex = (textIndex + 1) % textArray.length;
        }

        // Set an interval to change the text every 5 seconds (5000 milliseconds)
        const textChangeInterval = setInterval(changeText, 3500);

        setTimeout(() => {
            clearInterval(textChangeInterval); // Stop the text change interval
            window.location.href = '../Game Page/game.html'; // Replace with the destination URL
        }, 24500);