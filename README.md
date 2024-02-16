# 파일 업로드 기능 구현하기

```bash
mongod --dbpath /Users/jiwon/mongodb/data --logpath /Users/jiwon/mongodb/logs/mongo.log
npm start
```

<br>

## `<input type=”file” />`

```jsx
<input type="file" id="image" name="image" required accept=".png" />
```

<br>

### `type=”file”`

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/21f14921-64f7-4213-8940-ad1f6bb1c857)

input의 type을 file로 지정하면 위의 이미지처럼 파일 선택할 수 있는 ui가 나타남

<br>

### accept

```jsx
<input type="file" accept=".png" />
```

accept 속성을 이용하면 업로드 할 수 있는 파일의 유형을 제어할 수 있다.

`accept=".png"` 로 설정해두면, `.png`는 선택할 수 있지만 .png가 아닌 `.jpeg` 파일은 비활성화됨

여러 확장자를 추가하고 싶으면 쉼표로 구분하여 나열함

```html
<input type="file" accept=".png,.jpg,.jpeg,.webp" />
```

하나하나 추가하지 않고 아래처럼 추가할 수도 있다.

```html
<input type="file" accept="image/jpg,image/png" />
<input type="file" accept="image/*" /> // pdf 파일은 허용되지 않음
```

`image/jpg` 와 같이 속성을 추가하면 jpeg, jpg 모두 허용됨

<br>
<br>

## enctype

`<form>` 태그에 사용되는 속성이며, 폼 데이터가 서버로 제출될 때 그 폼 데이터가 어떻게 인코딩되는지 정의

`enctype` 속성을 이용하면 브라우저가 해당 데이터를 서버에 보낼 때 브라우저가 {body} 요청으로 압축하는 방법을 설정해줄 수 있다.

1. `application/x-www-form-urlencoded`: 기본값, 모든 문자는 서버로 전송되기 전에 URL 인코딩됨. 대부분의 폼 제출은 이 값으로 인코딩됨
2. `multipart/form-data`: 파일이나 큰 데이터를 전송할 때 사용. 이 인코딩 타입을 사용하면 각 폼 요소가 별도의 데이터 블록으로 전송됨. 주로 하나 이상의 `<input type="file">`이 폼에 포함되어 있을 때 사용
3. `text/plain`: 이 인코딩 타입은 공백 문자가 "+" 기호로 변환되지 않고 공백 그대로 유지된다. 이 타입은 디버깅 목적으로 주로 사용되며, 일반적인 폼 제출에는 권장되지 않는다.

<br>
<br>

## Multer 미들웨어 적용

### Multer 미들웨어란?

이미지, 동영상 등을 비롯한 여러 파일들을 멀티파트 형식으로 업로드할 때 사용하는 미들웨어

> 멀티파트 형식이란 `enctype`이 `multipart/form-data` 인 폼을 통해 업로드하는 데이터의 형식
> 

<br>

### 특정 라우트에만 미들웨어 적용하기

지금까지는 `app.use`와 같이 전체 라우트에 적용되는 미들웨어만 살펴봤었다.

```jsx
// app.js
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));
```

그리고 개별 express router에 미들웨어를 적용하지 않고 최종 라우트 처리 함수(`function (req res) {}`)만 추가했었는데, 개별 라우터에도 최종 라우트 처리 함수 이전에 미들웨어를 무제한으로 추가할 수 있다.

```jsx
router.method('/url/path', middleware1, middleware2, ..., function (req, res) {})
```

이 때 미들웨어 함수는 왼쪽부터 오른쪽으로 실행되므로 순서가 중요하다. (middleware1 → middleware2)

<br>
<br>

## 클라이언트와 서버에서 Form 데이터 처리 과정

```html
<!-- views/new-user.js -->

<form action="/profiles" method="POST" enctype="multipart/form-data">
  <div class="form-control">
    <label for="username">Username</label>
    <input type="text" id="username" name="username" required>
  </div>
  <div class="form-control">
    <label for="image">User image</label>
    <input type="file" id="image" name="image" required accept="image/jpg,image/png" />
  </div>
  <button class="btn">Save User</button>
</form>
```

