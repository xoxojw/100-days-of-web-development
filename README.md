# 포트(Port)

<aside>
💡 컴퓨터 네트워크에서 프로세스 간 통신을 가능하게 하는 논리적인 엔드포인트

</aside>

- 하나의 컴퓨터에서 여러 네트워크 서비스나 프로세스가 동시에 실행될 수 있다. 각 서비스나 프로세스는 고유한 포트 번호를 가지며, 이를 통해 다른 프로세스와 구분된다.
- 포트 0은 65535까지의 범위에서 할당된다. 그 중 0에서 1023까지는 잘 알려진 포트로, 특정 서비스들이 주로 사용한다.

## 주요 포트

1. **포트 21 (FTP - File Transfer Protocol):**
    - 파일 전송을 위한 프로토콜로, 포트 21은 FTP 서버와의 통신에 사용된다.
    - FTP는 파일을 업로드 및 다운로드하고 디렉터리를 관리하기 위해 사용된다.
2. **포트 22 (SSH - Secure Shell):**
    - 원격 접속을 안전하게 제공하기 위한 프로토콜인 SSH가 사용하는 포트이다.
    - SSH는 보안 셸 및 데이터 전송을 위해 사용되며, 원격 서버에 안전하게 접속하는 데 활용된다.
3. **포트 25 (SMTP - Simple Mail Transfer Protocol):**
    - 전자 메일을 보내기 위한 프로토콜인 SMTP가 사용하는 포트이다.
    - 이 포트를 통해 이메일 서버 간에 이메일을 전송한다.
4. **포트 80 (HTTP - HyperText Transfer Protocol):**
    - 포트 80은 HTTP 프로토콜을 사용하는 일반적인 웹 트래픽에 할당된 기본 포트이다.
5. **포트 110 (POP3 - Post Office Protocol version 3):**
    - 전자 메일 수신을 위한 프로토콜인 POP3가 사용하는 포트이다.
    - 이 포트를 통해 이메일 클라이언트가 메일 서버로부터 이메일을 가져온다.
6. **포트 143 (IMAP - Internet Message Access Protocol):**
    - 전자 메일을 수신하고 관리하기 위한 프로토콜인 IMAP이 사용하는 포트이다.
    - POP3와 유사하지만, 메일 서버에 메일이 유지되면서 클라이언트 간 메일 동기화를 지원한다.
7. **포트 443 (HTTPS - HyperText Transfer Protocol Secure):**
    - 포트 443은 HTTPS 프로토콜을 사용하는 안전한 웹 트래픽에 할당된 기본 포트이다.
8. **포트 3306 (MySQL):**
    - MySQL 데이터베이스 서버와의 통신에 사용되는 포트이다.
    - MySQL은 데이터베이스 시스템으로, 다양한 웹 애플리케이션에서 데이터를 저장하고 검색하는 데 사용된다.
9. **포트 5432 (PostgreSQL):**
    - PostgreSQL 데이터베이스 서버와의 통신에 사용되는 포트이다.
    - PostgreSQL은 고급 관계형 데이터베이스 시스템으로, MySQL과 유사하지만 몇 가지 차이가 있다.
10. **포트 5900 (VNC - Virtual Network Computing):**
    - 원격 데스크톱 공유를 위한 프로토콜 VNC가 사용하는 포트이다.
    - VNC를 사용하면 원격 지점에서 다른 컴퓨터의 데스크톱 화면을 보거나 제어할 수 있다.

## Node.js로 서버 생성하기

응답과 요청을 처리하기 위해서는 `createServer` 로 서버를 생성해야 한다. 또한 브라우저는 포트를 내부에 추가하지만 Node.js로 작업해서 자체 서버를 생성할 때는 들어오는 request를 수신할 포트를 Node.js에 알려주어야 한다. (`listen`)

```jsx
const http = require('http');

const server = http.createServer();

server.listen(3000);
```

개발 중에는 다른 서비스와의 충돌을 막기 위해 주로 `3000 포트`와 같은 기본이 아닌 포트를 사용한다.

[📃 Node.js HTTP Module](https://www.w3schools.com/nodejs/nodejs_http.asp)

<br>
<br>

# response, request 핸들링하기

```jsx
const http = require('http');

function handleRequest(request, response) {
  response.statusCode = 200;
  response.end('<h1>Hello World!</h1>');
}

const server = http.createServer(handleRequest);

server.listen(3000);
```

`createServer` 메서드를 사용하여 `server` 객체를 생성할 수 있다. 이 때 `createServer` 메서드의 인수는 콜백함수이다. 이 콜백함수는 서버의 요청을 처리하는 함수이고, 인수로 `request`와 `response`를 받는다.

[📃 HTTP 상태 코드 - HTTP | MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)

위와 같이 작성한 app.js를 터미널에서 `node app.js`로 실행하면 아래처럼 서버가 가동된다. 개발자 도구의 Network 탭에서도 확인할 수 있다.

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/09920d48-621e-469f-b08a-ba836bfa11b5)

<br>

## url 핸들링
```js
const http = require('http');

function handleRequest(request, response) {
  if (request.url === '/currenttime') {
    response.statusCode = 200;
    response.end(`<h1>${new Date().toISOString()}</h1>`);
  } else if (request.url === '/') {
    response.statusCode = 200;
    response.end('<h1>Hello World!</h1>');
  }
}

const server = http.createServer(handleRequest);

server.listen(3000);
```