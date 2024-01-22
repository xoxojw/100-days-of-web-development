# More about Express.js

## 컨텐츠 정적 렌더링

정적인 컨텐츠는 백엔드 코드로 조작되지 않는 컨텐츠이다.

우선 현재 프로젝트의 폴더구조이다.

```
📦projects
 ┣ 📂node_modules
 ┣ 📂public
 ┃ ┣ 📂scripts
 ┃ ┃ ┗ 📜responsive.js
 ┃ ┣ 📂styles
 ┃ ┃ ┣ 📜index.css
 ┃ ┃ ┣ 📜recommend.css
 ┃ ┃ ┣ 📜restaurants.css
 ┃ ┃ ┗ 📜shared.css
 ┣ 📂views
 ┃ ┣ 📜about.html
 ┃ ┣ 📜confirm.html
 ┃ ┣ 📜index.html
 ┃ ┣ 📜recommend.html
 ┃ ┗ 📜restaurants.html
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜app.js
 ┣ 📜package-lock.json
 ┗ 📜package.json
```

화면의 내용을 나타내는 `html 파일들은 views 폴더`에, `js 파일과 css 파일은 public 폴더` 안에서 script 폴더와 styles 폴더에 있다.

```jsx
app.use(express.static('public'));
```

<br>
<br>

## 제출된 Form 데이터 핸들링하기

```jsx
app.post('/recommend', (req, res) => {
  const restaurant = {
    name: req.body.name,
    address: req.body.address,
    cuisine: req.body.cuisine,
    website: req.body.website,
    description: req.body.description,
  };
  const filePath = path.join(__dirname, 'data', 'restaurants.json');

  const fileData = fs.readFileSync(filePath);
  const restaurantsData = JSON.parse(fileData);

  restaurantsData.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(restaurantsData));

  res.redirect('/confirm');
});
```

이렇게 완벽하게 작성했다고 생각했는데, json에 입력 데이터가 전송되지 않았다.

그 이유는 recommend 페이지의 form에 `action`과 `method` 속성을 설정해주지 않았었기 때문!

`recommend.html` 파일의 form에 속성을 추가해준다.

```html
<form action="/recommend" method="POST">
  <div class="form-control">
    <label for="name">Restaurant name</label>
    <input type="text" id="name" name="name" required />
  <!-- 중간 생략 -->
</form>
```

이렇게 추가까지 해주면 아래처럼 json 파일에 form으로 제출한 데이터가 잘 들어오는 것을 볼 수 있다.

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/d6740e93-f31c-4277-ad5b-2eafad56bc50)

그런데 restaurant 정보를 불러올 때 한 가지 뻘짓을 했다.

```jsx
const restaurant = {
    name: req.body.name,
    address: req.body.address,
    cuisine: req.body.cuisine,
    website: req.body.website,
    description: req.body.description,
  };
```

바로 이 부분인데, 굳이 저렇게 하나하나 써줄 필요 없이 `const restaurant = req.body` 로만 입력해줘도 위의 json 파일에 들어온 것처럼 똑같이 들어온다.

그 이유는 form 안의 요소들에 `name` 속성을 모두 달아주었기 때문이다. 이전에 `id`와 `name`의 차이를 몰라 정리해둔 내용을 다시 복습해보자.

- `name`
    - 특히 폼 요소에서 서버로 데이터를 전송할 때 사용되며, 서버에서는 이 `name` 속성값을 통해 해당 데이터를 식별한다.
    - 폼 안에서는 중복될 수 있다. 하나의 폼 안에서 여러 요소가 동일한 `name`을 갖고 있을 수 있다.
    - 폼 데이터를 서버에 전송할 때, 특히 라디오 버튼이나 체크박스 등 그룹으로 묶인 요소에서 사용된다.

따라서 html 파일에서 name 속성을 입력해두면 node.js가 req.body 안의 name 속성을 찾아 `“name”: value`형태로 자동으로 처리해주기 때문에 app.js에서 또한번 name과 value를 하나하나 매치해서 입력해줄 필요가 없다는 뜻이다.

```jsx
const restaurant = req.body
```

<br>
<br>

## EJS 라이브러리로 컨텐츠 동적 렌더링하기

### Express 템플릿 엔진

`Express`는 템플릿 엔진을 사용하여 서버에서 동적으로 HTML을 생성하고 클라이언트에게 전송할 수 있다.

