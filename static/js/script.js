//Document selectors
let blackJackGame = {
  you: { scoreSpan: "#player-blackjack-result", div: "#your-box", score: 0 },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
};
const YOU = blackJackGame["you"];
const DEALER = blackJackGame["dealer"];

document
  .querySelector("#blackJack-hit-button")
  .addEventListener("click", blackJackHit);

document
  .querySelector("#blackJack-deal-button")
  .addEventListener("click", blackjackDeal);

const hitSound = new Audio("static/sounds/swish.m4a");

function blackJackHit() {
  showCard(YOU);
  showCard(DEALER);
}

function showCard(activePlayer) {
  let cardImage = document.createElement("img");
  console.log(cardImage);
  cardImage.src = "/static/images/Q.png";
  document.querySelector(activePlayer["div"]).appendChild(cardImage);
  hitSound.play();
}

function blackjackDeal() {
  let yourImages = document.querySelector("#your-box").querySelectorAll("img");
  let dealerImages = document.querySelector("#dealer-box").querySelectorAll("img");

  for (let i = 0; i < yourImages.length; i++) {
    yourImages[i].remove();
  }
  for (let i = 0; i < yourImages.length; i++) {
    dealerImages[i].remove();
  }
}
