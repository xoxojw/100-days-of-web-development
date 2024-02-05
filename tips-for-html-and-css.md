# HTML, CSS 팁

## 📌 `<address></address>`

> 🤓 개인적으로 address 태그를 거의 사용해보지 않은 것 같은데 내 블로그 페이지에 바로 적용시켜 봐야겠다는 생각이 들었다!

[address - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/address)

`<address>`는 실제 지리적 주소뿐만 아니라 URL, 이메일 주소, 전화번호, 소셜 미디어 핸들 등 필요한 모든 유형의 연락처 정보를 나타낼 때 사용하는 태그이다.

연락처가 가리키는 개인, 조직, 단체의 이름은 반드시 포함하여야 한다.

<br>

## 📌 `<time></time>` , `toISOString()`, `toLocaleDateString()`

> 🤓 `<address>` 태그는 들어본 적은 있지만 잘 사용하지 않았던 것이라면, `time` 태그는 이번에 처음 알게 된 태그이다. 특히 스크린 리더와 같은 웹 접근성 향상에도 도움이 된다는 점이 좋은 것 같다. 사실 이미지나 버튼 태그에 들어가는 `alt` 속성을 처음 알게 되었을 때 ‘웹 접근성’이라는 요소를 처음 고려해봤다는 생각을 했던 기억이 있는데, 모든 사람들이 비장애인인 나처럼 웹 서비스를 눈으로 보고 사용하는 것이 아님을 염두해두자.

time 요소가 특별한 형태로 렌더링되는 것은 아니지만, 더 유용한 기능을 제공하는데 사용될 수 있다. seo나 스크린 리더 등 웹 접근성 향상, 알림 및 스케줄과 같은 사용자 기능 등이 있다. 날짜와 시간 데이터를 기계가 읽을 수 있는 형태로 변환해주는 datatime 속성을 포함할 수 있다.

```jsx
<p>이번 콘서트는 <time datetime="2019-04-19T20:00:00">4월 19일 저녁 8시</time>부터 시작합니다.</p>
```

```jsx
router.get('/posts/:id', async (req, res) => {
  // ... 생략

  // 다른 요소는 그대로, date 형식 변환
  const postData = {
    ...posts[0],
    date: posts[0].date.toISOString(),
    humanReadableDate: posts[0].date.toLocaleDateString('ko-KR')
  };

  res.render('post-detail', { post: postData });
});
```

`toISOString()`과 `toLocaleDateString()`은 JavaScript의 날짜 관련 내장 메소드이다.

간단하게는 `toISOString()`은 기계가 읽기 적합하고, `toLocaleDateString()`은 사람이 읽기 적합한 형태로 바꾼다.

DB에서 불러온 문자열 형태의 `post.date`를 `.toISOString()`으로 변환하여 기계가 읽을 수 있는 형태로 바꿔준다. 이 데이터를 바탕으로 `<time>`의 `datetime` 속성에 값을 할당한다.

```jsx
// toISOString - ISO 형식(ISO 8601)의 문자열을 반환
const today = new Date("05 October 2011 14:48 UTC");
console.log(today.toISOString()); // Returns 2011-10-05T14:48:00.000Z
```

```jsx
// toLocaleDateString
toLocaleDateString(); // 생략하면 현재 브라우저의 언어권 자동으로 사용
toLocaleDateString(locales);
toLocaleDateString(locales, options); // options의 값은 항상 "numeric"과 "long"을 사용
// numeric: 숫자 표기, long: 문자 표기

// toLocaleDateString example
// Korean uses year-month-day order
console.log(date.toLocaleDateString("ko-KR"));
// "2012. 12. 20."

const postData = {
    ...posts[0],
    date: posts[0].date.toISOString(),
    humanReadableDate: posts[0].date.toLocaleDateString('ko-KR', {
      weekday: 'long',
      year: 'numeric', // year은 항상 numeric
      month: 'long',
      day: 'numeric',
    })
  }; // 2024년 2월 4일 일요일
```

- 추가로 시간을 나타내고 싶으면 `toLocaleTimeString()` 메소드를 사용할 수 있음

<br>

## 📌 css 속성 - white-space

`white-space`의 기본값은 `normal`로 연속 공백과 줄바꿈을 하나의 공백으로 처리

`white-space: pre-wrap` 으로 설정하면 연속 공백과 줄바꿈을 유지, 한 줄이 너무 길어서 넘칠 경우 자동으로 줄을 바꾼다.

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/1e1b44bb-1cd4-4eb1-a441-d2ff92b1eda8)

🔎 더 자세히 알아보기 [white-space - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/ko/docs/Web/CSS/white-space)

<br>
<br>