템플릿 엔진은 HTML 코드 내에 동적으로 데이터를 삽입하고 조작할 수 있는 방법을 제공한다. 이를 통해 서버 측에서 동적인 콘텐츠를 생성하여 클라이언트에게 제공할 수 있다.

`Express`는 다양한 템플릿 엔진을 지원한다. 그 중에서도 가장 일반적으로 사용되는 것은 `EJS` (Embedded JavaScript)와 `Pug`가 있다.

1. EJS (Embedded JavaScript)
    - `EJS`는 JavaScript 코드를 HTML 안에 삽입할 수 있는 템플릿 엔진
    - `<%= %>` 구문을 사용하여 JavaScript 코드를 출력하고, `<% %>`를 사용하여 제어 구조를 표현
    
    예시:
    
    ```html
    <h1>Hello, <%= username %></h1>
    ```
    
2. Pug *(구 Jade 현 Pug)*
    - `Pug`는 들여쓰기를 통해 HTML을 생성하는 간결하고 가독성 있는 문법을 가진 템플릿 엔진이다.
    - 각 줄의 들여쓰기로 HTML의 계층 구조를 나타낸다.
    
    예시:
    
    ```html
    html
      head
        title My Express App
      body
        h1 Welcome to Express
        p This is a Pug template
    ```
    

이번 강의에서는 EJS를 사용했다.

<br>

### `express set 메서드`로 EJS 불러오기

```bash
npm install EJS
```

```jsx
// app.js
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
```

- `app.set('views', path.join(__dirname, 'views'));`
    - `처음 ‘views’` : express set 메서드에 미리 정해진 속성으로, 뷰들이 들어있는 폴더 또는 폴더 배열을 설정하겠다는 의미
    - `path.join 안의 ‘views’` : 실제 폴더 이름
    - 즉, 뷰 템플릿 파일이 위치한 디렉토리를 설정해주는 코드이다.
- `app.set('view engine', 'ejs')` : 뷰 엔진으로 `EJS`를 사용하겠다고 설정

<br>

### 동적으로 컨텐츠 렌더링하기

이제 사용자들이 form을 통해 제출해서 json에 저장된 데이터들을 동적으로 렌더링해줄 수 있다.

먼저, `index.html`을 포함한 `views 폴더` 안에 있는 html 파일들의 확장자를 `.html`에서 `.ejs`로 바꿔준다.

```jsx

app.get('/', (req, res) => {
  res.render('index'); //index.ejs 파일
})

// app.get('/', (req, res) => {
//   const htmlFilePath = path.join(__dirname, 'views', 'index.html');
//   res.sendFile(htmlFilePath);
// });
```

그러면 아래의 주석처리된 코드처럼 파일 경로와 해당 파일을 따서 sendFile로 장황하게 코드를 작성하지 않고 `res.render(’파일이름’)`으로 간단하게 가져올 수 있다.

아직은 동적 라우팅을 다루지 않아서 아래처럼.. 페이지 하나하나 가져와줘야 한다..^^

```jsx
app.get('/', (req, res) => {
  res.render('index'); // index.ejs
})
// app.get('/', (req, res) => {
//   const htmlFilePath = path.join(__dirname, 'views', 'index.html');
//   res.sendFile(htmlFilePath);
// });

app.get('/about', (req, res) => {
  res.render('about'); // about.ejs
})
// app.get('/about', (req, res) => {
//   const htmlFilePath = path.join(__dirname, 'views', 'about.html');
//   res.sendFile(htmlFilePath);
// });

app.get('/comfirm', (req, res) => {
  res.render('comfirm');
})
// app.get('/confirm', (req, res) => {
//   const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
//   res.sendFile(htmlFilePath);
// });

app.get('/recommend', (req, res) => {
  res.render('recommend');
})
// app.get('/recommend', (req, res) => {
//   const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
//   res.sendFile(htmlFilePath);
// });

app.get('/restaurants', (req, res) => {
  res.render('restaurants');
})
// app.get('/restaurants', (req, res) => {
//   const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
//   res.sendFile(htmlFilePath);
// });
```

이제 진짜로 json에 담겨져 있는 restaurant 정보들을 보여줄 수 있다.

결론부터 이야기하면, `‘/restaurants’`를 보여주는 곳에서 `restaurants.json` 파일을 가져온 뒤, `JSON.parse`로 파싱하여 반복문으로 뿌려주면 되는데 그 전에 `restaurants.ejs` 파일의 내용을 ejs 문법으로 수정해주어야 한다.

