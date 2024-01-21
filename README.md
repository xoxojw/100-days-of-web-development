# Express로 유저 데이터 파싱하기

> Node.js의 핵심 라이브러리인 Express 시작하기
> 

<br>

## Express 설치

```bash
npm init
npm install express
```

- `npm init` : 프로젝트 폴더를 Node.js 관리 프로젝트로 전환하는 작업으로, 실행 후 질문에 따라 몇 가지 세팅을 완료하고 나면 프로젝트에 `package.json`이 설치된다.

<br>

## Express로 서버 생성하기

[섹션 17에서 node.js로 서버 생성했던 코드](https://github.com/xoxojw/100-days-of-web-development/blob/17-node-js-introduction/app.js)를 express를 이용해서 다시 만들어보면 아래와 같다.

```jsx
const express = require('express');

const app = express();

app.get('/currenttime', (req, res) => {
  res.send(`<h1>${new Date().toISOString()}</h1>`)
}); // localhost:3000/currenttime

app.get('/', (req, res) => {
  res.send(`<h1>Hello World!</h1>`);
});

app.listen(3000);
```

코드가 더 짧고 가독성이 좋아졌다.

<br>

## 데이터 파싱

```jsx
const express = require('express');

const app = express();

app.get('/currenttime', (req, res) => {
  res.send(`<h1>${new Date().toISOString()}</h1>`)
}); // localhost:3000/currenttime

app.get('/', (req, res) => {
  res.send(`<form action="/store-user" method="POST"><label>Your name</label><input type="text" name="username" /><button>Submit</button></form>`);
});

app.post('/store-user', (req, res) => {
  const userName = req.body.username;
  res.send(`<h1>Hi, ${userName}!</h1>`);
})

app.listen(3000);
```

> `form` 의 `action` 속성 : 사용자가 `form`에 입력한 데이터들을 서버로 보낼 때, 해당 데이터들이 도착할 URL 주소
> 

위와 같이 `get`, `post` 메서드를 통해 사용자가 `<input name=”username” />`에 입력하고 제출한 데이터를 받아 화면에 보여주려고 한다.

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/c8252395-e2a0-4482-94f5-c5d90e71ab71)

하지만 위와 같이 에러가 발생하는데, 그 이유는 유저가 제출한 form의 내용을 전송받은 데이터인 `username: 바보`는 자바스크립트 코드처럼 보이지만 실제로는 자바스크립트 코드가 아니다. 따라서 이를 파싱하지 못해 발생한 오류이다.

이 문제를 해결하려면 `express의 미들웨어 함수`를 사용하면 된다.

### 미들웨어 함수

- 미들웨어 함수란 request-response 사이클에서 `request 객체`와 `response 객체`, 그리고 `다른 미들웨어 함수`에 액세스할 수 있는 함수이다.
- 미들웨어 함수를 이용해서 어떤 종류의 데이터가 있는지 확인하고, 해당 데이터를 추출할 수 있다.
- express의 `app.use()`, `app.METHOD()` 함수를 사용하여 미들웨어를 앱 객체의 인스턴스에 바인딩한다.

`urlencoded()`는 URL-encoded 데이터를 파싱하는데 사용되는 미들웨어 함수이다.

```jsx
const express = require('express');
const app = express();

app.use(express.urlencoded()); // 미들웨어 바인딩
```

들어오는 req data 파서가 모든 들어오는 request 요청을 살피다가, request가 form 데이터를 가지고 있고 그게 `urlencoded 미들웨어 함수`가 찾는 데이터라면 해당 데이터를 파싱하여 자바스크립트 객체로 변환한다.

- 참고 - 전체 코드

```jsx
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/currenttime', (req, res) => {
  res.send(`<h1>${new Date().toISOString()}</h1>`)
}); // localhost:3000/currenttime

app.get('/', (req, res) => {
  res.send(`<form action="/store-user" method="POST"><label>Your name</label><input type="text" name="username" /><button>Submit</button></form>`);
});

app.post('/store-user', (req, res) => {
  const userName = req.body.username;
  console.log(userName);
  res.send(`<h1>Hi, ${userName}!</h1>`);
})

app.listen(3000);
```

<br>
<br>

# 서버 사이드 파일에 데이터 저장하기

프론트엔드에서 사용자가 제출하거나 요청한 데이터 ↔️ 백엔드에서 서버 측 작업 처리 ↔️ DB

하지만 지금 수준에서는 DB에 저장해보는 것에 앞서 더 쉽고 간단하게 json 파일에 저장해보자.

<br>

## 모듈 불러오기

input에 입력받은 데이터를 json에 저장하려면 `require` 을 사용하여 두 가지 모듈을 불러와야 한다.

```jsx
const fs = require('fs');
const path = require('path');
```

### `fs` 모듈

