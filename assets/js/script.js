/* ......................Variables.......................*/
let loopCount = 0;
let spaceshipVisible = false;
let score = 0;
let time = 45;


/*......................Event listeners ...............*/

// if statements to prevent console errors on landing page.

let play = document.getElementById("play-btn");
if (play) {
  play.addEventListener("click", startGame);
}

let reset = document.getElementById("reset-btn");
if (reset) {
  reset.addEventListener("click", refreshGame);
}

let muteOn = document.getElementById("audio-off");
if (muteOn) {
  muteOn.addEventListener("click", enableMute);
}

let muteOff = document.getElementById("audio-on");
if (muteOff) {
  muteOff.addEventListener("click", disableMute);
}

let home = document.getElementById("home-btn");
if (home) {
  home.addEventListener("click", returnHome);
}

let infoIcon = document.getElementById("game-info");
if (infoIcon) {
  infoIcon.addEventListener("click", openInfo);
}

let homeIcon = document.getElementById("home-icon");
if (homeIcon) {
  homeIcon.addEventListener("click", returnHome);
}



/* ......................Start Game.......................*/

// Start Game function:
// if the game game loop is not running then start it (defends multi presses on start button)
// call the game loop function.
// call the start timer function
function startGame() {
  if (!loopCount) {
    gameLoop();
    startTimer();
    playStart();
  }
}

/* ......................Game Loop.......................*/

// invert the spaceshipVisible variable, this alternates through the loop to facilitate spaceships on/off 
// call spaceships function.
// increment loopcount
// Game loop function:
// loop count set to 33.
// setTimeout wait time to call game loop again, visible 1sec invisible 1.8sec 
// call the scoreModal for results

function gameLoop() {
  spaceshipVisible = !spaceshipVisible;
  spaceships();
  loopCount++;
  if (loopCount < 33) {
    setTimeout(gameLoop, spaceshipVisible ? 1000 : 1800);
  } else {
    scoreModal();
  }
}


/* ......................Timer feature.......................*/

// counts down from 45 to 0.
// displays time in timer display
//plays game over music if not muted

function startTimer() {
  time = time - 1;
  if (time >= 0) {
    document.getElementById("time-display").innerHTML = (`Timer ${time}sec`);
    setTimeout(startTimer, 1000);
  }
  if (time === 0 && !audioGameOver.muted) {
    playGameOver();
  }
}


/* ......................create flashing effect, aliens, ufo, scoring ................*/

// spaceShips function:
// retrieve the game area div and define variable spaceShips .
// define SetClass to apply CSS display property for visible or invisible.  Depends if spaceshipVisible is true or false.
// loop through the 8 child divs and set as variable alien.
// Apply setClass value as a class for alien
// set onclick to:
// decrement the score.
// apply the score to the scoreboard.
// play sound effect.  
// for ufo create a random number between 1-8
// (use random-1 to translate 1-8 into index count 0-7)
// add .ufo class to apply ufo image.
// set onclick to:
// increment score.
// send the score to update the scoreboard.
// play sound effect.

function spaceships() {
  let spaceShips = document.getElementById("game-area");
  let setClass = spaceshipVisible ? "spaceship visible" : "spaceship invisible";
  //create aliens
  for (let i = 0; i < 8; i++) {
    let alien = spaceShips.children[i];
    alien.className = setClass;
    alien.onclick = function zapAlien() {
      score--;
      document.getElementById("player-score").innerText = "Crypto Coins " + score * 1000;
      playAlienSound();
    };
  }
  //create ufo
  let randomUfo = Math.floor(Math.random() * 8) + 1;
  let ufo = spaceShips.children[randomUfo - 1];
  ufo.className = setClass + " ufo";
  ufo.onclick = function zapUfo() {
    score++;
    document.getElementById("player-score").innerText = "Crypto Coins " + score * 1000;
    playUfoSound();
  };
}


/* ......................Reset Game feature.......................*/
// press reset button to reset game
function refreshGame() {
  window.location.reload();
}

