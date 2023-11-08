const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
let score = 0;
let highScore = parseInt(localStorage.getItem('highScore')) || 0;



function incrementScore() {
  score += 1;
}

const scoreIncrementInterval = setInterval(incrementScore, 100);

canvas.width = window.innerWidth
canvas.height = window.innerHeight

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.6

const background = new Sprite({
    position: {
      x: 0,
      y: -40,
      scale: 3,
    },
    imageSrc: './img/background.png',
  })
  const shop = new Sprite({
    position: {
      x: 1200,
      y: 327
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6
  })
  
  const player = new Fighter({
    position: {
      x: 0,
      y: 330
    },
    velocity: {
      x: 0,
      y: 0
    },
    offset: {
      x: 0,
      y: -300
    }, 
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
      x: 75,
      y: -45
    },
    sprites: {
      idle: {
        imageSrc: './img/samuraiMack/Idle.png',
        framesMax: 8
      },
      run: {
        imageSrc: './img/samuraiMack/Run.png',
        framesMax: 8
      },
      jump: {
        imageSrc: './img/samuraiMack/Jump.png',
        framesMax: 2
      },
      fall: {
        imageSrc: './img/samuraiMack/Fall.png',
        framesMax: 2
      },
      attack1: {
        imageSrc: './img/samuraiMack/Attack1.png',
        framesMax: 6
      },
      takeHit: {
        imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
        framesMax: 4
      },
      death: {
        imageSrc: './img/samuraiMack/Death.png',
        framesMax: 6
      }
    },
    attackBox: {
      offset: {
        x: 100,
        y: 50
      },
      width: 160,
      height: 50
    }
  })

  console.log(player)

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  w: {
    pressed: false,
  },
}

let isOnGround = true;



class Obstacle extends Sprite {
  constructor({
    position,
    velocity,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 }
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset
    });

    this.velocity = velocity;
  }

  update() {
    this.position.x += this.velocity.x;
    // Add more logic here, such as removing the obstacle when it goes out of the canvas
  }
}

const obstacles = []; // Array to store obstacles

function createObstacle() {
  // Create an obstacle with random properties
  const obstacle = new Obstacle({
    position: {
      x: canvas.width,
      y: 543 // Adjust this to the desired Y position
    },
    velocity: {
      x: -5 // Adjust the speed of the obstacle
    },
    imageSrc: './img/rock1.png', // Specify the image path for obstacles
    scale: 1, // Adjust the scale
    framesMax: 1 // Adjust the number of frames
  });
  

  obstacles.push(obstacle); // Add the obstacle to the array
}

function isColliding(obj1, obj2) {
  return (
    obj1.position.x < obj2.position.x + obj2.width &&
    obj1.position.x + obj1.width > obj2.position.x &&
    obj1.position.y < obj2.position.y + obj2.height &&
    obj1.position.y + obj1.height > obj2.position.y
  );
}

function calculateScore() {
  // Your score calculation logic here
  return 0; // Replace 0 with the actual score value
}

function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
  }
}


function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  shop.update()
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  
  player.velocity.x = 0

  if (!isOnGround) {
    player.velocity.y += gravity;
  }

  if (player.position.y >= 330) {
    player.position.y = 330; // Ensure the player is on the ground
    isOnGround = true; // Reset isOnGround flag only when the character lands
  }


  let collisionDetected = false;

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].draw();
       // Check for collision between the player and obstacles
    if (isColliding(player, obstacles[i])) {
      // Set the player's sprite to "dead"
      player.switchSprite('death');
      player.dead = true;
      collisionDetected = true;
      updateHighScore();
      localStorage.setItem('score', score);
      if (player.dead) {
        
        window.location.href = '../gameover.html';
      }
      createObstacle = false
    }

    if (obstacles[i].position.x + obstacles[i].width < 0) { 
      // Remove obstacles that are out of the canvas
      obstacles.splice(i, 1);
    }
  }

  // Create new obstacles at regular intervals
  c.font = '35px Samurai Blast';
  c.fillStyle = 'black';
  c.fillText('Score: ' + score, 20, 40);

  if (!collisionDetected) {
    // Create new obstacles at regular intervals only if no collision occurred
    if (Math.random() < 0.009) {
      createObstacle();
    }
  } else {
    // Game over, clear the score incrementing interval
    clearInterval(scoreIncrementInterval);
  }


  // player movement

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5
    player.switchSprite('run')
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5
    player.switchSprite('run')
  } else {
    player.switchSprite('idle')
  }

  // jumping
  if (player.velocity.y < 0) {
    player.switchSprite('jump')
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
  }

}
animate()
window.addEventListener('keydown', (event) => {
    if (!player.dead) {
      switch (event.key) {
        case 'd':
          keys.d.pressed = true
          player.lastKey = 'd'
          break
        case 'a':
          keys.a.pressed = true
          player.lastKey = 'a'
          break
        case 'w':
          if (isOnGround) {
            player.velocity.y = -33;
            isOnGround = false; // Set to false after jumping
          }
          break;
        case ' ':
          player.attack()
          break
      }
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
      case 'd':
        keys.d.pressed = false
        break
      case 'a':
        keys.a.pressed = false
        break
    }
  })

