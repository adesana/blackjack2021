
var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0; 

var hidden;
var deck;


var canHit = true; //allows the player (you) to draw while yourSum <= 21


window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck(){
    let values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
    let types = ['C','D','H','S']
    deck = [];

    for (let i = 0; i<types.length; i++){
        for(let j = 0; j < values.length; j++){
        deck.push(values[j]+ '-' + types[i]);
        }
    }
    console.log(deck)
}

function shuffleDeck(){
    for(let i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i]
        deck[i] = deck[j]
        deck[j] = temp

    }
    console.log(deck)
}

function startGame(){
    hidden = deck.pop();
    dealerSum += getValue(hidden)
    dealerAceCount += checkAce(hidden);
    console.log(hidden)
    console.log(dealerSum)
    for (let i = 0; i < 1; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "images/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-hand").append(cardImg);
        console.log(dealerSum)
    }
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "images/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("player-hand").append(cardImg);
        console.log('yourSum' + yourSum)
    }
    document.getElementById("hit-button").addEventListener("click", hit);
    document.getElementById("stand-button").addEventListener("click", stay);
    document.getElementById("deal-button").addEventListener('click', deal)

}

function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "images/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("player-hand").append(cardImg);
    console.log(yourSum)

    if(yourSum > 21){
        canHit = false
    }
}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "images/" + hidden + ".png";

    let message = "";
    if (yourSum > 21) {
        message = "You Lose!";
    }
    else if (dealerSum > 21) {
        message = "You win!";
    }
    else if (yourSum == dealerSum) {
        message = "Tie!";
    }
    else if (yourSum > dealerSum) {
        message = "You Win!";
    }
    else if (yourSum < dealerSum) {
        message = "You Lose!";
    }

    document.getElementById("dealer-points").innerText = dealerSum;
    document.getElementById("player-points").innerText = yourSum;
    document.getElementById("messages").innerText = message;
}

function getValue(card) {
    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)) { //A J Q K
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}


function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

// function deal(){
//     shuffleDeck
//     startGame
// }