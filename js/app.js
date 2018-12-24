/*
* Build by Ridha Rezzag for UDACITY project 7/01/2018
*/

/*
* Create a list that holds all of your cards
*/


/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//var nodesArray = [].slice.call(document.querySelectorAll('li.card'));
// get all  cards with a card class tag store them in liCards witch is node list
///let liCards = document.querySelectorAll('li.card');




var b=0;
let cardvalues = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];
//let cardvalues = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
// shuffle the array
shuffle(cardvalues);

startGame();

function startGame(){
  //create html elements inside the deck, witch is a list of cards each card contain a i tag
  for (let b=0; b<cardvalues.length; b++) {
    //create <li> tag for card class
    var card = document.createElement("li");
    //add the class card to the <li> tag
    card.classList.add("card");
    //get the deck class
    const deckElement = document.querySelector('.deck');
    // append the class card to the deck
    deckElement.appendChild(card);
    //create a <i> tag to append it to each card
    var subcard = document.createElement("i");
    //stor the card class value in variable cardname
    var cardname = cardvalues[b];
    // add class name to the card, each card will be assigned a diffrent class witch represent diffrent value example bomb or diamond...
    subcard.classList.add('fa', cardname);
    //appending the class name to the card
    card.appendChild(subcard);
  }
}

//after creating a list of cards witch is shuffled list now we need to get that list
// get all  cards with a card class tag store them in liCards witch is node list
let liCards = document.querySelectorAll('li.card');
//after getting the cards list witch is a nodelist we need to convert it to array list to work on it and store it in cards
let cards =[];

// array forloop value
let i = 0;

// new array to compare between clicked opened cards
let compareOpenCard = [];

// new array to store all matched cards in it so we can test if the game is finished
let matchedCardsList = [];

// moves counter
let moves = 0;

//looping thrue the node list cards
for (let i=0; i<liCards.length; i++) {
  //pushing card from node list to array list
  cards.push(liCards[i])

  // add addEventListener to each card
  cards[i].addEventListener("click", function displayCard(){

    // compare if the 2 opended card are matched after makig sure 2 cards get opened
    if(compareOpenCard.length === 1){
      // opening the secend clicked card
      cards[i].classList.add("show", 'open');
      //pushing the opened card to array to compare it with the first opened card
      compareOpenCard.push(cards[i]);
      //comparing the 2 cards on the array if they match
      if(compareOpenCard[0].innerHTML === compareOpenCard[1].innerHTML){
        console.log('matched');
        //when cards matched set matched
        compareOpenCard[0].classList.add("show", 'open', 'match', 'disable');
        compareOpenCard[1].classList.add("show", 'open', 'match', 'disable');

        //push the cards to matched array to count if game is finished
        matchedCardsList.push(compareOpenCard[0]);
        matchedCardsList.push(compareOpenCard[1]);

        //update the movesCounter
        movesCount();
        //reset the array compareOpenCard so we can work with for the second matching
        compareOpenCard = [];

        // applaying allMatched function to clarify the game finished
        allMatched();

        //if card on the array didnt match we enter the logic
      }else {
        // cards didnt match we set them to close after 500 milliseconds
        setTimeout(function() {
          console.log('does not match');
          compareOpenCard[0].classList.remove("show", 'open', 'disable');
          compareOpenCard[1].classList.remove("show", 'open', 'disable');
          //update the movesCounter
          movesCount();
          //reset array compareOpenCard,  so we can compare again
          compareOpenCard = [];
        }, 300);

      }

    }else {
      //if not 2 cards opened we start opening the first one and push it to the array compareOpenCard
      cards[i].classList.add("show", 'open', 'disable');
      compareOpenCard.push(cards[i]);

    }


  });

}


// if all cards matched alert the game is finished
function allMatched (){
  if(matchedCardsList.length === 16){
    clearInterval(interval);
    finalTime = timer.innerHTML;

    alert("Congratulation!!! game finished " + "\n" + "your time is " + finalTime + "\n" + "You won!!! " );

    console.log('game finished');

  }
}

// moves counter keep track of moves number  and update the html
function movesCount(){
  moves = moves + 1;
  // qyery the moves html and update it
  const movesNumber = document.querySelector('.moves');
  movesNumber.innerHTML = moves;
  // start timer
  if(moves === 1){
    startTimer();

  }else if ( moves === 6){
  document.querySelector('.star').remove();
}else if ( moves === 10){
  document.querySelector('.star').remove()
}else if ( moves === 15){
    document.querySelector('.star').remove()
  }else if ( moves === 20){
      document.querySelector('.star').remove()
      }


}

// restart button
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', function restartGame(){

  location.reload();
}  );


// game timer
var second = 0;
var minute = 0;
var hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
  interval = setInterval(function(){
    timer.innerHTML = minute+":"+second+"s";
    second++;
    if(second == 60){
      minute++;
      second=0;
    }
    if(minute == 60){
      hour++;
      minute = 0;
    }
  },1000);
}

//function to create a star element but not implemeted yet
 let starvalues = ["fa-star", "fa-star", "fa-star"];
 let starsNumber;
function onestars(){
  //create html elements inside the stars, witch is a list of stars each star contain a i tag
  for (let starsNumber=0; starsNumber<1; starsNumber++) {
    //create <li> tag for star class
    var star = document.createElement("li");
    //add the class star to the <li> tag
    //card.classList.add("card");
    //get the deck class
    const starsElement = document.querySelector('.stars');
    // append the class card to the deck
    starsElement.appendChild(star);
    //create a <i> tag to append it to each star
    var substar = document.createElement("i");
    //stor the card class value in variable cardname
    var starname = starvalues[starsNumber];
    // add class name to the card, each card will be assigned a diffrent class witch represent diffrent value example bomb or diamond...
    substar.classList.add('fa', starname);
    //appending the class name to the card
    star.appendChild(substar);
  }
}


/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/
