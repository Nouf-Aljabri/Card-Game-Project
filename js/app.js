//---------------------------------varible
let min = 0;
let sec = 0;
let moveCounter = 0;
let heartCounter = 3;
let stopTime = true;
let clickedCard = [];
let matchCards = [];

let cards = document.querySelectorAll(".card");
const timer = document.querySelector("#timer");
const restart = document.querySelector("#restart");
const moves = document.querySelector("#moves");
const hearstList = document.querySelector("#heart");
const endGame = document.querySelector("#endGame");
const againButton = document.querySelector("#play-again");

//---------------------------------functions

//this function start the timer
function initTime() {
  if (stopTime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (sec < 10 || sec == 0) {
      sec = "0" + sec;
    }

    timer.innerHTML = min + ":" + sec;
    setTimeout("initTime()", 1000);
  }
}

//this function open the card
function openCard(card) {
  let isMatcheCard = matchCards.includes(card);

  if (clickedCard.length == 0 && !isMatcheCard) {
    card.classList.add("open");
    clickedCard.push(card);
    // increase move
    movment();
  } else if (clickedCard.length == 1 && !isMatcheCard) {
    if (!card.isSameNode(clickedCard[0])) {
      card.classList.add("open");
      clickedCard.push(card);
      // increase move
      movment();
    }
  }

  // check if the card match or not
  if (clickedCard.length == 2) {
    //match
    if (
      clickedCard[0].children[0].className ==
      clickedCard[1].children[0].className
    ) {
      match();
    } // not match
    else {
      setTimeout("notMatch()", 500);
    }
  }
}

//this function to handle not match cards
function notMatch() {
  for (const element of clickedCard) {
    element.classList.remove("open");
  }
  clickedCard = [];
}

//this function to handle match cards
function match() {
  for (const element of clickedCard) {
    element.classList.add("match");
    matchCards.push(element);
  }
  clickedCard = [];
  //all the cards are match 
  if (matchCards.length == 16) {
    
    stopTime = true;

    // show congratulations message
    endGame.classList.add("show");
    //show move, rate, time
    document.getElementById("finalMove").innerHTML = moveCounter;
    document.getElementById("heartRating").innerHTML = "Rating:" +hearstList.innerHTML;
    document.getElementById("totalTime").innerHTML = timer.innerHTML;
  }
}

//this function control the movment
function movment() {
  moveCounter++;
  moves.innerHTML = moveCounter + " moves";

  // remove one heart
  if (moveCounter == 16 || moveCounter == 24) {
    hearstList.children[heartCounter - 1].style.display = "none";
    heartCounter--;
  }
}

//this function restart the Game
function restartGame() {
  timer.innerHTML = "0:00";
  sec = 0;
  min = 0;
  moveCounter = 0;
  moves.innerHTML = moveCounter + " moves";
  matchCards = [];
  clickedCard = [];
  heartCounter = 3;
  // return all hearts
  for (let i = 0; i < hearstList.childElementCount; i++) {
    hearstList.children[i].style.display = "inline";
  }
  // return the cards
  for (const element of cards) {
    element.classList.remove("open");
    element.classList.remove("match");
  }
}

//this function shuffle the cards
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//---------------------------------event listeners
cards = shuffle(cards);

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", function () {
    let card = cards[i];

    // initiate the time
    if (stopTime == true) {
      stopTime = false;
      initTime();
    }
    // open the card
    openCard(card);
  });
}

//restart the game
restart.addEventListener("click", function () {
  stopTime = true;
  restartGame();
});

// play again
againButton.addEventListener("click", function () {
  endGame.classList.remove("show");
  restartGame();
});
