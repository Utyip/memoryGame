const gameBoard = document.getElementById('game-board');
const cardsImg = ["./img/2_of_clubs.png", "./img/3_of_clubs.png", "./img/4_of_clubs.png", "./img/5_of_clubs.png"];
const cardback = "./img/card_back.png";
let cards = [];

function Populate() { //kártyák össze állítása
  let num = 0;
  document.getElementById('resetBtn').classList.add('d-none')
  cardsImg.forEach((image, index) => {
    for (let i = 0; i < 2; i++) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.value = num;

      const cardInner = document.createElement('div');
      cardInner.classList.add('card-inner');
      card.appendChild(cardInner);

      const front = document.createElement('div');
      front.classList.add('front', 'd-flex', 'justify-content-center','col-md-3', 'col-sm-6', 'col-lg-3', 'mt-4');
      front.style.backgroundImage = `url(${cardback})`;
      cardInner.appendChild(front);

      const back = document.createElement('div');
      back.classList.add('back', 'd-flex', 'justify-content-center','col-md-3', 'col-sm-6', 'col-lg-3', 'mt-4');
      back.style.backgroundImage = `url(${image})`;
      cardInner.appendChild(back);

      card.addEventListener('click', OneClick);
      cards.push(card);
    }
    num++;
  });
  Shuffle();
}

function Shuffle() {
  cards.sort(() => 0.6 - Math.random());
  cards.forEach(card => gameBoard.appendChild(card));
}

let selectedCards = [];
let moves = 0;

function OneClick(event) {
  const clickedCard = event.currentTarget;

  if (!clickedCard.classList.contains('flipped') && selectedCards.length < 2) {     // ha a tömbben nincs benne és nincs nem rendelkezik a flipped classal
    clickedCard.classList.add('flipped');       //megkapja a flipped
    selectedCards.push(clickedCard);       //bekerül a tömbe
  if (selectedCards.length === 2) {
    setTimeout(CheckMatch, 500);    
    }
  }
}

function CheckMatch() {
  const [card1, card2] = selectedCards;
  const value1 = card1.dataset.value;
  const value2 = card2.dataset.value;

  if (value1 === value2) {              //megnézi hogy meg egyeznek-e
    card1.classList.add('matched');
    card2.classList.add('matched');
  } else {                              //ha nem le veszia flippet hogy vissza forduljanak
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }

  selectedCards = [];
  moves++;

  if (document.querySelectorAll('.matched').length === cards.length) { //ha a 2 megegyezik akkor nyert és közli 
    alert(`Congratulations! You completed the game in ${moves} moves.`);
    document.getElementById('resetBtn').classList.remove('d-none')
  }
}

function Reset() {      //minden alapra
  moves=0;
  selectedCards=[];
  cards=[];
  gameBoard.innerHTML = ''; 
  Populate();
}


Populate();