```jsx
// routes/users.js
const express = require('express');
const multer = require('multer');

const upload = multer({});
const router = express.Router();

// ...

router.post('/profiles', upload.single('image'), function (req, res) {
  const uploadedImageFile = req.file;
  const userData = req.body; // username: form에서 file을 제외한 유일한 body 요소
})
```

- **Form 데이터 전송** : 사용자가 form을 submit하면 form에 지정된 action 속성(’/profiles’)와 method 속성 (’POST’)에 따라 데이터가 서버로 전송된다.
- **서버에서 데이터 수신 및 처리** : Form 데이터가 서버로 전송되면 아래의 router/users.js 파일 내에서 `router.post('/profiles', upload.single('image'), function (req, res) {...})` 코드가 이 요청을 처리한다.
- **데이터 처리 및 응답**: `function (req, res) {...}` 부분에서 `req.file`과 `req.body`를 사용하여 사용자로부터 받은 데이터를 처리한다. 데이터를 DB에 저장하고, 처리 결과에 따라 클라이언트에 적절한 응답을 보낼 수 있다.

<br>
<br>

## 백엔드에 파일 저장하는 방법

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/74b3250e-4b3e-47e3-8638-97b591f87e9d)

일반적인 데이터는 DB에 저장하지만, 이미지를 포함한 파일들은 파일 시스템으로 하드 드라이브에 따로 저장

DB에는 이 파일들이 저장된 경로(문자열)를 저장한다.

<br>

### multer 미들웨어에 파일 저장 경로 지정

프로젝트 루트 폴더에 유저들이 업로드한 파일들을 저장해둘 `images` 폴더를 생성

- `dest` (destination)
    
    ```jsx
    // route/users.js
    
    const upload = multer({ dest: 'images' }); // destination 설정
    
    router.post('/profiles', upload.single('image'), function (req, res) {
      const uploadedImageFile = req.file;
      const userData = req.body;
    
      console.log(uploadedImageFile);
      console.log(userData);
    
      res.redirect('/');
    })
    
    // console.log(uploadedImageFile);
    // {
    //   fieldname: 'image',
    //   originalname: 'discord.png',
    //   encoding: '7bit',
    //   mimetype: 'image/png',
    //   destination: 'images',
    //   filename: '2078e9345722f6d20dd62666ed744067',
    //   path: 'images/2078e9345722f6d20dd62666ed744067',
    //   size: 20720
    // }
    
    // console.log(userData); // { username: 'Max' }
    ```
    
    - mutler 함수의 `dest` 매개변수에 `images` 폴더 지정
    - 이렇게 저장하면 `images` 폴더에 ‘2078e9345722f6d20dd62666ed744067’ 라는 이름의 파일이 생성되며, 확장자는 없다. 파일 이름을 직접 수정하여 2e73e943722f6d20dd62666ed744067.png 형태로 바꾸면 이미지를 확인할 수 있음

- `storage`
    - `dest`와 달리 경로만 저장하는 것이 아니라, 경로와 파일명에 대한 자세한 내용을 설정할 수 있음

```jsx
// route/users.js

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
	  // 파일 이름을 중복되지 않게 저장하면서 가독성 챙기기, originalname에는 확장자가 포함되어있음
  },
});

const upload = multer({ storage: storageConfig });
const router = express.Router();
```

<br>

### post 요청 처리 라우터 함수

```jsx
// route/users.js

// uploadedImageFile
// {
//   fieldname: 'image',
//   originalname: 'discord.png',
//   encoding: '7bit',
//   mimetype: 'image/png',
//   destination: 'images',
//   filename: '1708057702606-discord.png',
//   path: 'images/1708057702606-discord.png',
//   size: 20720
// }

// userData
// { username: 'Max' }

router.post('/profiles', upload.single('image'), async function (req, res) {
  const uploadedImageFile = req.file;
  const userData = req.body;

	// MongoDB로 전송
  await db.getDb().collection('users').insertOne({
    name: userData.username,
    imagePath: uploadedImageFile.path,
  });

  res.redirect('/');
})
```

