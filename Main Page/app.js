let backgroundSound = new Audio("./Assets/song.mp3")
backgroundSound.play()
backgroundSound.loop = true


// var petalPlayers = [];

// function animatePetals() {
//   var petals = document.querySelectorAll('.petal');

//   for (var i = 0, len = petals.length; i < len; ++i) {
//     var petal = petals[i];
//     petal.innerHTML = '<div class="rotate"><img src="https://qqz.works/wp-content/uploads/2021/08/petal.png" class="askew"></div>';
//     var scale = Math.random() * .8 + .2;


//     var player = petal.animate([
//       { transform: 'translate3d(' + (i/len*100) + 'vw,0,0) scale(' + scale + ')', opacity: scale },
//       { transform: 'translate3d(' + (i/len*100 + 10) + 'vw,150vh,0) scale(' + scale + ')', opacity: 1 }
//     ], {
//       duration: Math.random() * 90000 + 3000,
//       iterations: Infinity,
//       delay: -(Math.random() * 5000)
//     });
    
//     petalPlayers.push(player);
//   }
// }

// animatePetals();


