# Dynamic Routes

```tsx
app.get('/restaurants/:id', (req, res) => { // /restaurants/r1
	const restaurantId = req.params.id;
	const filePath = path.join(__dirname, "data", "restaurants.json");

	const fileData = fs.readFileSync(filePath);
	const restaurantsData = JSON.parse(fileData);

	for (const restaurant of restaurantsData) {
		if (restaurant.id === restaurantId) {
			return res.render('restaurant-detail', { restaurant: restaurant });
		}
	};

	return res.render('404');
})
```

express에서도 React처럼 `/:id` 를 이용해서 동적 라우팅을 할 수 있다.

예제에서 사용자가 식당을 등록해서 json에 해당 폼이 업데이트될 때 uuid로 각 게시글의 고유 id를 넣어줬다.

식당 목록 페이지에서 해당 식당의 디테일을 보기 위한 링크를 클릭하면, `/restaurants/` 뒤에 해당 식당의 id를 `params`로 넘겨주고, `/restaurants/params` 페이지에서 이 params를 사용하여 json 식당 목록을 반복문으로 순회하여 `params`의 id와 같은 식당을 찾아 렌더링한다.

<br>
<br>

# Custom Middleware & Error Handling

## 404 Not Found

`404 Not Found` 에러는 서버가 클라이언트에서 요청받은 리소스를 찾을 수 없다는 의미이다. 브라우저에서는 알려지지 않은 URL을 의미한다.

이  404 에러가 발생했을 때, 못생긴 404 에러를 띄우는 것보단 이미 만들어둔 404 페이지를 보여주고 다른 방법을 안내하는 것이 UX 측면에서 더 좋다.

이 때 커스텀 미들웨어를 사용한다. 404는 이미 존재하는 경로에 대한 모든 요청을 처리하고 나서 마지막에 처리되어야 하기 때문에 아래의 이미지처럼 app.js의 마지막 줄에 입력한다. 

<div align="center">
  <img src="https://github.com/xoxojw/100-days-of-web-development/assets/124491335/b9b0b9ba-5874-4c09-80eb-68e9adb984e7" width="400px" />
</div>


```jsx
// 404 Not Found
app.use((req, res) => {
	res.render('404');
});
// '/admin'으로 시작하는 모든 경로에 대한 미들웨어, '/admin'으로 시작하는 모든 요청은 404로 라우팅된다.
// app.use('/admin', (req, res) => {
// 	res.render('404');
// });
```

<br>

## 500 Internal Server Error

앞서 404 에러를 다룰 때 404를 처리하는 미들웨어는 에러 핸들링이라기보다는 요청에 대한 처리를 하는 개념에 가깝다. 앞에서 실제 존재하는 경로에 대한 처리가 모두 끝나고나면, 당연히 존재하지 않는 경로일테니 실제 존재하지 않는 경로에 대한 처리를 해주는 것이다.

그러나 서버에서 발생하는 응답은 express가 이미 알고있다. 따라서 express에는 이러한 에러 핸들링을 하기 위한 미들웨어 함수가 존재하며, 이 함수는 4개의 매개변수를 가진다.

```jsx
// 500 Internal Server Error
app.use((error, req, res, next) => {
	ren.rendor('500');
 });
```

- error : 발생 오류에 대한 정보가 담겨있는 객체
- next : 함께 실행시킬 다른 미들웨어들을 정의한다. 미들웨어 내부에서 `next` 를 호출하면 `next` 미들웨어 또는 라인에 있는 경로 핸들러로 이동할 수 있다.

<br>

## 상태 코드 작업

> 웹 서버는 표준화된 상태 코드를 통해 request와 response의 상태를 통신한다.
> 

[HTTP 상태 코드 - HTTP | MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Status)

### 상태 코드 종류

- `200` : 성공! 요청이 성공적으로 파싱되었고, 응답이 문제 없이 생성될 것이다.
- `404` : 클라이언트 사이드 에러! 요청한 리소스나 URL을 찾을 수 없음
- `401` : 클라이언트 사이드 에러! 인증받지 않은 클라이언트가 리소스나 URL을 요청한 경우 (ex. 로그인하지 않아서)
- `500` : 서버 사이드 에러! 요청은 유효하지만 서버에서 뭔가 잘못되었고, 기대한 응답이 생성되지 못할 것이다.

앞서 404 에러와 500 에러를 처리했던 코드를 다시 보면 다음과 같다.

```jsx
// 404 Not Found
app.use((req, res) => {
	res.render('404');
});

// 500 Internal Server Error
app.use((error, req, res, next) => {
	ren.rendor('500');
 });
```

이 때 실제로 404 에러나 500 에러가 발생하면, 화면만 미리 준비해 둔 ‘Oops, sorry!’같은 에러 페이지만 렌더링할뿐, 아래와 같이 네트워크 탭에서 status를 살펴보면 성공했다며 바보처럼 200으로 처리하고 있다.

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/67425b7e-04f7-4d42-982d-1a708cdc2042)

이는 브라우저가 바보라서가 아니라 내가 서버 코드에서 status 처리를 해주지 않아서이므로, 다음과 같이 status 처리를 해주면 실제 브라우저상에서도 표준 상태 코드로 처리되는 것을 확인할 수 있다.

```jsx
// 404 Not Found
app.use((req, res) => {
	res.status(404).render('404'); // .status(status number)
});

// 500 Internal Server Error
app.use((error, req, res, next) => {
	ren.status(500).rendor('500');
 });
```

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/d8e0d396-0ec1-44a7-973b-02a5527512d1)

<br>