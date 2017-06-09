/* Author: Lily Wu
   Date: June 8, 2017 */

//variables
var deck = [];
var stack1 = [];
var stack2 = [];
var card1;
var card2;
var cards1 = [];
var cards2 = [];
var inWar = false;
const $startButton = document.querySelector('#startButton');
const $player1 = document.querySelector('#player1');
const $player2 = document.querySelector('#player2');
const $player1Label = document.querySelector('#player1Label');
const $player2Label = document.querySelector('#player2Label');
const $card1 = document.querySelector('#player1Card');
const $card2 = document.querySelector('#player2Card');
const $fightButton = document.querySelector('#fightButton');
const $status = document.querySelector('#status');
const delayMillis = 2000; //2 seconds

function handleStartButton() {
  // make stacks appear
  // update stack height nums
  if ($startButton.innerHTML === 'Start Game') {
    $startButton.innerHTML = 'Restart Game';
    $player1Label.innerHTML = 'Player 1: 26 cards';
    $player2Label.innerHTML = 'Player 2: 26 cards';
  }
  else {
    $player1Label.innerHTML = 'Player 1: 26 cards';
    $player2Label.innerHTML = 'Player 2: 26 cards';
  }
  deck = [];
  stack1 = [];
  stack2 = [];
  for (var i = 2; i < 15; i++) {
  deck.push({val: i, suit: 'hearts'});
  deck.push({val: i, suit: 'diamonds'});
  deck.push({val: i, suit: 'clubs'});
  deck.push({val: i, suit: 'spades'});
  }
  shuffle(deck);
  console.log("shuffled the deck!!!!!!!!");
  stack1 = deck.slice(0,26);
  stack2 = deck.slice(26,52);
  $card1.src = 'images/card_back.png';
  $card2.src = 'images/card_back.png';
  $status.innerHTML = 'Press Fight to draw a card.';
}

function handleFightButton() {
  // play a round
  playRound();
}

function displayCards(c1, c2) {
  $card1.src = 'images/' + c1.val + '_of_' + c1.suit + '.png';
  $card2.src = 'images/' + c2.val + '_of_' + c2.suit + '.png';
}

function playRound() {
  console.log('starting playRound function');
  console.log('cards1.length = ' + cards1.length + ', cards2.length = ' + cards2.length);
  if (stack1.length == 0) {
    // player2 wins
    playing = false;
    $status.innerHTML = 'Player 1 is out of cards. Player 2 wins!!!'
    return false;
  }

  else if (stack2.length == 0) {
    // player1 wins
    playing = false;
    $status.innerHTML = 'Player 2 is out of cards. Player 1 wins!!!';
    return false;
  }

  card1 = stack1.shift();
  card2 = stack2.shift();
  cards1.push(card1); // facing up
  cards2.push(card2); // facing up

  displayCards(card1, card2);

  console.log('card1 is the ' + card1.val + ' of ' + card1.suit);
  console.log('card2 is the ' + card2.val + ' of ' + card2.suit);

  if (card1.val > card2.val) {
    // cards go to stack1
    $status.innerHTML = 'Card 1 is bigger.';
    stack1 = stack1.concat(cards1);
    stack1 = stack1.concat(cards2);
    cards1 = [], cards2 = [];
    inWar = false;
  }
  else if (card1.val < card2.val) {
    // cards go to stack2
    $status.innerHTML = 'Card 2 is bigger.';
    stack2 = stack2.concat(cards1);
    stack2 = stack2.concat(cards2);
    cards1 = [], cards2 = [];
    inWar = false;
  }
  else { // card values are equal
    $status.innerHTML = 'Cards are of same value. Enter war round!';
    console.log('cards are of same value, entering war round');
    cards1.push(stack1.shift()); // facing down
    cards2.push(stack2.shift()); // facing down
    inWar = true;
  }

  setTimeout(function() {
    $card1.src = 'images/card_back.png';
    $card2.src = 'images/card_back.png';
    if (!inWar) {
      $player1Label.innerHTML = 'Player 1: ' + stack1.length + ' cards';
      $player2Label.innerHTML = 'Player 2: ' + stack2.length + ' cards';
    }
    $status.innerHTML = 'Press Fight to draw another card.';
  }, delayMillis);

  return false;
}

// // warRound is called when card1 and card2 were the same
// function warRound(cards1, cards2) {
//   $status.innerHTML = 'In war round! Press Fight to draw another card.';
//   var inWar = true;
//   var card1, card2;
//   while (inWar) {
//     cards1.push(stack1.shift()); // facing down
//     cards2.push(stack2.shift()); // facing down

//     card1 = stack1.shift();
//     card2 = stack2.shift();
//     cards1.push(card1); // facing up
//     cards2.push(card2); // facing up
//     displayCards(card1, card2);

//     console.log('in a war round, cards1 contains:');
//     for (var i = 0; i < cards1.length; i++) {
//       console.log(cards1[i].val + ' of ' + cards1[i].suit);
//     }
//     console.log('and cards2 contains:');
//     for (var i = 0; i < cards2.length; i++) {
//       console.log(cards2[i].val + ' of ' + cards2[i].suit);
//     }

//     if (card1.val > card2.val) {
//       // cards go to stack1
//       stack1.concat(cards1);
//       stack1.concat(cards2);
//       console.log('in the war round, card1 won');
//       inWar = false;
//     }
//     else if (card1.val < card2.val) {
//       // cards go to stack2
//       stack2.concat(cards1);
//       stack2.concat(cards2);
//       console.log('in the war round, card2 won');
//       inWar = false;
//     }
//     // else if cards the same, enter another war round.
//     setTimeout(function() {
//       $card1.src = 'images/card_back.png';
//       $card2.src = 'images/card_back.png';
//     }, delayMillis);
//   } // end while
// }

// the fisher-yates shuffle
function shuffle(arr) {
  var i = 0, j= 0, temp = null;

  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}



$startButton.addEventListener('click', handleStartButton);
$fightButton.addEventListener('click', handleFightButton);