- Node.js의 내장 모듈이며, 파일 시스템과 상호작용 할 수 있는 메서드를 제공한다.
- 파일의 읽기, 쓰기, 삭제, 이동 등과 관련된 작업을 수행할 수 있다.

### `path` 모듈

- 파일 경로를 조작하는데 사용되는 메서드로, `fs` 모듈과 마찬가지로 Node.js 내장 모듈이다.
- 플랫폼 간에 일관된 경로를 생성하고 조작하는 메서드를 제공해서 경로 문제를 좀 더 쉽게 핸들링 할 수 있도록 하는 역할을 한다.

<br>

## JSON 파일의 데이터를 읽고 데이터 추가하기

```jsx
📦projects
 ┣ 📂data
 ┃ ┗ 📜users.json
 ┣ 📂node_modules 
 ┣ 📜.gitignore
 ┣ 📜app.js
 ┣ 📜package-lock.json
 ┗ 📜package.json
```

```jsx
app.post('/store-user', (req, res) => {
  const userName = req.body.username;

  const filePath = path.join(__dirname, 'data', 'users.json');

  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);
  
  existingUsers.push(userName);

  fs.writeFileSync(filePath, JSON.stringify(existingUsers));

  res.send(`<h1>Hi, ${userName}!</h1>`);
})
```

### 파일의 경로 가져오기

먼저 파일의 데이터를 들춰보려면 그 파일의 경로부터 제대로 파악해야 한다.

- `path.join()` : `path` 모듈의 메서드로, 여러 경로 세그먼트를 결합하여 하나의 유효한 파일 경로를 만든다.
- `__dirname` : Node.js 환경에서의 특별한 변수로, 현재 실행 중인 스크립트 파일의 디렉토리 경로를 나타낸다.

### 파일의 데이터 읽고 새롭게 추가

파일의 경로를 확인했으면, 파일 데이터를 읽고 추가할 수 있다.

1. `fs.readFileSync(filePath)` : 지정된 파일 경로에서 동기적으로 파일을 읽어온다.
2. `JSON.parse(fileData)` : json 형식의 문자열을 JavaScript 형태로 파싱한다.
3. `existingUsers.push(userName)` : 기존 사용자 데이터 객체에 새로운 사용자명(`userName`)을 배열에 추가한다. `push` 메서드는 기본적인 자바스크립트 메서드이다.
4. `fs.writeFileSync(filePath, JSON.stringify(existingUsers))` : 지정된 파일 경로에 동기적으로 데이터를 추가한다(쓴다).
    - 이전에 `JSON.parse`를 사용해 JavaScript 형태로 파싱했기 때문에, json 파일에 데이터를 추가하기 위해서는 `JSON.stringify` 를 이용해 다시 json 형태로 변환한다.

파일을 읽고 쓰기 위해 Node.js의 `fs` 모듈을 사용하고 있다.

이 때 주의할 점은 `readFileSync` 및 `writeFileSync`는 동기적인 메서드이므로, 큰 파일이나 네트워크 요청과 같이 시간이 오래 걸리는 작업에서는 사용을 자제한다. 이러한 작업을 비동기적으로 수행하기 위해서는 `readFile` 및 `writeFile`과 같은 비동기 메서드를 사용할 수 있다.

<br>
<br>

# nodemon 패키지

node.js로 서버를 빌드하면서, 수정한 내용을 반영하고 싶으면 `node app.js`로 계속 서버를 껐다 켜야 반영되는 문제가 아주 아주 아주 귀찮게 느껴졌다. nodemon 패키지를 사용하여 더이상의 command + c와 `node app.js` 엔터의 반복은 더이상 안녕~ 개발자들의 심신을 안녕하게 해준 패키지가 아닐까?

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/7ca4e522-4119-4376-a151-26cc5a0943db)

```bash
npm install nodemon --save-dev
```

개발 중에만 사용하면 되는 패키지이므로 `--save-dev` 로 설치해준다.

`nodemon`을 설치했으면 app.js를 `node`가 아닌 `nodemon`으로 실행해야 한다.

하지만 `nodemon app.js` 로 바로 실행하려고 하면 `command not found: nodemon` 이라는 에러 메시지가 출력되는데, 그 이유는 nodemon이 컴퓨터 전체에서 전역적으로 사용 가능한 패키지가 아니라 현재 프로젝트의 패키지로만 설치되었기 때문이다.

`package.json`에서 “script” 부분에 `"start": "nodemon"` 을 추가해주면 된다.

```json
"scripts": {
    "start": "nodemon"
  },
```

위의 내용을 추가하고 `npm start` 로 시작해주면 서버가 nodemon으로 실행된다.

수정사항을 확인하려면 전처럼 서버를 껐다 켤 필요없이, 새로고침만 해주면 확인할 수 있다!

<br>