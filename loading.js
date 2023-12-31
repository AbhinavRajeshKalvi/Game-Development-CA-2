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
        const textArray = ["AVOID OBSTACLES BY TIMING YOUR JUMP CAREFULLY.", "USE THE 'W A S D' TO MOVE YOUR SAMURAI" , "PRESS THE 'SpaceBar' TO SWING YOUR KATANA.", "REMEMBER THAT THE BACK OF THE ROCKS ARE MORE DANGEROUS" , "REACH AS FAR AS YOU CAN", "HAVE FUN!"]; // Array of texts to display
        const spanElement = document.querySelector('#changingText');

        function changeText() {
            spanElement.textContent = textArray[textIndex];
            textIndex = (textIndex + 1) % textArray.length;
        }

   
        const textChangeInterval = setInterval(changeText, 3500);

        setTimeout(() => {
            clearInterval(textChangeInterval); 
            window.location.href = './game/game.html';
        }, 24000);

        