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
};
const YOU = blackJackGame["you"];
const DEALER = blackJackGame["dealer"];
//Click event listeners
document
  .querySelector("#blackJack-hit-button")
  .addEventListener("click", blackJackHit);

document
  .querySelector("#blackJack-deal-button")
  .addEventListener("click", blackjackDeal);

//Hit button function
function blackJackHit() {
  let card = randomCard();
  console.log(card);
  /*  if(card === blackJackGame.cardsMap.A) { 
    console.log("ACE")
  } */
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
  let cardImage = document.createElement("img");
  cardImage.src = `static/images/${card}.png`;
  document.querySelector(activePlayer["div"]).appendChild(cardImage);
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
  document.querySelector(activePlayer["scoreSpan"]).textContent =
    activePlayer["score"];
}
