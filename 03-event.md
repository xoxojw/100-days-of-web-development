# Event

- 유저가 사이트의 특정 부분에 입력, 클릭, 스크롤 하는 등의 행동을 의미한다. 자바스크립트를 사용하면 이벤트를 탐지하여 특정 코드를 실행하도록 할 수 있다.
- 웹의 경우 이벤트는 브라우저 윈도우 내에서 발생되는데, 다음와 같은 다양한 이벤트 타입들이 있다.
  - 유저가 어떤 요소를 선택하거나 어떤 요소 위에 커서를 올려둔다(hover).
  - 유저가 키보드에서 키를 선택한다.
  - 유저가 브라우저 창의 크기를 재조정하거나 닫는다.
  - 웹 페이지가 로딩을 완료했다.
  - 양식(form)이 제출되었다.
  - 비디오가 재생되거나, 멈추거나, 혹은 끝났다.
  - 오류가 발생했다.

<br />

## click 이벤트리스너

```jsx
let paragraphElement = document.body.firstElementChild;

function changeParagraphText() {
  paragraphElement.textContent = 'Clicked!';
}
  
// paragraphElement.addEventListener('click', () => {
//   paragraphElement.textContent = 'Clicked!';
// });
paragraphElement.addEventListener('click', changeParagraphText); // 콜백함수
```

- 콜백 함수
    - 다른 함수의 인수로서 넘겨주는 실행 가능한 함수를 말한다. 콜백을 넘겨받는 코드는 이 콜백을 필요에 따라 즉시 실행할 수도 있고, 아니면 나중에 실행할 수도 있다.

<br />

## 이벤트 객체

```jsx
// 1. 고전 이벤트 사용
element.on이벤트타입명 = function(event){

}

// 2. addEventLister() 사용
element.addEventListener('이벤트타입', function(event){

});
```

- addEventListener 콜백함수의 파라미터를 설정해주면(이 때 파라미터 이름은 무엇이든 상관없다. 함수의 첫 번째 파라미터를 자동으로 이벤트 객체로 지정한다. 하지만 보통 e 또는 event로 네이밍하는 것이 관례이다.) 이 이벤트 객체는 **해당 요소에 발생한 모든 이벤트에 대한 정보를 담은 객체**이다.
- 이벤트 객체의 내용은 그 이벤트에 따라서 달라진다.
  - ex. click 이벤트에서는 MouseEvent 객체, input 이벤트에서는 InputEvent 객체가 발생한다.

<br />

### event.target.value와 event.data

`event.target.value`는 항상 현재 요소에 event를 통해 저장된 완전한 값을 제공해주는 반면에 `event.data`는 마지막 이벤트 발생으로 추가된 구체적인 입력값을 출력한다.

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/370531cc-7849-439b-8e7d-21883b7cec88)

⬆️ 콘솔에 `event.target.value` 출력 시 로그

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/a6e056af-3fa0-4a45-aa67-628e29cf2f36)

⬆️ 콘솔에 `event.data` 출력 시 로그

<br />
<br />

# 자바스크립트로 css 스타일 변경하기

## DOM 요소의 스타일 변경

### 1) className

```html
<form>
      <div class="control">
        <label for="product-name">Product Name</label>
        <input type="text" id="product-name" name="product-name" maxlength="60">
        <span id="charcount">
          <span id="remaining-chars">60</span>/60
        </span>
      </div>
      <button>Submit</button>
    </form>
```

```css
input.warning {
  background-color: rgb(248, 191, 145);
}

#remaining-chars.warning {
  color:rgb(211, 109, 26);
}
```

```jsx
const spanElement = document.getElementById('remaining-chars');

spanElement.className = 'warning';
```

- `element.className(’some-class’)`로 해당 요소에 클래스명을 추가할 수 있다.

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/16268c2e-2bfa-4b14-b8b5-61e41bf5c6d5)

- 단점 : 이미 클래스를 가지고 있는 요소의 경우, 해당 클래스가 새로운 클래스로 덮어씌어진다. 기존 클래스와 새로운 클래스를 같이 사용하려면 `someElement.className = ‘old-class new-class’`처럼 기존 클래스명을 찾아 하드코딩으로 추가해주어야 한다.

<br />

### 2) classList의 메서드

- `classList` 프로퍼티는 다양한 메서드를 사용할 수 있는데, 이 메서드들을 통해 새로운 클래스를 추가하거나 기존 클래스를 삭제하여 `className`의 방법보다 더 쉽게 관리할 수 있다.

```jsx
spanElement.classList.add('add-class') // 클래스명 추가, 기존의 클래스가 있더라도 기존 것을 덮어쓰지 않고 새롭게 추가됨
spanElement.classList // 요소의 클래스명을 확인할 수 있다.
spanElement.classList.remove('add-class') // 해당 클래스 삭제, 삭제한 클래스를 제외한 나머지 클래스는 그대로 남아있다.
```

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/c5a419ba-15a8-41e9-8671-41eecbeb3f12)

- `add( String [, String [, ...]] )`
  - 지정한 클래스 값을 추가한다. 만약 추가하려는 클래스가 엘리먼트의 `class` 속성에 이미 존재한다면 무시한다.
- `remove( String [, String [, ...]] )`
  - 지정한 클래스 값을 제거한다.
  - 존재하지 않는 클래스를 제거하는 경우 추가적인 **에러를 발생시키지 않는다.**
- `item( Number )`
  - 콜렉션의 인덱스를 이용하여 클래스 값을 반환한다.
- `toggle( String [, force] )`
  - 하나의 인수만 있을 때: 클래스 값을 토글링한다. 즉, 클래스가 존재한다면 제거하고 `false`를 반환하며, 존재하지 않으면 클래스를 추가하고 `true`를 반환한다.
  - 두번째 인수가 있을 때: 두번째 인수가 `true`로 평가되면 지정한 클래스 값을 추가하고 `false`로 평가되면 제거한다.
- `contains( String )`
  - 지정한 클래스 값이 엘리먼트의 `class` 속성에 존재하는지 확인한다.
- `replace( oldClass, newClass )`
  - 존재하는 클래스를 새로운 클래스로 교체한다.

<br />

## 스타일의 조건부 변경

섹션 13에서 다룰 예정

<br />