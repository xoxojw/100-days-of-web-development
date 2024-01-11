# 자바스크립트 응용 & 실제 사례

- 새로운 HTML 페이지로 교체하지 않아도 백그라운드에서 데이터를 가져와 화면을 업데이트 할 수 있다.
    - ex. 날씨 데이터, 주식, 채팅 메시지 등
- 타이머
    - 페이지에 띄워놓거나 보이지 않게 설정해놓고 타이머 시간이 다 되면 어떤 실행을 하도록 할 수 있다.
    - ex. 온라인 뱅킹 사용할 때 5분 뒤면 자동으로 로그아웃되는 기능
- 사용자 input에 대한 유효성 검사, 오류 메시지 알림
    - 내장된 HTML, CSS 폼 기능보다 더 디테일하게 다룰 수 있다.
- 보다 복잡한 오버레이를 구성하고 관리할 수 있다.
- 화면에 있는 요소들을 재배치, 숨기기, 보여주기, 제거 등의 일을 할 수 있다.
    - ex. 항목들을 드래그 앤 드롭할 수 있는 리스트
- 자바스크립트를 활용하면 웹사이트의 일부 또는 전체가 인터넷 연결이 없는 상태에서도 특정 범위까지 작동하도록 할 수도 있다.

<br />
<br />

# 자바스크립트 기초

## 1) 변수

- 데이터를 담는 컨테이너

## 2) 자바스크립트 코드 외부로 아웃소싱

`<script *src*="app.js"></script>`

## 3) 배열

- 데이터 리스트 관리

## 4) 객체

- 관련 데이터 그룹화

*하드 코딩: 데이터를 코드 내부에 직접 입력하는 것*

## 5) 함수

- 자바스크립트를 비롯한 여러 프로그래밍 언어의 핵심 특성 중 하나

### On Demand

- 함수를 정의했다고해서 그 함수가 바로 실행되는 것은 아니다. 브라우저가 함수를 정의한 코드 블록에 도달하면 이 함수를 기억하되 실행하지는 않는 것이다. 함수를 실행하기 위해서는 언제 정의한 함수가 실행될지 이야기해주어야 한다.(호출)

### 변수 섀도잉

```jsx
let x = 10; // 외부 스코프의 변수 x

function example() {
  let x = 20; // 내부 스코프에서의 변수 x, 외부 스코프의 x를 쉐도잉
  console.log(x); // 내부 스코프의 x 출력: 20
}

example();
console.log(x); // 외부 스코프의 x 출력: 10
```

- 함수 밖의 함수를 함수 안에서 덮어쓸 수 있음을 의미
- 하나의 스코프 안에서 동일한 이름을 가진 두 개 이상의 변수가 있는 상황을 나타낸다. 내부 스코프에서 외부 스코프와 동일한 이름의 변수를 선언할 때, 내부 스코프에서의 변수가 외부 스코프에서의 변수를 가리키게 되는 현상이다.
- 변수 섀도잉은 코드의 가독성을 향상시키고, 스코프 간의 충돌을 방지하는데 도움이 될 수 있으나 의도치 않은 변수 섀도잉은 버그의 원인이 될 수도 있어 주의하여 사용해야 한다.

```jsx
let adultYears;

function calculateAdultYears() {
  adultYears = age - 18;
}
```

위의 경우는 변수 섀도잉이 아니다. 함수 `calculateAdultYears`에서 `adultYears`에 `age - 18`을 할당한 것은 외부 스코프에서 선언한 변수 `adultYears`에 할당한 것과 같다.

### 매개변수

- 함수 내에서 외부 변수는 되도록이면 참조하지 않는 것이 좋다. 외부 변수를 함수 내에서 직접 참조하면 함수가 의존성을 가지게 되는데, 이것은 함수를 다른 곳에서 재사용하기 어렵게 만들기 때문이다.
- 따라서 매개변수를 사용하여 필요한 데이터를 함수에 직접 전달해주는 것이 좋다. 매개변수를 사용하면 함수를 독립적으로 만들어주어 재사용성을 높일 수 있다.

```jsx
let age = 32;

let totalAdultYears;

// 매개변수 userAge
function calculateAdultYears(userAge) {
  return userAge - 18;
}

totalAdultYears = calculateAdultYears(age);
alert(totalAdultYears);

age = 45;
totalAdultYears = calculateAdultYears(age);

alert(totalAdultYears);
```

### 정리

- return이나 매개변수가 필수인 것은 아니다.
- 함수는 여러 단계를 실행할 수 있고 그 단계들에서 변수를 선언할 수 있다.

<br />
<br />

# 메서드

- 객체에 속한 함수
- 객체는 프로퍼티와 메서드를 가지는 데이터 구조이며, 메서드는 해당 객체의 행동이나 동작을 나타내는 함수이다.

```jsx
// 객체 정의
let car = {
  brand: "Toyota",
  model: "Camry",
  year: 2022,

  // 메서드 정의
  start: function() {
    console.log("The car is starting.");
  },

  drive: function() {
    console.log("The car is now driving.");
  },

  stop: function() {
    console.log("The car has stopped.");
  }
};

// 메서드 호출
car.start(); // 출력: The car is starting.
car.drive(); // 출력: The car is now driving.
car.stop();  // 출력: The car has stopped.
```

<br />
<br />

# 연산자, 약식 연산자 & 값 유형

```jsx
// Math operations
console.log(10 + 4);
console.log(10 - 4);
console.log(10 * 4);
console.log(10 / 4);
console.log();
console.log();

console.log((10 + 3 - 5) * 10);

let result = (10 + 3 - 5) * 10;
result = 10 * 4;
result++; // result = result + 1
result--; // result = result - 1

result += 5; // result = result + 5

console.log('Max' + ' ' + 'Schwarmuller'); // Max Schwarmuller
console.log('Max' - 'ax'); // NaN
```

- 위의 숫자들 중 소수점이 없는 14, 6, 40은 정수`Integer numbers`, 소수점이 있는 2.5는 부동소수점`float`라고 부른다.

<br />