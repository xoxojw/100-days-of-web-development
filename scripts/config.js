const playerNameInputElement = document.getElementById('playername');
let configTargetPlayer;

function openPlayerConfig(e) {
  configTargetPlayer = e.target.id;
  // console.log(configTargetPlayer);
  playerConfigOverlayElement.style.display = 'block';
  backdropElement.style.display = 'block';
};
 
function closePlayerConfig() {
  configTargetPlayer = '';
  playerConfigOverlayElement.style.display = 'none';
  backdropElement.style.display = 'none';
  playerNameInputElement.value = null;
}

function savePlayerConfig(e) {
  e.preventDefault();
  const player1NameElement = document.querySelector('#game-configuration li:nth-child(1) h3');
  const player2NameElement = document.querySelector('#game-configuration li:nth-child(2) h3');
  if (configTargetPlayer === 'edit-player-1-btn') {
    player1NameElement.textContent = playerNameInputElement.value;
  } else {
    player2NameElement.textContent = playerNameInputElement.value;
  }
  closePlayerConfig();
}