<br>
<br>

## DB에서 불러온 파일 클라이언트에 렌더링하기

```jsx
// route/users.js

router.get('/', async function (req, res) {
  const users = await db.getDb().collection('users').find().toArray();
  res.render('profiles', { users });
});
```

`.toArray()`

- `toArray()` 메소드는 `find()` 메소드의 결과로 반환된 커서(cursor)를 배열로 변환
    - 커서란 db 쿼리 결과를 순차적으로 접근할 수 있는 포인터와 같은 역할
- 배열 형태로 변환하여 JavaScript에서 쉽게 다룰 수 있게 함. 이 배열은 조회된 문서들의 목록을 포함

```html
<!-- views/profiles.ejs -->
<section id="user-profiles">
  <ul>
    <% for (const user of users) { %>
    <li class="user-item">
      <article>
        <img src="<%= user.imagePath %>" alt="The image of the user.">
        <h2><%= user.name %></h2>
      </article>
    </li>
    <% } %>
  </ul>
```

하지만 이렇게 해도 user.name은 잘 불러와지지만 이미지는 404 에러가 발생하며 불러와지지 않음

개발자 도구를 이용해서 같은 정적 파일인 css 파일을 불러오는 과정을 살펴볼 수 있다.

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/c2114424-03f0-4395-b222-ae4f1fbb68c1)

```jsx
// app.js
app.use(express.static('public'));
```

public/styles 경로에 css 파일들이 저장되어 있는데, `express.static` 미들웨어 함수를 사용하여 정적 파일들이 위치하는 디렉토리를 지정해서 불러온다.

따라서 이미지 파일을 저장해둔 경로도 express.static 미들웨어 함수로 지정해주어야 함

```jsx
// app.js
app.use(express.static('images'));
```

하지만 이렇게 해도 여전히 이미지는 불러와지지 않는데, 아래처럼 `use` 메서드 미들웨어에 경로 필터를 설정해주어야 한다.

```jsx
// app.js
app.use('/images', express.static('images'));
```

`‘/images’`로 시작하는 경로가 있는 서버에 요청이 도달하는 경우에만 `express.static('images')` 미들웨어가 활성화된다고 명시해주는 것이다. (ex. `/images/userprofileimage.jpg`)

<br>
<br>

## 이미지 미리보기 기능

이미지 미리보기 기능은 클라이언트 측 자바스크립트로 직접 빌드해야 함

브라우저의 자바스크립트를 이용하면 새 페이지를 로드하지 않고 사용자가 화면에 보는 것을 조작할 수 있는 로직을 실행할 수 있다.

- `public` 폴더에 `scripts/file-preview.js` 파일 생성
- `views/new-user.ejs`에 `file-preview.js` 스크립트 파일 불러오는 코드 추가
    - `<script src="/scripts/file-preview.js" defer></script>`
    

### new-user.ejs

```html
<form action="/profiles" method="POST" enctype="multipart/form-data">
  <div class="form-control">
    <img id="image-preview" src="" alt="Your picked image." /> <!-- 미리보기 img 태그 추가 -->
    <label for="image">User image</label>
    <input type="file" id="image" name="image" required accept="image/jpg,image/png" />
  </div>
  <button class="btn">Save User</button>
</form>
```

<br>

### file-preview.js

```jsx
const filePickerElement = document.getElementById('image');
const imagePreviewElement = document.getElementById('image-preview');

function showPreview() {
  const files = filePickerElement.files;

  if (!files || files.length === 0) {
    imagePreviewElement.style.display = 'none';
    return;
  }

  const pickedFile = files[0];

  imagePreviewElement.src = URL.createObjectURL(pickedFile);
  imagePreviewElement.style.display = 'block';
}

filePickerElement.addEventListener('change', showPreview);
```

<br>

### profiles.css

```css
#image-preview {
  display: none;
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 50%;
}
```

<br>
<br>