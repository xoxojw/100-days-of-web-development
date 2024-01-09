# 1. 폰트 크기에서의 em, rem, %

## 1) px

- 장점: Easy to understand & translateable
- 단점: Limited user focus & not scalable

## 2) em vs. rem

### (1) em (element)

- Size is relative to font-size
    - 다른 요소의 폰트 크기와 연관된 크기 - 폰트 크기는 부모 요소의 크기에 달려있다.
- 단점
    - %와 마찬가지로 부모 요소에서 상속받는 크기에 따라 사이즈가 달라지기 때문에 관리가 어렵다.

### (2) rem (root em)

- Size is relative to root element’s font size
    - 현재 요소의 폰트 크기와 최상위 요소의 폰트 크기와 연결되어 있다.
    - HTML에서 최상위 요소: `<html>`
- 최상위 요소에 폰트 크기를 따로 추가하지 않았다면 크기는 항상 사용자가 브라우저에 설정되어 있는대로 정해진다.
- 브라우저 설정 - Font size

## 3) %

- Relative to parent element size
    - 현재 작업하고 있는 요소의 부모 요소의 글꼴 크기를 참조하여 적용
- 단점
    - 부모 요소의 크기에 따르는 종속적인 성질을 갖기 때문에 유닛이 많아지고 복잡한 구조를 가진 웹 페이지에서는 관리가 어려워질 수 밖에 없다. *Hard to manage due to cascading nature*

## 4) 정리

- em과 %는 폰트 크기에서는 비슷한 결과를 도출한다.
- rem 단위로는 폰트 크기를 항상 최상위 요소에 기반하여 계산할 수 있다.
    - 최상위 요소에 따로 지정된 폰트 크기가 없다면 html 엘리멘트에 설정해줄 수 있지만 이 방법은 추천하지 않음
    - html 요소에 적용된 설정이 없으면 rem 단위로 폰트 크기를 제어할 수 있음
- 하지만 rem이 정답인 것만은 아니다. 단위 설정은 개인 선호나 프로젝트의 요구사항에 따라 다르게 적용될 수 있다.

---

# 2. 폰트가 아닌 다른 요소에서의 em, rem, %

- % 단위 사용 시 부모 요소의 너비를 참조
- em과 rem을 사용하면 어떤 하위 요소에 적용되더라도 실제로 적용되는 폰트 크기 속성을 참조
    - 예시 - padding
        - em 단위는 해당 요소 자체의 폰트 크기를 참조
            
            ```css
            .food-item-content {
              font-size: 200%;
              /* padding: 16px; */
              /* padding: 10%; */
              padding: 0.1em;
              text-align: center;
            }
            
            예를 들어 브라우저 기본 폰트 크기가 22px라면,
            food-item-content 클래스를 가진 div에서 폰트 크기는 font-size: 200%으로 인해 44px가 되므로,
            <div class="food-item-content">의 padding값은 44px의 0.1배인 4.4px이 된다.
            ```
            
        - rem 단위는 최상위 요소의 폰트 크기를 참조
            
            ```css
            .food-item-content {
              font-size: 200%;
              /* padding: 16px; */
              /* padding: 10%; */
              padding: 0.1rem;
              text-align: center;
            }
            
            예를 들어 브라우저 기본 폰트 크기가 22px라면,
            html 요소에 아무런 font-size 설정이 없는 경우 최상위 html 요소의 폰트 크기도 22px이므로
            <div class="food-item-content">의 padding값은 22px의 0.1배인 2.2px이 된다.
            ```
            

---

# 3. 데스크탑 퍼스트 vs 모바일 퍼스트

## 1) 데스크탑 퍼스트

- 데스크탑 화면의 크기에 맞추어 디자인하는 것
- 전통적인 접근 방식 (Traditional approach)
- 오피스 기반 고객에 초점
- 많은 기능을 추가할 수 있다
    - 보통 컴퓨터 화면은 사용할 수 있는 공간이 많기 때문

## 2) 모바일 퍼스트

- 모바일 장치, 보통 스마트폰에 맞추어 웹사이트를 디자인하고, 나중에 페이지가 더 큰 장치의 화면에서도 잘 보이도록 하는 것
- 기능적인 접근 방식 (Functional approach)
- 라이프스타일, 뉴스 중심의 고객에 초점
    - 평범한 뉴스 앱, 신문 앱, 인스타그램, 페이스북, 틱톡 등
- 컨텐츠 우선 “Content first”

---

# 4. 미디어 쿼리

- 미디어 쿼리는 CSS 코드이다.
    - 기존에 작성된 CSS 코드를 대체하는 것이 아니다. 작성한 코드와 코드 베이스는 계속해서 유효하지만 미디어 쿼리가 실행되면 미디어 쿼리에서 정의된 규칙과 속성이 추가되는 것

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/de838f98-0491-4e23-bd35-8061f75207b1)

- 데스크탑 퍼스트
    - 최대 너비 사용
    - 한계점: 1200px 이하, 768px 이하
- 모바일 퍼스트
    - 최소 너비 사용
    - 한계점: 768px 이상, 1200px 이상
- 참고: 각 기기별 사이즈
  
  ![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/deace9a7-0289-4da4-9ada-74aaa9228eed)

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/ef2ba1bc-d382-42e8-8c2a-2cc6b4208a4f)
