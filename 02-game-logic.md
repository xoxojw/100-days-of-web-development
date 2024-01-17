# 틱택토 게임(2) 게임 로직 구성하기

1. 게임 시작 - 플레이어 2명 이름 입력 여부 유효성 검사 → 랜덤하게 선공 정하기, 게임판 보여주기, (이전 진행된 게임이 있을 때) 게임 리셋
2. 게임 진행 - 게임판 선택 시 현재 플레이어에 맞게 심볼(X 또는 O) 표시, 비어있는 게임판만 선택 가능, 현재 라운드 체크 및 플레이어 전환, 게임 종료 판단
3. 게임 종료 - 게임 진행 도중 매번 행, 열, 대각선별로 경우의 수를 체크하여 게임 종료여부 판단, 결과 출력하기(승리 또는 무승부)

<br>

## 게임과 관련된 데이터 및 변수 설정

```jsx
const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;

const players = [
  {
    name: '',
    symbol: 'X',
  },
  {
    name: '',
    symbol: 'O',
  },
];
```

- `gameData` : 각 게임판을 어떤 플레이어가 선택했는지 체크하기 위한 3*3 이차원 배열 생성. 초기값은 모두 0이며, 플레이어 2가 행1 열1 위치의 게임판을 선택하면 `activePlayer`의 값인 2가 해당 위치에 입력되어 `gameData = [[2, 0, 0], [0, 0, 0], [0, 0, 0]]`가 된다.
- `activePlayer` : 현재 진행 중인 플레이어를 확인하기 위한 변수로 게임 시작 전 초기값은 0이고, 게임이 시작하면 0또는 1의 값을 갖는다. 0은 플레이어 1을, 1은 플레이어 2를 나타낸다. (`players` 배열의 index에 해당)
- `gameIsOver` : 승리가 확정되어 게임이 종료되었을 때 더이상 게임판을 선택할 수 없도록 하기 위한 불리언 값이다. 초기값은 `false`이며 플레이어 둘 중 누군가의 승리가 확정되면 `true`로 바뀐다.
- `players` : 두 플레이어의 정보를 담고있는 객체로 이루어진 배열이다. 플레이어 1은 이 배열의 첫번째 요소(index 0), 플레이어 2는 두 번째 요소(index 1)이다.

<br>
<br>

## 게임 시작

### startNewGame

```jsx
const gameBoardAreaElement = document.getElementById('active-game');
const activePlayerNameElement = document.getElementById('active-player-name');

function startNewGame() {
  resetGameStatus();

  if (players[0].name === '' || players[1].name === '') {
    alert('두 플레이어의 이름을 모두 설정해주세요!');
    return;
  }

  activePlayer += Math.round(Math.random()); // 플레이어 1과 2 중 시작 선수 랜덤뽑기
  activePlayerNameElement.textContent = players[activePlayer].name;
  
  gameBoardAreaElement.style.display = 'block';
}
```

- `resetGameStatus()` : 이전 진행된 게임이 있을 경우에는 진행됐던 게임판을 리셋하는 함수 실행
- 플레이어 이름 중 둘 중 하나라도 빈 문자열인 경우에는 ‘두 플레이어의 이름을 모두 설정해주세요!’ 라는 `alert` 보여주고 `return`하여 현재 지점에서 함수 더 진행되지 않고 종료
- 이름이 모두 설정되었으면 `activePlayer` 의 숫자를 `Math.random()` 사용하여 1 또는 2 중 랜덤하게 뽑아서 선공 정하기
- 선공이 정해졌으면 현재 누구의 차례인지 알려주는 `activePlayerNameElement`의 `textContent`를 선공 플레이어의 이름으로 설정
- 위의 모든 상황이 통과되면 `gameBoardAreaElement.style.display = 'block';` 로 게임판 보여주기

<br>

### resetGameStatus

```jsx
const gameOverElement = document.getElementById('game-over');

function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML =
    '<span id="winner-name">PLAYER NAME</span>님의 승리!';
  gameOverElement.style.display = 'none';

  // reset game data
  gameData.forEach((v, i) => {
    gameData[i] = v.map(() => 0);
  });

  // reset game board
  for (const e of gameBoardElement.children) {
    if (e.classList.length > 0) {
      e.classList.remove('disabled');
      e.textContent = '';
    }
  }
}
```

- 게임 진행 중일 때 `activePlayer`는 1 또는 2이므로 0으로 초기화하고, 모든 게임판이 선택되어도 승부가 나지 않는 무승부를 확인하기 위한 `currentRound`도 1로 초기화
- `gameIsOver`의 값도 초기값인 `false`로 바꿔준다.
- `gameOverElement`
    
    ```jsx
    <article id="game-over">
      <h2><span id="winner-name">PLAYER NAME</span>님의 승리!</h2>
      <p>새로운 게임을 시작하려면 '새 게임 시작!' 버튼을 눌러주세요.</p>
    </article>
    ```
    
    - `gameOverElement`는 html에서 위의 `<article>`을 가리키는데, 이 때 게임의 승자를 알려주는 `<h2>`는 자식 요소로 `<span>`을 가지고 있다.
    - 하지만 승자가 가려지지 않고 무승부인 경우 이 `<h2>` 요소가 `gameOverElement.firstElementChild.textContent = 무승부입니다!` 로 설정되어 `span`이 사라지고 `<h2>무승부입니다!</h2>` 가 된다. 따라서 게임 리셋 시 이 요소를 다시 `span`을 자식 요소로 가지고 있는 원래의 상태로 되돌린다.
