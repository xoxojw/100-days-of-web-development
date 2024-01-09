# 1. HTML

HTML은 컨텐츠에 의미를 더하기 위한 언어로써 컨텐츠를 설명하는 역할을 한다. HTML은 게시하고자 하는 컨텐츠, 구조 및 의미를 브라우저에 전달하는데 `<>` 꺾쇠 괄호를 사용하여 컨텐츠에 추가 의미와 구조를 더한다.

```html
<h1 style="font-family: sans-serif; text-align: center; color: darkseagreen">100일 코딩 챌린지 - 2024. 01. 08 월요일</h1>
<p style="font-family: sans-serif; text-align: center; color: darkgray;">Learn about the basics of web development - specifically dive into HTML & CSS.</p>
```

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/1ab81158-4d8e-4367-aab6-68bbc257e0be)


## 1) `<!DOCTYPE html>`

- **현재 사용 중인 HTML 버전이 HTML 5라는 의미**
- HTML의 현재 가장 최신 버전은 2014년에 출시된 HTML 5이다.

## 2) 메타 정보

- 브라우저에는 영향을 미치지만 사용자에게는 보이지 않는 정보
- `<head></head>`안에 담겨져 있다.
- head와 body는 어떤 컨텐츠가 주요 시각적 컨텐츠이고, 어떤 데이터가 추가 메타데이터인지 명확히 하기 위해 사용된다.

# 2. CSS

- Cascading StyleSheet ‘종속 스타일 시트’
- 문자 그대로 다수의 CSS 규칙은 하나의 동일한 요소에 영향을 미칠 수 있다

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/dd54b0d9-33b0-4c0e-b6c5-0526ec4b88a8)

위의 캡쳐를 보면 `<a>more learning resources</a>` 부분은 a 요소에 준 css 규칙뿐만 아니라, a:hover, a:-webkit-any-link, 그리고 이 <a>를 감싸고 있는 p 요소에 준 규칙까지 **여러 규칙에 의해 영향을 받고 있음**을 알 수 있다.

# 3. 개발자 도구 - Network 탭에서 알 수 있는 것

![image](https://github.com/xoxojw/100-days-of-web-development/assets/124491335/66e47671-a9cc-45cb-a406-cccb8d3958ad)

외부 파일(.css, .js 등)은 HTML 파일에 병합된 상태가 아니다.

HTML 파일은 컨텐츠, 구조 및 메타데이터가 포함된 파일이므로 항상 가장 먼저 요청하고, 그 외 daily-challenge.css 파일과 같이 HTML 파일에 연계된 파일은 브라우저에서 모두 자동으로 요청한다.

HTML 파일에 외부 파일을 포함하거나 import 하려는 경우 해당 파일의 위치가 지정되어 있다면 페이지가 로드될 때 브라우저가 이러한 추가 파일을 자동으로 요청한다는 점이 핵심이다.