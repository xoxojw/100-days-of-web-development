# DOM이란?

> Document Object Model의 약자로, 작성된 HTML 코드를 파싱하여 데이터와 브라우저의 내부를 표현하는 것을 설명해주는 역할을 한다.
> 

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/61740ce2-548d-4aa8-9e47-3e292b10b1b5)


## HTML에서 DOM으로

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/11aa1c11-0a72-4a15-88c7-9886940ba370)

### DOM Tree

- 브라우저는 웹사이트를 불러오면 브라우저의 자바스크립트 엔진이 HTML 코드를 자바스크립트 객체 묶음으로 해석한다. 우리가 작성한 모든 HTML 요소는 자바스크립트 객체로 해석되고, 그 객체들은 HTML 구조를 나타내기 위해 서로 중첩이 된다.
- 다시 말하면, HTML 코드의 자바스크립트 표현이 있고 이 HTML 구조가 자바스크립트 객체의 구조로 변환되었기 때문에 자바스크립트 코드는 DOM과 상호작용할 수 있다.
- **이 DOM을 시작하는 것이 바로 `document` 객체이다. `document` 객체를 통해 DOM에 접근한다.**

브라우저에서 HTML 코드를 바꾸거나 값을 추출하기 위해 파싱된 HTML 코드에 접근할 수 있는 방법이 필요하다. 이것이 바로 DOM이 필요한 이유이다. 자바스크립트 코드는 화면에서 일어나는 일에 접근해야 하기 때문이다.

<br />

## 콘솔에서 document 객체 살펴보기

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/3f6c6f8b-7209-40ea-84aa-ff3daad5b6c5)


- `console.log(document)`를 실행하면 전형적인 HTML 코드처럼 보인다. 하지만 `document` 객체 안에는 HTML 코드가 없다. 진짜 자바스크립트 객체를 보려면 `console.dir(document)`를 실행하면 된다.

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/7a7904a4-223a-45d6-8122-416e109d8621)

<br />
<br />

# 참고 - 자바스크립트 엔진과 렌더링 엔진

1. **자바스크립트 엔진 (JavaScript Engine)**
  - 웹 페이지에 포함된 자바스크립트 코드를 실행하는 역할을 한다.
  - V8 엔진이나 SpiderMonkey 등이 있다.
  - 자바스크립트 엔진은 HTML 문서 안에 삽입된 `<script>` 태그 내의 자바스크립트 코드를 해석하고 실행한다. 이때, DOM(Document Object Model)을 생성하고, 웹 페이지의 동적인 요소들을 조작하는데 사용된다.
2. **렌더링 엔진 (Rendering Engine)**
  - HTML과 CSS를 해석하고 웹 페이지를 화면에 렌더링하는 역할을 한다.
  - Blink(Chrome), Gecko(Firefox), WebKit(Safari) 등이 있다.
  - 렌더링 엔진은 HTML과 CSS를 화면에 표시할 수 있는 그래픽 형태로 변환한다. 이 과정에서 DOM 트리와 CSS 스타일 규칙을 사용하여 웹 페이지의 레이아웃을 구성하고 최종적으로 화면에 표시한다.

자바스크립트 엔진과 렌더링 엔진은 서로 독립적으로 동작하지만, 둘 사이에는 연계성이 있다. 예를 들어, 자바스크립트 코드가 실행되면 DOM이 변경될 수 있고, 이 변경 사항은 다시 렌더링 엔진에 의해 반영되어 화면에 새로운 내용이 나타날 수 있다.

<br />
<br />

# DOM 조작하기

## 1. 새로운 HTML 요소 삽입

```jsx
// 요소 추가
// 1. 새 요소를 만들고
let newAnchorElement = document.createElement("a");
newAnchorElement.href = "https://google.com";
newAnchorElement.textContent = "This leads to Google!";

// 2. 새 요소를 추가할 부모 요소에 접근
let firstParagraph = document.querySelector("p");

// 3. 새 요소를 부모 요소 content에 삽입 <tag>content</tag>
firstParagraph.append(newAnchorElement);
```

<br />

## 2. DOM 요소 삭제

```jsx
// 요소 삭제
// 1. 삭제할 요소를 선택
let firstH1Element = document.querySelector("h1");

// 2. 삭제!
firstH1Element.remove();
firstH1Element.parentElement.removeChild(firstH1Element); // for older browsers
```

- 현재의 브라우저에서는 `remove` 메서드로 간단하게 삭제할 수 있지만 오래된 버전의 브라우저에서는 작동하지 않을 수 있다. 옛날 버전의 브라우저까지 고려한다면 `.parentElement.removeChild(childElement)` 메서드로 삭제해야 한다.

<br />

## 3. DOM 요소 이동

```jsx
// 요소 이동
firstParagraph.parentElement.append(firstParagraph);
// anchorElement.parentElement.insertBefore(anchorElement, anchorElement.parentElement.firstChild);
```

- 이동할 요소의 부모 요소를 선택하고 append나 insertBefore을 사용하면 이동시킬 수 있다.

<br />

## 4. innerHTML

- 요소 내에 포함된 html 또는 xml 마크업을 가져오거나 설정한다.

```jsx
let element = document.getElementById('example');
let innerHTMLContent = element.innerHTML; // HTML 내용 가져오기

// HTML 내용 설정
element.innerHTML = '<p>New content</p>';
```

- 일반 텍스트를 삽입할 때는 innerHTML을 사용하지 않는 것이 좋다. 대신 `Node.textContent`를 사용할 수 있는데, 이것은 전달된 내용을 html로 파싱하지 않고 원시 텍스트(raw text)로 삽입한다.
- 또는 `innerAdjacentHTML()`을 사용하는 것을 고려할 수 있다.

### `textContent`

```jsx
let element = document.getElementById('example');
let textContent = element.textContent; // 텍스트 내용 가져오기
```

- 요소의 텍스트 컨텐츠를 나타낸다.
- html 태그를 파싱하지 않고 텍스트만을 가져온다. 또한 특수 문자, html 엔터티를 해석하지 않고 그대로 반환한다.
- ex. `<div>Hello <span>world</span></div>` 의 `textContent`는 “Hello world”를 반환한다.