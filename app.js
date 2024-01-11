// console.log(document);
// console.dir(document);
// document.body.children[1].children[0].href = "https://google.com";

let anchorElement = document.getElementById("external-link");
anchorElement.href = "https://google.com";
console.log(anchorElement.href);

anchorElement = document.querySelector("p a");
anchorElement.href = "https://academind.com";

// 1. 요소 추가
// 1) 새 요소를 만들고
let newAnchorElement = document.createElement("a");
newAnchorElement.href = "https://google.com";
newAnchorElement.textContent = "This leads to Google!";

// 2) 새 요소를 추가할 부모 요소에 접근
let firstParagraph = document.querySelector("p");

// 3) 새 요소를 부모 요소 content에 삽입 <tag>content</tag>
firstParagraph.append(newAnchorElement);

// 2. 요소 삭제
// 1) 삭제할 요소를 선택
let firstH1Element = document.querySelector("h1");

// 2) 제거!
firstH1Element.remove();
// firstH1Element.parentElement.removeChild(firstH1Element); // for older browsers


// 3. 요소 이동
firstParagraph.parentElement.append(firstParagraph);
// anchorElement.parentElement.insertBefore(anchorElement, anchorElement.parentElement.firstChild);


// 4. innerHTML
console.log(firstParagraph.innerHTML);

firstParagraph.innerHTML = 'Hi! This is <strong>important!</strong>.';