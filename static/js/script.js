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
const DEALER = blackJackGame["you"];

document
  .querySelector("#blackJack-hit-button")
  .addEventListener("click", blackJackHit);

const hitSound = new Audio("static/sounds/swish.m4a");

function blackJackHit() {
  showCard();
}

function showCard() {
  let cardImage = document.createElement("img");
  console.log(cardImage);
  cardImage.src = "/static/images/Q.png";
  document.querySelector(YOU["div"]).appendChild(cardImage);
  hitSound.play();
}