```html
<main>
  <h1>Recommended restaurants</h1>
  <p>Find your next favorite restaurants with help of our other users!</p>
  <p>We found <%= numberOfRestaurants %> restaurants.</p>
  <ul id="restaurants-list">
    <% for (const restaurant of restaurants) { %>
      <li class="restaurant-item">
        <article>
          <h2><%= restaurant.name %></h2>
          <div class="restaurant-meta">
            <p><%= restaurant.cuisine %></p>
            <p><%= restaurant.address %></p>
          </div>
          <p>
            <%= restaurant.description %>
          </p>
          <div class="restaurant-actions">
            <a href="<%= restaurant.website %>">View Website</a>
          </div>
        </article>
      </li>
    <% } %>
  </ul>
</main>
```

`restaurants.ejs`에서 레스토랑의 정보를 보여주는 부분인데, `<%= %>`와 `<% %>`로 감싸져있는 부분들이 ejs로 수정해 준 코드들이다. 이렇게 수정해주면 변수로 사용할 수 있다.

`restaurant.ejs`에서 ejs로 수정해 준 내용들 중에, 결국 `for (const restaurant of restaurants)` 부분의 `restaurants`변수에 파싱한 레스토랑 배열 데이터만 할당해주면 for문으로 <li>들이 화면에 렌더링 될 것이다.

```jsx
app.get("/restaurants", (req, res) => {
	const filePath = path.join(__dirname, "data", "restaurants.json");

	const fileData = fs.readFileSync(filePath);
	const restaurantsData = JSON.parse(fileData);

	res.render("restaurants", {
		numberOfRestaurants: restaurantsData.length,
		restaurants: restaurantsData,
	});
});
```

이렇게 `res.render` 부분에 `key-value`로 전달해주면 아래처럼 동적으로 컨텐츠가 렌더링이 된다!

<div align="center">
  <img src="https://github.com/xoxojw/100-days-of-web-development/assets/124491335/93e57413-7142-4714-ad6c-9c78e9372c2d" width="600px" />
</div>

<br>

### Including Partial Content: `<*%- %>`

모든 html 파일들에 공통적으로 존재하는 부분들이 있다. `<header>`나 모바일 화면의 햄버거 메뉴인 `<aside *id*="mobile-drawer">` 같은 요소들이다.

리액트에서는 컴포넌트로 쉽게 분리하여 재사용할 수 있다. 현재 상황에서는 ejs의 `<%- %>` 문법을 사용하여 이를 모듈처럼 분리할 수 있다.

1. **Unescaped Output (이스케이프되지 않은 출력)**: `<%- %>`는 코드 실행 결과를 HTML에 그대로 삽입한다. 이는 특수 문자(HTML 엔터티)를 이스케이프하지 않고 그대로 출력하며, HTML 태그를 생성하거나 이미지를 삽입하는 등의 작업에 유용하다.
    
    ```html
    <div>
      <%- variableContainingHTML %>
    </div>
    ```
    
    위의 예제에서 `variableContainingHTML`에 포함된 HTML 코드는 그대로 출력되어 브라우저에서 렌더링된다.
    
2. **보안 메커니즘**: 이스케이프되지 않은 출력을 사용할 때는 보안에 유의해야 한다. 사용자가 제공한 데이터를 이 부분에 직접 삽입할 때, 크로스 사이트 스크립팅(XSS) 공격에 취약해질 수 있기 때문이다. 이를 방지하기 위해 사용자 입력 데이터를 적절히 검증하고 이스케이프하는 등의 조치가 필요하다.

EJS 템플릿에서 `<%- %>`를 사용하면 JavaScript 코드의 결과를 HTML에 그대로 삽입할 수 있어서 동적인 웹 페이지를 구현하는 데 효과적으로 활용할 수 있지만, 다른 파일에 저장하는 일부 HTML 코드를 포함하는 경우에는 사용하지 않는게 좋다.

- 컨벤션
    - `views` 폴더 안에 `includes`라는 이름의 새 폴더를 만들고 분리하고 싶은 모듈을 .ejs 파일로 만든다. (여기에서는 `header.ejs`) 폴더 네이밍 컨벤션이 includes인 이유는 사용하는 ejs 메서드 include를 사용하기 때문이다.

`header.ejs`에 `<header></header>`의 html 코드를 넣어주고, 각 html 파일에서 header가 있어야 할 곳에 아래의 코드를 넣어주면 된다.

```jsx
<%- include('includes/header') %>
```

`include`는 ejs의 함수이고, `'includes/header'`는 현재 html 파일의 경로를 기준으로 작성한 상대경로이다.

<br>