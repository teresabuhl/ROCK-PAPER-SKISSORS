const gameSummary = {
  numbers: 0,
  wins: 0,
  losers: 0,
  draws: 0
}

const game = {
  playerHand: '',
  aiHand: ''
}

const hands = [...document.querySelectorAll('.select img')];

//Pierwsza funkcja

function handSelection() {
  // console.log(this);
  game.playerHand = this.dataset.option
  // console.log(game.playerHand);
  hands.forEach(hand => hand.style.boxShadow = '');
  this.style.boxShadow = '0 0 6px blue';
}

function aiChoice() {
  const aiHand = hands[Math.floor(Math.random() * 3)].dataset.option; //Math.random losuje liczbę z przedziału <0, 1), Math.floor obcina część ułamkową
  return aiHand;
}

function checkResult(player, ai) {
  // console.log(player, ai);

  if (player === ai) {
    // console.log('Remis');
    return 'TIE!'
  } else if ((player === 'paper' && ai === 'rock') || (player === 'rock' && ai === 'skissors') || (player === 'skissors' && ai === 'paper')) {
    // console.log('Wygrałeś!');
    return 'YOU WIN!'
  } else {
    // console.log('Przegrałeś!');
    return 'YOU LOST!';
  }
}

//Publikacja wyników

function publishResult(player, ai, result) {
  document.querySelector('[data-summary="your-choice"]').textContent = player;

  document.querySelector('[data-summary="ai-choice"]').textContent = ai;

  document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;

  if (result === 'YOU WIN!') {
    document.querySelector('p.wins span').textContent = ++gameSummary.wins;
    document.querySelector('[data-summary="who-win"]').textContent = "YOU WIN!"
    document.querySelector('[data-summary="who-win"]').style.color = 'green';
  } else if (result === 'YOU LOST!') {
    document.querySelector('p.losers span').textContent = ++gameSummary.losers;
    document.querySelector('[data-summary="who-win"]').textContent = "YOU LOST!"
    document.querySelector('[data-summary="who-win"]').style.color = 'red';
  } else {
    document.querySelector('p.draws span').textContent = ++gameSummary.draws;
    document.querySelector('[data-summary="who-win"]').textContent = "TIE!"
    document.querySelector('[data-summary="who-win"]').style.color = 'gray';
  }
}

function endGame() {
  document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = '';
  game.playerHand = '';
  game.aiHand = '';
}

//Funkcja sterująca

function startGame() {
  if (game.playerHand === '') {
    //!game.playerHand
    return alert('Choose a hand!')
  }
  game.aiHand = aiChoice();
  const gameResult = checkResult(game.playerHand, game.aiHand);
  // console.log(gameResult);
  publishResult(game.playerHand, game.aiHand, gameResult);
  endGame();
}

game.aiHand = aiChoice()
hands.forEach(hand => hand.addEventListener('click', handSelection))

document.querySelector('.start').addEventListener('click', startGame)