/* ......................Return to homepage.......................*/
//prees home icon to return to landing page
function returnHome() {
  document.location.href = ('index.html');
}

/* ......................Audio sound effects.......................*/

let audioGameMusic = new Audio("assets/sounds/zap-game-music-cut.mp3");
let startBtn = new Audio("assets/sounds/start-sound.mp3");
let audioUfo = new Audio("assets/sounds/zap-ufo.mp3");
let audioCrypto = new Audio("assets/sounds/score-crypto.mp3");
let audioAlien = new Audio("assets/sounds/zap-alien.mp3");
let audioGameOver = new Audio("assets/sounds/game-over.mp3");

//sound effect for play button and game music.
function playStart() {
  audioGameMusic.play();
  startBtn.play();
}

//sound effect for zapping ufo
function playUfoSound() {
  audioUfo.play();
  audioCrypto.play();
}

//sound effect for zapping Alien
function playAlienSound() {
  audioAlien.play();
}

//sound effect for game over
function playGameOver() {
  let audioGameOver = new Audio("assets/sounds/game-over.mp3");
  audioGameOver.play();
}


/* .........................Audio mute feature.......................*/
function enableMute() {
  audioGameOver.muted = true;
  audioGameMusic.muted = true;
  startBtn.muted = true;
  audioUfo.muted = true;
  audioCrypto.muted = true;
  audioAlien.muted = true;
}

/* ......................Audio unmute feature.......................*/
function disableMute() {
  audioGameMusic.muted = false;
  startBtn.muted = false;
  audioUfo.muted = false;
  audioCrypto.muted = false;
  audioAlien.muted = false;
  audioGameOver.muted = false;
}


/* ......................Modal Game over score results.......................*/

// Get the modal
let modal = document.getElementById("resultsModal");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// Display score results modal with different messages
function scoreModal() {
  modal.style.display = "block";
  if (score < 1) {
    document.getElementById("score-result").innerHTML = "What happened out there? your zapp crypto balance is at " + score * 1000 + " crypto coins!!";
  } else if (score > 20) {
    document.getElementById("score-result").innerHTML = "Nailed it! " + score * 1000 + " crypto coins in the bag!";
  } else if (score > 15) {
    document.getElementById("score-result").innerHTML = "Sharp shooting out there!, you just scored " + score * 1000 + " crypto coins!!";
  } else if (score > 10) {
    document.getElementById("score-result").innerHTML = "Nice work, you zapped well . . . you scored " + score * 1000 + " crypto coins!!";
  } else if (score > 5) {
    document.getElementById("score-result").innerHTML = "Not bad, you scored " + score * 1000 + " crypto coins!!";
  } else if (score >= 1 && score <= 5) {
    document.getElementById("score-result").innerHTML = "OK you're warming up! you scored " + score * 1000 + " crypto coins!!";
  } else {
    document.getElementById("score-result").innerHTML = "Congratulations " + score * 1000 + " crypto coins!!";
  }
}

// close the modal with (X)
if (span) {
  span.onclick = function () {
    modal.style.display = "none";
    window.location.reload(); // refresh game when modal is closed
  };
}

// close the modal clicking anywhere on window
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    window.location.reload(); // refresh game when modal is closed
  }
};


/*......................Modal instruction information........................*/

// Get the modal
let infoModal = document.getElementById("infoModal");
// Get the <span> element that closes the modal
let infoSpan = document.getElementById("info-span");

// Display game instructions
function openInfo() {
  infoModal.style.display = "block";
  document.getElementById("info-paragraph").innerHTML = "Tap or click on the rogue UFO to score crypto coins . . . but be careful, if you tap or click on a friendly alien you will loose coins.";
}

// close the modal with (X)
if (infoSpan) {
  infoSpan.onclick = function () {
    infoModal.style.display = "none";
    window.location.reload(); // refresh game when modal is closed
  };
}
//close the modal clicking anywhere on window
window.onclick = function (event) {
  if (event.target == infoModal) {
    infoModal.style.display = "none";
    window.location.reload(); // refresh game when modal is closed
  }
};