# 제어 구조

- 다음을 제어할 수 있는 자바스크립트의 특수 구문 또는 기능을 의미
  - 특정 코드가 실행되는 조건 : `if문(if-Statements)`
  - 일부 코드가 실행되는 빈도 : `반복문(Loops)`

<br />

## Booleans

- 논리적인 데이터 유형으로 `참(true)` 또는 `거짓(false)` 값만을 가질 수 있다.
- 어떤 코드 부문이 실행되어야 할지(ex. `if절의 조건문`) 또는 어떤 코드 부문을 반복해야 할지(ex. `for문`) 결정하는데 사용된다.
- 불리언이란 이름은 기호 논리학 분야의 선구자인 영국 수학자 조지 불의 이름에서 따왔다.
- 불리언 값을 반환하는 **비교 및 논리 연산자**를 사용하여 조건문과 반복문의 조건을 정한다.

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/4303b6af-8f7d-496e-a466-1639591f46c3)

### 비교 연산자(Comparison Operators)

> 비교 연산자는 다른 값에서 불리언 값을 도출한다.
> 
- 동등 연산자 : `==`, `===`
  - `==` : 값만 비교 `5 == '5' // true`
  - `===` : 값과 타입을 비교
- 초과, 미만, 이상, 이하 : `>`, `<`, `>=`, `<=`
- 부정 연산자 : `!`, `!=`, `!==`
  - `!=` : 값만 비교 `5 != '5' //false`
  - `!==` : 값과 타입을 비교 `5 !== '5' //true`

<br />

### 논리 연산자(Logical Operators)

> 논리 연산자는 불리언 값들을 결합하여 불리언을 반환한다.
> 
- and(`&&`) : 두 값을 비교했을 때 두 값이 모두 참이면 참을 반환한다.
- or(`||`) : 두 값을 비교했을 때 둘 중 하나만 참이면 참을 반환한다.

<br />
<br />

## if문 (if-Statements)

`if문`은 지정한 조건이 참인 경우 명령문을 실행한다. 조건이 거짓인 경우 또 다른 명령문을 실행할 수도 있다.

```jsx
function testNum(a) {
  let result;
  if (a > 0) {
    result = 'positive';
  }
  return result;
}

console.log(testNum(5));
// Expected output: "positive"
```

<br />

### else

- `if문`의 조건문이 충족되지 않을 때 실행되어야 하는 코드를 작성하는 분기점으로, 필수는 아니며 필요한 경우에만 작성할 수 있다.

```jsx
function testNum(a) {
  let result;
  if (a > 0) {
    result = 'positive';
  } else {
    result = 'NOT positive';
  }
  return result;
}

console.log(testNum(-5));
// Expected output: "NOT positive"
```

### else if

- 다른 조건에 대한 여러가지 분기점을 추가하고 싶은 경우 `else if`를 사용할 수 있다.
- `else`와 또다른 구문이 아니고, `else`에 또 다른 `if`구문을 추가한 것이다.

```jsx
if (조건1)
       명령문1
    else if (조건2)
       명령문2
    else if (조건3)
       명령문3
    ...
    else
       명령문N
```

<br />
<br />

## 조건문과 불리언

### 불리언 값에 대해 자세히 알아보기

```jsx
let isLoggedIn = true;

if (isLoggedIn) {
  console.log('User is logged in!');
}
```

```jsx
let isLoggedIn = true;

if (!isLoggedIn) {
  console.log('User is NOT logged in!');
}
```

- `isLoggedIn === true`로 사용하지 않는다. 이미 `isLoggedIn`에는 불리언 값이 저장되어 있으므로 일종의 중복 비교가 된다.
- 반대의 경우에도 마찬가지로 `isLoggedIn === false`가 아닌 부정 연산자를 사용하여 `!isLoggedIn`로 간단하게 사용할 수 있다.

<br />

### Truthy한 값, Falsy한 값

- 자바스크립트는 불리언이 필요한 위치에서는 불리언이 아닌 값들을 불리언으로 변환하려고 시도하는데, 이 때 변환되는 값들은 `truthy한 값`과 `falsy한 값`으로 나눌 수 있다.
  - `truthy한 값` : 비어있지 않은 문자열, 숫자 1
  - `falsy한 값` : 빈 문자열, `null`, `undefined`, `NaN`, 숫자 0
- 조건문을 더 간편하게 작성할 수 있다.
    
    ```jsx
    const enteredUserName = 'Maximilian';
    
    // 예시1
    if (enteredUserName.length > 0) {
      console.log('Input is valid!');
    };
    
    // 예시2
    if (enteredUserName) {
      console.log('Input is valid!');
    }; // enteredUserName가 true로 처리되어 콘솔에 해당 로그가 출력됨
    ```
    
  - 위의 예제에서 예시1과 예시2를 비교해서 보면, `if절`의 조건문을 `enteredUserName.length > 0`로 비교할 때나 `enteredUserName`로 비교할 때 결과는 똑같다. truthy한 값의 개념이 적용되기 때문이다. 따라서 예시2처럼 작성하면 코드를 더 간단하고 짧게 작성할 수 있다.

<br />
<br />

## 반복문 (Loops)

- 반복문은 모든 프로그래밍 언어에서 볼 수 있는 개념으로 지원되는 반복문의 종류는 다양하고 언어에 따라 다르다.

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/1dddbe0e-f2d4-4ba1-ba01-037187fa33ef)

