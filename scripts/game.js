function startNewGame() {
  activePlayer = 0; // reset activePlayer
  // for (const gameFieldElement of gameFieldElements) {
  //   if (gameFieldElement.classList.length > 0) gameFieldElement.classList.remove('disabled');
  //   gameFieldElement.textContent = '';
  // }; // reset game field

  if (players[0].name === '' || players[1].name === '') {
    alert('두 플레이어의 이름을 모두 설정해주세요!');
    return;
  }

  activePlayer += Math.round(Math.random()); // 플레이어 1과 2 중 시작 선수 랜덤뽑기
  activePlayerNameElement.textContent = players[activePlayer].name;
  
  gameBoardAreaElement.style.display = 'block';
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(e) {
  console.log(e.target.tagName);
  if (e.target.tagName !== 'LI') {
    return;
  }
  
  e.target.textContent = players[activePlayer].symbol;
  e.target.classList.add('disabled');
  switchPlayer();
}