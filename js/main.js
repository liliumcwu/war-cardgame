/* Author: Lily Wu
   Date: June 8, 2017 */

//variables
var deck = [];
var stack1 = [];
var stack2 = [];
const $startButton = document.querySelector('#startButton');
const $player1 = document.querySelector('#player1');
const $player2 = document.queryselector('#player2');
const $fightButton = document.querySelector('#fightButton');

for (var i = 2; i < 15; i++) {
  deck.push({val: i, suit: 'hearts'});
  deck.push({val: i, suit: 'diamonds'});
  deck.push({val: i, suit: 'clubs'});
  deck.push({val: i, suit: 'spades'});
}

// for (var i = 0; i < deck.length; i++) {
//   console.log("deck[i].val is " + deck[i].val);
//   console.log("suit is " + deck[i].suit);
// }
shuffle(deck);
console.log("shuffled the deck!!!!!!!!");
// for (var i = 0; i < deck.length; i++) {
//   console.log("deck[i].val is " + deck[i].val);
//   console.log("suit is " + deck[i].suit);
// }

stack1 = deck.slice(0,26);
stack2 = deck.slice(26,52);
// var playing = true;
console.log('going to play 4 rounds');
for (var i = 0; i < 4; i++) {
  playRound();
}
// while (playing) {
//   playRound();
// }

function handleStartButton() {
  // make stacks appear
  // update stack height nums
}

function handleFightButton() {
  //
}

function playRound() {
  console.log('starting playRound function');
  if (stack1.length == 0) {
    // player2 wins
    playing = false;
    console.log('player2 won');
    return false;
  }

  else if (stack2.length == 0) {
    // player1 wins
    playing = false;
    console.log('player1 won');
    return false;
  }

  var card1 = stack1.shift();
  var card2 = stack2.shift();

  console.log('card1 is the ' + card1.val + ' of ' + card1.suit);
  console.log('card2 is the ' + card2.val + ' of ' + card2.suit);

  if (card1.val > card2.val) {
    // cards go to stack1
    console.log('card1 is bigger');
    stack1.push(card1);
    stack1.push(card2);
  }
  else if (card1.val < card2.val) {
    // cards go to stack2
    console.log('card2 is bigger');
    stack1.push(card1);
    stack1.push(card2);
  }
  else { // card values are equal
    console.log('cards are the same');
    warRound([card1], [card2]);
  }
  return false;
}

// warRound is called when card1 and card2 were the same
function warRound(cards1, cards2) {
  console.log('starting warRound function');
  var inWar = true;
  var card1, card2;
  while (inWar) {
    cards1.push(stack1.shift()); // facing down
    cards2.push(stack2.shift()); // facing down

    card1 = stack1.shift();
    card2 = stack2.shift();
    cards1.push(card1); // facing up
    cards2.push(card2); // facing up

    console.log('in a war round, cards1 contains:');
    for (var i = 0; i < cards1.length; i++) {
      console.log(cards1[i].val + ' of ' + cards1[i].suit);
    }
    console.log('and cards2 contains:');
    for (var i = 0; i < cards2.length; i++) {
      console.log(cards2[i].val + ' of ' + cards2[i].suit);
    }

    if (card1.val > card2.val) {
      // cards go to stack1
      stack1.concat(cards1);
      stack1.concat(cards2);
      console.log('in the war round, card1 won');
      inWar = false;
    }
    else if (card1.val < card2.val) {
      // cards go to stack2
      stack2.concat(cards1);
      stack2.concat(cards2);
      console.log('in the war round, card2 won');
      inWar = false;
    }
    // else if cards the same, enter another war round.
  } // end while
}

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



