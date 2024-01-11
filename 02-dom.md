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