- 이차원 배열 `gameData` 는 모든 요소를 0으로 가진 초기 상태로 돌려주기 위해 `forEach`로 각 요소를 순회하면서, 각 요소 내에서는 `map` 함수로 배열 내의 요소들을 0으로 초기화한다.
- 또한 게임판 역시 `for … of` 반복문을 사용하여 선택된 게임판에서 배경색을 제거(`.classList.remove(’disabled’)`)하고, 각 플레이어들의 심볼 ‘X’ 또는 ‘O’를 빈 배열로 초기화(`e.textContent = ‘’;`)한다.

<br>
<br>

## 게임 진행

### selectGameField

```jsx
const gameBoardElement = document.getElementById('game-board');
gameBoardElement.addEventListener('click', selectGameField);

function selectGameField(e) {
  if (e.target.tagName !== 'LI' || gameIsOver) {
    return;
  }

  const selectedField = e.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert('비어있는 곳을 클릭해주세요 🙄');
    return;
  }
  
  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add('disabled');

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerId = checkForGameOver();
  
  if (winnerId !== 0) {
    endGame(winnerId);
  }
  
  currentRound++;
  switchPlayer();
}
```

- 게임판 내의 9개의 각 칸은 `<li>` 태그 요소로 이루어져 있기 때문에, 이 칸이 아닌 그 사이의 공백 요소를 클릭하면 선택되지 않도록 유효성 검사를 실시한다. 뿐만 아니라 9개의 칸이 모두 선택되기 전에 승부가 판정되어 게임이 종료된 상태일 때도 선택되지 않도록 `gameIsOver`로도 조건을 설정한다. 선택한 요소의 태그네임이 `<li>`가 아니거나 게임오버 상태이면 `return`한다.
- 이차원 배열 `gameData`의 각 요소를 체크하여 현재 선택한 곳의 값이 1 또는 2로 이미 선택된 곳이면, 비어있는 곳을 선택해 달라는 `alert`을 띄우고 선택되지 않도록 `return`한다.
- 위의 두 조건을 통과하면 무사히 게임판을 선택할 수 있으므로, 해당 게임판에 현재 플레이어의 심볼을 `textContent`로 추가하고 게임판의 배경색이 바뀌도록 css 클래스도 추가한다. 이차원 배열 `gameData`에도 현재 플레이어 데이터를 추가한다.
- 이후 게임의 승리가 판정됐는지 확인하는 `checkForGameOver` 함수를 실행하고, 이 `checkForGameOver()`가 `return`하는 값이 `gameData` 각 요소의 초기값인 0이 아닌 플레이어를 나타내는 1 또는 2를 반환하면 게임을 종료하는 `endGame` 함수를 실행한다. 이 때 `endGame` 함수에 승리 플레이어의 id를 전달한다.
- `winnerId`가 여전히 0이라면, 즉 누군가가 승리하지 않았다면 `currentRound`를 증가시키고 현재 플레이어를 다른 플레이어로 전환한다.

<br>

### checkForGameOver

```jsx
function checkForGameOver() {
  // 행 검사
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  // 열 검사
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  // 대각선 검사
  // 좌상단에서 우하단
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
		return gameData[0][0];
  }
  // 우상단에서 좌하단
  if (
    gameData[0][2] > 0 &&
    gameData[0][2] === gameData[1][1] &&
    gameData[1][1] === gameData[2][0]
  ) {
    return gameData[0][2];
  }

  // 무승부
  if (currentRound === 9) {
    return -1;
  }

  return 0;
}
```

- 게임은 플레이어 둘 중 한 명이 행 한 줄을 모두 차지하거나, 열 한 줄을 모두 차지하거나, 대각선 두 가지(좌상단에서 우하단, 우상단에서 좌하단) 중 한 줄을 차지하면 승리한다.
- 행 또는 열은 각 행과 열마다 for 반복문을 돌려서 체크할 수 있다.
- 대각선 검사는 두 가지 경우의 수밖에 없으므로 if문으로 체크한다.
- 행, 열, 대각선 검사를 모두 수행했는데도 `return`값이 없으면서, `currentRound`가 9이면 모든 게임판이 선택되었다는 뜻이므로 무승부이다.
- 정리하면, `checkForGameOver`가 1이나 2를 return하면 플레이어1 또는 2가 승리하여 승부가 결정된 것이고, -1을 리턴하면 무승부, 0을 리턴하면 계속해서 게임을 진행하면 된다.

<br>

### switchPlayer

```jsx
const activePlayerNameElement = document.getElementById('active-player-name');

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}
```

- 현재 게임판을 선택할 수 있는 `activePlayer`를 전환하고 현재 누구의 차례인지 `textContent`을 통해 화면에 표시한다.

<br>
<br>

## 게임 종료

### endGame

```html
<article id="game-over">
  <h2><span id="winner-name">PLAYER NAME</span>님의 승리!</h2>
  <p>새로운 게임을 시작하려면 '새 게임 시작!' 버튼을 눌러주세요.</p>
</article>
```

```jsx
const gameOverElement = document.getElementById('game-over');

function endGame(winnerId) {
  gameIsOver = true;
  gameOverElement.style.display = 'block';

  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name
    gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = `무승부 입니다!`
  }
}
```

- `endGame` 함수는 `checkForGameOver` 함수에서 `winnerId`가 초기값 0이 아닌 경우에 실행되고, 이 때 `winnerId`를 매개변수로 받아온다.
- `gameIsOver`의 값이 `true`로 바뀌고, 게임 결과를 알려주는 `gameOverElement` 요소의 `display` 상태를 none에서 block으로 바꾸어 결과를 보여준다.
- winnerId가 1 또는 2여서 0보다 큰 값이면 승자가 있는 것이므로 players 객체 배열에서 승자의 이름을 값으로 가져와 보여준다.
- 그렇지 않은 경우에는 무승부이므로 ‘무승부 입니다!’ 문구를 보여준다.