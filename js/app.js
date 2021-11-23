//---------------------------------varible
let min = 0;
let sec = 0;
let moveCounter = 0;
let heartCounter = 3;
let stopTime = true;
let clickedCards = [];
let matchCards = [];

const cards = document.querySelectorAll(".card");
const deck = document.querySelector("#deck");
let cardsArray = Array.from(cards);
const timer = document.querySelector("#timer");
const restart = document.querySelector("#restart");
const moves = document.querySelector("#moves");
const heartsList = document.querySelector("#heart");
const endGame = document.querySelector("#endGame");
const againButton = document.querySelector("#play-again");

//---------------------------------functions

// this function to called the shuffle 
initCardShuffle();
function initCardShuffle(){
  let cardsAfterShuffle = shuffle(cardsArray);
  for(const card of cardsAfterShuffle){
    deck.appendChild(card);
  }
  
}

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
  let isMatchedCard = matchCards.includes(card);

  if (clickedCards.length == 0 && !isMatchedCard) {
    card.classList.add("open");
    clickedCards.push(card);

  } else if (clickedCards.length == 1 && !isMatchedCard) {
    if (!card.isSameNode(clickedCards[0])) {
      card.classList.add("open");
      clickedCards.push(card);
      // increase move
      movment();
    }
  }

  // check if the card match or not
  if (clickedCards.length == 2) {
    //match
    if (
      clickedCards[0].children[0].className ==
      clickedCards[1].children[0].className
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
  for (const element of clickedCards) {
    element.classList.remove("open");
  }
  clickedCards = [];
}

//this function to handle match cards
function match() {
  for (const element of clickedCards) {
    element.classList.add("match");
    matchCards.push(element);
  }
  clickedCards = [];
  //all the cards are match 
  if (matchCards.length == 16) {
    
    stopTime = true;

    // show congratulations message
    endGame.classList.add("show");
    //show move, rate, time
    document.getElementById("finalMove").innerHTML = moveCounter;
    document.getElementById("heartRating").innerHTML = "Rating:  &nbsp" +heartsList.innerHTML;
    document.getElementById("totalTime").innerHTML = timer.innerHTML;
  }
}

//this function control the movment
function movment() {
  moveCounter++;
  moves.innerHTML = moveCounter + " moves";

  // remove one heart
  if (moveCounter == 16 || moveCounter == 24) {
    heartsList.children[heartCounter - 1].style.display = "none";
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
  clickedCards = [];
  heartCounter = 3;
  // return all hearts
  for (let i = 0; i < heartsList.childElementCount; i++) {
    heartsList.children[i].style.display = "inline";
  }
  // return the cards
  for (const element of cards) {
    element.classList.remove("open");
    element.classList.remove("match");
  }
  // shuffle 
  initCardShuffle();
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
