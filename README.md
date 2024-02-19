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
    - 브라우저 측 JavaScript 코드 내부에서 직접 보내는 백그라운드 요청
    - 백그라운드에서 호출되기 때문에 사용자들은 알 수 없음 (페이지 새로고침 X)
    
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

## 📌 실전에서 적용하기

```jsx
// routes/blog.js

router.get('/posts/:id/comments', async function (req, res) {
  const postId = new ObjectId(req.params.id);
  const post = await db.getDb().collection('posts').findOne({ _id: postId });
  const comments = await db
    .getDb()
    .collection('comments')
    .find({ postId: postId }).toArray();

  return res.json(comments);
});
```

```jsx
// public/scripts/comments.js

const loadCommentsBtnElement = document.getElementById('load-comments-btn');

async function fetchCommentsForPost() {
  const postId = loadCommentsBtnElement.dataset.postid;

  const response = await fetch(`/posts/${postId}/comments`);
  const responseData = await response.json()
}

loadCommentsBtnElement.addEventListener('click', fetchCommentsForPost);
```

routes/blog.js는 서버 사이드 코드이고, scripts/comments.js는 클라이언트 사이드 코드이다.

<br>

### res.json()

- 여기서 json() 메서드는 **Express.js Reponse 객체의 메서드**
- routes/blog.js의 `res.json()`은 서버 측에서 클라이언트로 데이터를 보낼 때 사용
- JavaScript 객체나 배열을 JSON 문자열로 변환

<br>

### response.json()

- 여기서 json 메서드는 **Fetch API Response 객체의 메서드**
- scripts/comments.js의 `response.json()`은 서버로부터 받은 응답을 처리할 때 사용
- JSON 형식의 응답 데이터를 파싱하여 JavaScript 객체로 변환

<br>
<br>

## 📌 More HTTP Methods

> 이번 섹션에서는 GET과 POST method만 다루어봤지만 이 외에도 더 많은 HTTP 메서드들이 있다.
> 

### GET

데이터 fetch

- URL 입력, method=”GET”
- 링크 클릭
- `<form method=”GET”>`

### POST

데이터 저장

- method=”POST”
- `<form method=”POST”>`

GET과 POST는 브라우저의 디폴트 Http 메서드들이다.

브라우저 디폴트 Http 메서드는 아니지만 **Ajax 또는 JavaScript 기반 Http request들로 사용할 수 있는 메서드들이 있다. - PUT, PATCH, DELETE**

### PUT

주로 리소스 전체를 업데이트 할 때 사용

지정된 URI에 리소스가 없으면 새로 생성할 수 있고, 기존 리소스가 있다면 해당 리소스를 완전히 대체함

- method: ‘PUT’

### PATCH

데이터 업데이트

`PUT`과 달리 리소스의 일부만 업데이트한다.

- method: ‘PATCH’

### DELETE

데이터 삭제

- method: ‘DELETE’

### 유의사항

PUT, PATCH, DELETE는 브라우저 기본 메서드인 GET, POST와 달리 form submit method에 사용될 수 없다.

```jsx
// views/includes/post-item.ejs

<form action="/posts/<%= post._id %>/delete" method="POST">
  <button class="btn btn-alt">Delete Post</button>
</form>
```

`<form method=”DELETE”>`를 사용할 수 없으므로, 포스트를 삭제하는 form임에도 `<form method=”POST”>`로 설정

PUT, PATCH, DELETE 메서드는 JavaScript 기반 HTTP 요청의 경우에만 사용할 수 있기 때문이다. (브라우저 기반 HTTP 요청은 GET, POST만 가능)

PUT, PATCH도 req.body를 전달할 수 있다. 단, DELETE는 불가능하다.(DELETE는 GET과 유사)

<br>
<br>