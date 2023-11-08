const score = localStorage.getItem('score');
if (score) {
    // Use the retrieved score value
    document.getElementById('scoreDisplay').textContent = `Score: ${score}`;
  } else {
    // Handle the case where the score is not found in localStorage
    document.getElementById('scoreDisplay').textContent = 'Score not available';
  }

  const highScore = parseInt(localStorage.getItem('highScore')) || 0;

// Display the high score in an HTML element
document.getElementById('highScoreDisplay').textContent = `High Score: ${highScore}`;


