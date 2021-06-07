//Document selectors
//General game Data
let blackJackGame = {
  you: { scoreSpan: "#player-blackjack-result", div: "#your-box", score: 0 },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
  /* Array of card names so we could use them later in the template string */
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
  cardsMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 10,
    Q: 10,
    K: 10,
    A: [1, 11],
  },
  wins: 0,
  losses: 0,
  draws: 0,
};
const YOU = blackJackGame["you"];
const DEALER = blackJackGame["dealer"];
//Click HIT event listeners
document
  .querySelector("#blackJack-hit-button")
  .addEventListener("click", blackJackHit);
//Deal event handler
document
  .querySelector("#blackJack-deal-button")
  .addEventListener("click", blackjackDeal);
//Stand event Handler
document
  .querySelector("#blackJack-stand-button")
  .addEventListener("click", dealerLogic);

//Hit button function
function blackJackHit() {
  let card = randomCard();
  showCard(YOU, card);
  upDateScore(YOU, card);
  showScore(YOU);
}

//Helper function that creates randomCard
function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackJackGame.cards[randomIndex];
}
//function that renders card
function showCard(activePlayer, card) {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
  }
}
//Deal button removes all cards and creates new cards
function blackjackDeal() {
  let yourImages = document.querySelector("#your-box").querySelectorAll("img");
  let dealerImages = document
    .querySelector("#dealer-box")
    .querySelectorAll("img");
  for (let i = 0; i < yourImages.length; i++) {
    yourImages[i].remove();
  }
  for (let i = 0; i < dealerImages.length; i++) {
    dealerImages[i].remove();
  }
  YOU["score"] = 0;
  DEALER["score"] = 0;

  document.querySelector(YOU["scoreSpan"]).textContent = 0;
  document.querySelector(DEALER["scoreSpan"]).textContent = 0;
  document.querySelector(YOU["scoreSpan"]).style.color = "#212529";
  document.querySelector(DEALER["scoreSpan"]).style.color = "#212529";
}

function upDateScore(activePlayer, card) {
  //we need check if card is an ace
  if (card === "A") {
    //If ace buts us above 21 ace value becomes 1 else 11
    if (activePlayer["score"] + blackJackGame["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blackJackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackJackGame["cardsMap"][card][0];
    }
  } else {
    //if card is not ace just increment active player score with card value
    activePlayer["score"] += blackJackGame["cardsMap"][card];
  }
  // if ace keeps me below 21 else add 11
}

//Update frond end
function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

function dealerLogic() {
  let card = randomCard();
  showCard(DEALER, card);
  upDateScore(DEALER, card);
  showScore(DEALER);
  if (DEALER["score"] > 15) {
    let winner = computeWinner();
    showResult(winner);
  }
}
//This function declares who wins
function computeWinner() {
  let winner;
  if (YOU["score"] <= 21) {
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      winner = YOU;
      alert("You won!!");
      blackJackGame["wins"]++;
      //Dealer higher score win
    } else if (YOU["score"] < DEALER["score"]) {
      winner = DEALER;
      blackJackGame["losses"]++;
      alert("Dealer won!");
      //Equal score = draw
    } else if (YOU["score"] === DEALER["score"]) {
      alert("DRAW!!");
      blackJackGame["draws"]++;
    }
    //Player bust logic
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    winner = DEALER;
    blackJackGame["losses"]++;
    alert("Dealer win");
    //When both bust
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    alert("draw");
    blackJackGame["draws"]++;
  }
  return winner;
}

function showResult(winner) {
  let message, messageColor;
  console.log("winner");
  if (winner === YOU) {
    message = "You won!";
    messageColor = "green";
  } else if ((winner = DEALER)) {
    message = "Dealer won!";
    messageColor = "red";
  } else {
    message = "Draw";
    messageColor = "black";
  }
  document.querySelector("#blackjack-result").textContent = message;
  document.querySelector("#blackjack-result").style.color = messageColor;
  document.querySelector("#wins").textContent = blackJackGame["wins"];
  document.querySelector("#losses").textContent = blackJackGame["losses"];
  document.querySelector("#draws").textContent = blackJackGame["draws"];
}
