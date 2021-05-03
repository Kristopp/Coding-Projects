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
    A: 10,
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
  showCard(YOU, card);
  upDateScore(YOU, card);
  showScore(YOU)
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
  //we increment active player score to value of given card in our card map
  activePlayer["score"] += blackJackGame["cardsMap"][card];
  console.log(activePlayer["score"]);
}

//Update frond end
function showScore(activePlayer) { 
  document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  console.log(activePlayer['scoreSpan'])
}