# 틱택토 게임(1) 플레이어 이름 설정하기

> 사용 스택 : HTML, CSS, Vanila JavaScript
> 

## 구현하고자 하는 기능

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/8b93dc2b-1562-4876-94c1-8e4bff970921)

위와 같은 메인 화면에서, 각 플레이어 이름 하단의 `수정` 버튼을 누르면 플레이어 이름을 수정할 수 있는 모달창이 오버레이 된다.

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/e9b214de-669a-42fc-ba83-b10c0795fd91)

모달창은 취소 버튼을 클릭하거나 모달창 외부 영역을 클릭했을 때 닫히며, 플레이어 이름을 입력하고 확인 버튼을 클릭하면 메인화면에 보이는 플레이어 이름이 수정된다.

플레이어1의 `수정` 버튼을 눌러 오버레이 된 모달에서 이름을 입력하고 확인을 누르면 플레이어1의 이름이 수정되어야 한다. 플레이어2의 경우에도 마찬가지이다.

<aside>
💡 참고로 사용한 폰트는 둥근모꼴이며, 전체적인 디자인 컨셉은 이 둥근모꼴 폰트를 Fixedsys 폰트와 결합하고 다듬어서 퍼블릭 도메인 라이센스로 배포한 디자이너 길형진님의 블로그의 [둥근모꼴 폰트 소개글](https://cactus.tistory.com/193)에서 따왔다.
</aside>

<br>
<br>

## 모달창

- 동작 원리
    - 모달창은 `모달창`과 `모달창을 제외한 나머지 영역`으로 나누어진다. 나머지 영역은 화면 전체를 차지하고 있는 `div`이며, 모달창이 오버레이 됐을 때 배경을 어둡게 만들어 모달창에 포커스될 수 있도록 정돈해주는 역할도 한다.
    - 이 모달창과 나머지 영역은 기본적으로 `display: none` 속성을 가지고 있다가, 모달창이 팝업되어야 하는 이벤트가 발생하면 `display: block` 으로 속성이 변경된다. 모달창을 닫으면, 처음과 같이 다시 `display: none` 으로 바뀐다.

```html
<!-- 이상 생략 -->

<body>
  <div id="backdrop"></div>
  <header id="main-header">
    <h1>👾 틱택토 게임 🎮</h1>
    <!-- 중간 생략 -->
  </header>
  <main>
    <aside class="modal" id="config-overlay">
      <h2>이름을 설정하세요.</h2>

      <form>
        <div class="form-control">
          <label for="playername">플레이어 이름</label>
          <input type="text" name="playername" id="playername" autocomplete="off" />
        </div>
        <div>
          <button type="button" class="btn btn-alt" id="cancel-config-btn">취소</button>
          <button type="submit" class="btn">확인</button>
        </div>
      </form>
    </aside>

<!-- 중간 생략 -->

		<section id="game-configuration">
      <ol>
        <li>
          <article>
            <h2>플레이어 1</h2>
            <h3>영희</h3>
            <p class="player-symbol">X</p>
            <button class="btn btn-alt" id="edit-player-1-btn">수정</button>
          </article>
        </li>
        <li>
          <article>
            <h2>플레이어 2</h2>
            <h3>철수</h3>
            <p class="player-symbol">O</p>
            <button class="btn btn-alt" id="edit-player-2-btn">수정</button>
          </article>
        </li>
      </ol>
      <button class="btn">새 게임 시작!</button>
    </section>

<!-- 이하 생략 -->
```

- 여기서 모달창에 해당하는 요소는 모달창 외부 영역에 해당하는 `<div id="backdrop"></div>`와, `<aside>` 요소이다.
- 모달창이 보이도록 이벤트를 발생시키는 요소는 `#game-configuration` `section`의 두 개의 `button` 이다.
- 위의 요소들을 바탕으로 모달창을 열고 닫는 자바스크립트 코드는 다음과 같다.

```jsx
// 모달창 외부영역
const backdropElement = document.getElementById('backdrop');
// 모달창
const playerConfigOverlayElement = document.getElementById('config-overlay');
// 모달창 내 취소 버튼
const cancelConfigBtnElement = document.getElementById('cancel-config-btn');
// 모달창 내 폼 요소
const formElement = document.querySelector('form');

// 플레이어1의 수정버튼
const editPlayer1BtnElement = document.getElementById('edit-player-1-btn');
// 플레이어2의 수정버튼
const editPlayer2BtnElement = document.getElementById('edit-player-2-btn');

// 모달창 활성화 함수
function openPlayerConfig(e) {
  playerConfigOverlayElement.style.display = 'block';
  backdropElement.style.display = 'block';
};
// 모달창 비활성화 함수
function closePlayerConfig() {
  playerConfigOverlayElement.style.display = 'none';
  backdropElement.style.display = 'none';
}

// 플레이어 1, 2의 수정버튼 이벤트리스너 연결 - 클릭 이벤트, 모달창 활성화하는 콜백함수
editPlayer1BtnElement.addEventListener('click', openPlayerConfig);
editPlayer2BtnElement.addEventListener('click', openPlayerConfig);

// 모달창의 취소버튼과 모달창 외부영역 이벤트리스너 연결 - 클릭 이벤트, 모달창 닫는 콜백함수
cancelConfigBtnElement.addEventListener('click', closePlayerConfig);
backdropElement.addEventListener('click', closePlayerConfig);
```

<br>
<br>

## FormData

- `FormData` 는 브라우저에 내장된 API로 HTML 폼 데이터를 쉽게 처리하고 전송할 수 있는 객체이다.
- `new` 키워드는 자바스크립트 객체의 새로운 인스턴스를 생성할 때 사용된다. 생성자 함수를 호출할 때 `new` 키워드를 사용하면 해당 함수가 생성자로 동작하며 새로운 빈 객체가 반환된다. 이렇게 생성한 `FormData` 객체의 다양한 메서드를 활용하여 폼 데이터에 대한 작업들을 처리할 수 있다.
    - ex. 폼 데이터 수집, 파일 업로드, AJAX 요청 시 데이터 전송 등

```html
<form>
  <div class="form-control">
    <label for="playername">플레이어 이름</label>
    <input type="text" name="playername" id="playername" autocomplete="off" />
  </div>
  <div>
    <button type="button" class="btn btn-alt" id="cancel-config-btn">취소</button>
    <button type="submit" class="btn">확인</button>
  </div>
</form>
```

```jsx
const formElement = document.querySelector('form');
formElement.addEventListener('submit', savePlayerConfig);

// form을 submit할 때의 콜백함수
function savePlayerConfig(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const enteredPlayername = formData.get('playername').trim();
  console.log(enteredPlayername);
}
```

- 발생한 이벤트 객체에 들어있는 `target` 속성을 `FormData`에 값으로 전달할 수 있다.
    - 폼을 전달하면 자바스크립트가 이 폼을 분석해서 `name` 속성이 폼 내의 요소를 탐색한다. `name` 속성의 속성값을 사용하여 `FormData`의 데이터를 식별할 수 있다.

<br>

### id 속성과 name 속성

1. `id`
    - HTML 문서 내에서 각 요소들에 대한 고유한 식별자이다. 동일한 문서 내에서 `id`는 중복될 수 없다.
    - 주로 css 스타일링이나 자바스크립트의 특정 요소를 선택하고 조작할 때 사용된다.
    
    ```jsx
    <div id="uniqueId">This is a unique element.</div>
    ```
    
2. `name`
    - 특히 폼 요소에서 서버로 데이터를 전송할 때 사용되며, 서버에서는 이 `name` 속성값을 통해 해당 데이터를  식별한다.
    - 폼 안에서는 중복될 수 있다. 하나의 폼 안에서 여러 요소가 동일한 `name`을 갖고 있을 수 있다.
    - 폼 데이터를 서버에 전송할 때, 특히 라디오 버튼이나 체크박스 등 그룹으로 묶인 요소에서 사용된다.
    
    ```jsx
    <input type="text" name="username">
    <input type="radio" name="gender" value="male"> Male
    <input type="radio" name="gender" value="female"> Female
    ```

<br>    

### 유효성 검사와 에러 메시지 핸들링

```jsx
// 에러 메시지 요소
const errorsOutputElement = document.getElementById('config-errors');

function savePlayerConfig(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const enteredPlayername = formData.get('playername').trim(); // '     ' => ''

  if (!enteredPlayername) { // enteredPlayername === '' 대신 falsy한 값 사용
    e.target.firstElementChild.classList.add('error');
    errorsOutputElement.textContent = '이름을 입력해주세요!';
    return; // return 반환 시 호출된 함수(여기서 savePlayerConfig)의 실행이 중단됨
  }
}
```

- `input`의 내용이 있을 때만 `submit`할 수 있도록 하기 위해 유효성 검사 필요
    - `input`의 `required` 속성으로는 빈 공백을 제출했을 경우 그대로 제출되어 유효성 검사가 어려움
    - 또한 input의 value 문자열의 앞뒤에 공백이 있는 경우에는 이를 제거한다.
    - `trim()` 사용하여 공백에 대한 유효성 검사 수행
        - _를 공백이라고 하면, ‘__임시 닉네임__’ 같은 value는 ‘임시 닉네임’으로 자동 앞뒤 공백 처리
        - valeu가 ‘____’와 같이 빈 공백으로 이루어져 있어도 처리 가능하다.
- 에러 메시지는 기본 브라우저의 `alert`보다는, 모달 내에 HTML 요소를 삽입하여 보여지도록 한다.
    
    ```css
    .error label {
      color: var(--color-error-500);
    }
    
    .error input {
      border-color: var(--color-error-500);
      color: var(--color-error-500);
      background-color: var(--color-error-100);
    }
    ```
    
    - 유효하지 않은 이름 값으로 제출하면 아래와 같이 모달창의 요소들이 에러 색상으로 바뀐다.
        
        ![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/4d7f6508-6498-47e0-9cae-2255d613ab41)
        
<br>
<br>

## submit 데이터 저장 및 반영: `data-*`

- `data-*` 전역 특성은 사용자 지정 데이터 특성(custom data attributes)이라는 특성 클래스를 형성함으로써 임의의 데이터를 스크립트로 HTML과 DOM 사이에서 교환할 수 있는 방법이다.
- `data-*` 로 설정해 준 데이터는 `dataset` 속성으로 사용할 수 있다.

```html
<button id="edit-player-1-btn" data-playerid="1">
  플레이어 1의 수정버튼
</button>
<button id="edit-player-2-btn" data-playerid="2">
  플레이어 2의 수정버튼
</button>
```

```jsx
// 플레이어 1의 수정버튼
const editPlayer1BtnElement = document.getElementById('edit-player-1-btn');
// 플레이어 2의 수정버튼
const editPlayer2BtnElement = document.getElementById('edit-player-2-btn');

editPlayer1BtnElement.addEventListener('click', openPlayerConfig);
editPlayer2BtnElement.addEventListener('click', openPlayerConfig);

let editedPlayer = 0;

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

function openPlayerConfig(e) {
  editedPlayer = e.target.dataset.playerid; // dataset
  playerConfigOverlayElement.style.display = 'block';
  backdropElement.style.display = 'block';
};

function savePlayerConfig(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const enteredPlayername = formData.get('playername').trim(); // '     ' => ''

  if (!enteredPlayername) { // enteredPlayername === ''
    e.target.firstElementChild.classList.add('error');
    errorsOutputElement.textContent = '이름을 입력해주세요!';
    return; // return 반환 시 아래의 코드가 실행되지 않고 여기서 함수의 실행이 중단됨
  }

  const updatedPlayerDataElement = document.getElementById(`player-${editedPlayer}-data`)
  updatedPlayerDataElement.children[1].textContent = enteredPlayername;

  players[editedPlayer - 1].name = enteredPlayername;

  closePlayerConfig();
}
```

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/08437bfa-df75-4e50-96f2-8a56add618f5)

- html 파일에서 각 버튼에 `data-playerid` 값을 설정한 뒤 자바스크립트로 버튼에 이벤트리스너 콜백함수에서 `e.target.dataset`으로 `playerid 값`을 확인할 수 있다.
- `e.target.dataset.playerid` 또는 `e.target.dataset['playerid']`로 value만 꺼내서 사용할 수도 있다.

<br>