<br />

### for문

- 특정 코드 실행 횟수를 정의할 수 있다.
- 배열 작업에도 사용할 수 있지만, 배열 없이도 사용할 수 있다.
- ES6에서 `for ... of문`이 등장하면서 코드를 더 간결하게 작성할 수 있게 되었다.

```jsx
for (let i=0; i < 10; i++) {
  console.log(i);
  // 0
  // 1
  // 2
  // 3
  // 4
  // 5
  // 6
  // 7
  // 8
  // 9
};
```

<br />

### for … of문 ⭐️

- 배열의 모든 요소를 순환한 후 모든 배열 요소로 작업을 수행할 수 있다.
- **배열**에 사용된다.

```jsx
const users = ['Max', 'Anna', 'Joel'];

for (const user of users) {
  console.log(user);
  // Max
  // Anna
  // Joel
};
```

- `for문`에서는 조건문에 `const`를 사용하지 못하는 반면 `for … of문`에서는 `let`과 함께 `const`를 사용할 수 있다.
  - `for … of문`에서는 배열의 각 요소를 순회하면서 매 반복마다 새로운 블록 스코프를 만들지 않는다. 따라서 `let`을 사용하여 반복 변수를 선언하면, 각 반복에서 같은 변수명을 사용하더라도 블록 스코프 내에서 새로운 변수가 계속 생성된다. 반면에 `const`를 사용하여 선언하더라도 각 반복에서 새로운 변수가 생성되지 않고, 이전 반복에서 선언된 변수가 재활용된다.

<br />

### for … in문 ⭐️

- 객체의 모든 속성을 반복할 수 있다.
- **객체**에 사용된다.

```jsx
const loggedInUser = {
  name: 'Max',
  age: 32,
  isAdmin: true,
};

for (const propertyName in loggedInUser) {
  // loggedInUser 객체의 key 순회
  console.log(propertyName);
  // name
  // age
  // isAdmin

  // loggedInUser 객체의 value 순회
  console.log(loggedInUser[propertyName]); // loggedInUser.propertyName이 아님
  // Max
  // 32
  // true
};
```

- 객체의 `프로퍼티 이름(key)`들을 순회하며 출력한다.
- 객체의 각 `key`들의 `value`값들도 순회할 수 있다.

<br />

### while문

- 미리 특정 횟수를 정의하거나 객체, 배열을 통해 반복하지 않고 while 반복문에서 조건을 정의한다. 조건이 충족되는 한 계속해서 반복문의 코드가 실행된다.
- 주사위 굴리기 예제
  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>JavaScript Loops</title>
      <link rel="stylesheet" href="styles.css">
      <script src="app.js" defer></script>
    </head>
    <body>
      <h1>JavaScript Loops in Action</h1>
      <section id="statistics">
        <h2>Statistics</h2>
        <p>Test your luck and find out how many dice rolls (1-6 dice) it takes you to roll a certain number (between 1 and
          6).</p>
        <div class="control">
          <label for="user-target-number">Your Target Number</label>
          <input type="number" min="1" max="6" id="user-target-number">
        </div>
        <button>Roll the Dice</button>
        <ul id="dice-rolls"></ul>
        <p>It took you <span id="output-total-rolls" class="output">X</span> rolls to roll a <span id="output-target-number" class="output">Y</span>.</p>
      </section>
    </body>
  </html>
  ```
  ```js
  const rollDiceBtnElement = document.querySelector('#statistics button');

  // 1~6에서 무작위 숫자 뽑기
  function rollDice() {
    return Math.floor(Math.random() * 6) + 1
  };

  // 유저의 타겟숫자가 나올 때까지 주사위 굴리기 반복하기
  function deriveNumberOfDiceRolls() {
    const userTargetNumberInputElement = document.getElementById('user-target-number');
    const diceRollsListElement = document.getElementById('dice-rolls');

    const enteredNumber = +userTargetNumberInputElement.value;
    diceRollsListElement.innerHTML = ''; // 리스트 초기화

    // while문 조건문에 넣어주기 위해 타겟 숫자가 나왔는지 boolean값 설정
    let hasRolledTargetNumber = false;
    // 주사위 굴린 횟수 변수로 설정
    let numberOfRolls = 0;

    while (!hasRolledTargetNumber) {
      // 주사위 굴리기
      const rolledNumber = rollDice();

      // 주사위 굴릴 때마다 주사위 굴린 횟수 +1
      numberOfRolls++;

      // 주사위 굴릴 때 어떤 숫자가 나왔는지 리스트 추가
      const newRollListItemElement = document.createElement('li');
      const outputText = `Roll ${numberOfRolls}: ${rolledNumber}`;
      newRollListItemElement.textContent = outputText;
      diceRollsListElement.append(newRollListItemElement);

      // 타겟 넘버 나오면 hasRolledTargetNumber를 true로 바꿔주어 while문 종료될 수 있도록 함
      if (rolledNumber === enteredNumber) {
        hasRolledTargetNumber = true;
      }
    }

    const outputTotalRollsElement = document.getElementById('output-total-rolls');
    const outputTargetNumberElement = document.getElementById('output-target-number');
    
    outputTargetNumberElement.textContent = enteredNumber;
    outputTotalRollsElement.textContent = numberOfRolls;
  };

  rollDiceBtnElement.addEventListener('click', deriveNumberOfDiceRolls);
  ```