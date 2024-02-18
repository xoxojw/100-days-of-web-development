# Ajax & 비동기식 JS 기반 Http 요청

브라우저 측에서 사용할 수 있는 두 가지 JavaScript 내장 API

- `XMLHttpRequest`
- `fetch()`

<br>

## 📌 Ajax

> 비동기식 자바스크립트 XML(Asynchronous JavaScript And XML)
> 

자바스크립트를 사용하여 브라우저에서 서버와 비동기적으로 데이터를 교환하고 업데이트하는 데 사용되는 프로그래밍 기법

웹 페이지 전체를 다시 로드하지 않고도 서버로부터 데이터를 받아와서 페이지의 일부분만을 업데이트할 수 있다.

<br>

### Ajax 사용 이전과 이후 비교

- Ajax 없이 http 요청 보내기
    - URL 입력 (해당 URL로 GET 요청을 보냄)
    - 링크 클릭 (해당 URL로 GET 요청을 보냄)
    - 폼 제출 (해당 URL로 GET 또는 POST 요청을 보냄)
    
    → 항상 새 페이지가 로드된다는 단점
    

- Ajax로 http 요청 보내기
    - 브라우저 측 JavaScript를 통해 http 요청 보내기
    - 같은 스크립트 코드에서 응답 처리
    
    → 브라우저 동작에 대한 전체적인 통제권을 가지고 새 페이지 로딩을 방지할 수 있음

<br>

### XMLHttpRequest 객체

`XMLHttpRequest`는 브라우저에서 사용할 수 있는 Web API 내장 객체이다.

- 처음에는 XML 데이터를 전송하기 위해 개발됨
- 사용법이 복잡함
- 일반적으로 서드파티 라이브러리와 함께 사용
    - **axios**: 서버 사이드에서는 node.js의 `http` 모듈을 사용하고, 클라이언트(브라우저)에서는 `XMLHttpRequests`를 사용

<br>

### XML

*Extensible Markup Language*의 약자로, 데이터를 정의하는 규칙을 제공하는 마크업 언어이다.

- HTML을 베이스로 만들어졌기 때문에 HTML 형태처럼 보임
- HTML은 표준화되었지만 XML은 그렇지 않다.
- 더이상 복잡한 XML을 데이터 전송할 때 사용하지 않는다. → **현재는 `JSON` 형태를 사용**

<br>

### JSON

*JavaScript Object Notation*의 약자로, 클라이언트와 서버 간의 HTTP 통신을 위한 텍스트 데이터 포맷이다.

- 자바스크립트에 종속되지 않는 언어 독립형 데이터 포맷
- 대부분의 프로그래밍 언어에서 사용할 수 있음
- 자바스크립트의 객체 리터럴과 유사하게 키와 값으로 구성된 **순수한 텍스트**
    - JSON의 **키**와 **문자열 값**은 큰따옴표로 묶어야 한다. (작은 따옴표 안됨)

<br>
<br>

## 📌 fetch()

`fetch` 함수는 `XMLHttpRequest` 객체와 마찬가지로 HTTP 요청 전송 기능을 제공하는 클라이언트 사이드 Web API이다.

- `XMLHttpRequest` 객체보다 사용법이 간단하고 `Promise`를 지원하기 때문에 비동기 처리를 위한 콜백 패턴의 단점에서 자유로움
    - 단, axios와 같이 `XMLHttpRequest`를 기반으로 하는 서드파티 라이브러리들은 Proimse API를 지원함에 유의
- 비교적 최근에 추가된 Web API로 인터넷 익스플로러를 제외한 대부분의 모던 브라우저에서 제공
- 사용법이 비교적 복잡하지 않음
- `XMLHttpRequest`나 axios 같은 라이브러리에 대한 대안

<br>
<br>