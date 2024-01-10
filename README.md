# 1. 웹사이트를 제작할 때 명심해야 할 세 가지

## 1) 여러 기능들을 단계별로 추가할 것

웹사이트의 기능별로 생각하고 처음부터 모든 기능과 요소가 완성된 전체 레이아웃을 생각하지 않는다.

## 2) 전달되어야 하는 핵심 정보를 생각할 것

웹사이트의 잠재적인 방문자가 얻고 싶을 정보가 무엇인지, 개발자가 전달하고 싶은 정보는 어떤 정보인지 염두해야 한다.

모든 정보를 한번에 추가하려고 하면 집중력을 잃게 된다. 먼저 핵심 정보를 생각하고 웹사이트의 그 데이터를 기반으로 완성해나갈 것.

## 3) 적을수록 좋다. - 웹사이트를 과장하지 말 것

너무 과하게 디자인하려고 하지 말 것

<br />
<br />

# 2. 웹사이트 디자인에서 고려해야 하는 것들

## 1) 크기와 간격

웹페이지의 모든 영역을 채우지 않는다. 좌우 여백, 컨텐츠 간 여백을 충분히 둔다. 여백이 너무 많은 것 같다면 나중에 조정할 수 있다.

## 2) 폰트

### (1) 글꼴
### (2) 폰트 크기
### (3) 폰트 두께

## 3) 색상

### (1) 회색은 항상 필요하다

배경에 회색을 적절히 사용하면 페이지에서 강조해야 할 내용에 선명함을 줄 수 있다.

글씨는 완전한 검정색`#000000`보다는 어두운 회색을 사용하면 더 자연스럽다.

### (2) 주 색상 선택

웹사이트에 사용하는 핵심 색상이며 기업 정체성이다.

### (3) 포인트 색상

주 색상 이외에 웹 페이지에서 강조해야 하는 경우가 있을 때 사용

<br />
<br />

# 3. html, :root, * 선택자 비교

## 1) html

html selector에 추가하는 css 규칙은 html에 적용되고 html 안에 포함된 요소들에도 상속된다.

css 변수 예제에서 사용했던 논리

```css
html {
  --color-grey-100: rgb(236, 236, 236);
  --color-grey-400: rgb(134, 134, 134);
  --color-grey-600: rgb(58, 58, 58);
  --color-grey-900: rgb(41, 41, 41);

  --color-primary-300: rgb(167, 226, 255);
  --color-primary-700: rgb(0, 170, 255);

  --size-1: 18px;
  --size-5: 50px;

  background-color: var(--color-grey-100);
}
```

## 2) :root 가상 선택자

문서의 최상위 요소를 선택한다. 이 경우 css 규칙은 최상위 요소에 적용되어서 최상위 요소 안에 포함된 요소에 상속된다.

html과 :root의 차이

- html 관련 프로젝트인 웹 테이블 등에서는 두 선택자가 하는 일이 거의 똑같지만, css를 사용할 수 있는 다른 영역들이 있다.(ex. xml) 이러한 다른 영역에서는 html 요소가 최상위 요소가 아니라는 점에서 차이가 있다.
- css의 특수성의 개념에서 보면 :root 선택자가 html 선택자보다 더 높기 때문에 :root 선택자가 html 선택자를 덮어쓴다. [참고 블로그](https://velog.io/@apdlvmf486/root-html-%EC%84%A0%ED%83%9D%EC%9E%90-%EB%B9%84%EA%B5%90)

## 3) * 선택자

* 선택자는 단순하게 html 문서의 모든 요소를 선택한다. 이는 css 규칙을 모든 요소에 바로 적용해버린다는 의미이다.

*html과 :root 선택자는 css 규칙이 포함된 요소로 상속되는 것이고, * 선택자는 규칙을 html 문서의 모든 요소에 바로 추가하여 적용한다는 점에서 차이가 있다.*

<br />
<br />

# 4. CSS Transformations & Transitions

## 1) 변환 Transformations

> 요소의 모양을 이동하거나 변경하는 것 (ex. hover)
> 

변환은 `transform` 속성을 사용하는데 이 속성은 변환하려는 요소에 추가하는 것이 아니라, 변환을 발생시키는 요소에 추가한다. 아래 예시를 통해 다시 살펴보자.

```css
.card-container {
  background-color: rgb(255, 255, 255);
  width: 350px;
  margin: 50px auto;
  box-shadow: 3px 3px 10px rgb(201, 200, 200);
}

.card-container:hover {
  transform: scale(1.05);
}
```

변환하려는 요소는 `.card-container`이지만 여기에 `transform` 속성을 추가하는 것이 아니고, `.card-container` 요소의 변환을 발생시키는 요소인 `.card-container:hover`에 추가하는 것이다.

## 2) 전환 Transitions

> transformation 등의 상태 변화에 애니메이션을 부여하여 부드럽게 전환하는 것
> 

전환은 css 변환 방식을 지정해주는 것이다. 위의 변환 예시에서 `.card-container:hover`에 `transform: scale(1.05)`를 지정해주면 `.card-container`에 마우스를 올리자마자 해당 요소의 크기가 1.05배 커지는데, 이 변화를 트랜지션을 통해 좀 더 부드럽게 보이도록 설정해줄 수 있다.

전환은 `transition` 속성을 사용한다. 전환은 변환과 다르게 변환을 발생시키는 요소가 아닌 변환하려는 원래의 요소에 적용한다. 전환이 정의된 요소에 중첩되어 있는 요소에도 적용할 수 있다.

```css
.card-container {
  background-color: var(--sample-variable);
  width: 350px;
  margin: 50px auto;
  box-shadow: 3px 3px 10px rgb(201, 200, 200);
  transition: transform 0.2s ease 0.1s;
}

.card-container:hover{
    transform: scale(1.05);
}
```

`transition` 속성은 `.card-container:hover`가 아닌 `.card-container` , 그러니까 변환하고자 하는 원래 요소에 추가한다.

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/df289500-d7a4-4771-bdbe-d54c15d5b412)

### (1) property

전환을 적용하려는 속성. transform 외에도 background-color 등 다양한 속성을 적용할 수 있다.

### (2) duration

property 속성의 변화가 얼마나 지속될 지 지속시간을 지정한다.

### (3) timing function

전환 효과의 영향을 받는 css 속성에 대한 중간값 계산 방법을 설정한다.

타이밍 기능은 여러가지가 존재하는데, 그 중에서 `ease-out`은 전환이 빠르게 시작하고 늦게 끝나는 것을 의미하고 `ease-in`은 전환이 느리게 시작하고 속도가 향상되는 것을 의미한다. 기본값은 `ease`이며, 이는 전환 기간동안 일정하게 배분된다는 것을 의미한다.

[MDN transition-timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)

### (4) delay

지연은 전환이 시작되기 전까지의 시간을 설정한다. `delay`를 1s로 설정해주는 경우, 특정 변환 이벤트가 트리거되면 1초 뒤에 전환이 발생한다는 뜻이다.

<br />
<br />

# 5. SVG

Scalaber Vector Graphics의 약자로,  2차원 벡터 그래픽을 표현하기 위한 XML 기반의 마크업 언어이다.

브라우저로 렌더링하고 해석할 수 있는 확장형 이미지를 텍스트 기반으로 묘사한 것이다.

일반 사진이나 복잡한 이미지를 묘사하지는 못하고, 아이콘과 같은 보다 쉬운 이미지에 사용한다.

<br />