// Practice what you learned!

// 1) Select the two <button> elements and store them in two different variables.
//    - Select the first button without adding or using any "id"
//    - Select the second button by using an "id"
const removeParagraphBtn = document.body.querySelector('button');
const changeBgColorBtn = document.getElementById('change-bg-btn');


// 2) Add "click" event listener to both buttons (with two different functions).
//    The functions should "console.dir()" the clicked buttons.
//    - Output the first button by using the variable in which it's stored
//    - Output the second button WITHOUT using the variable in which it's stored

// function removeParagraph() {
//   console.dir(removeParagraphBtn);
// }

// function addBgColor(e) {
//   console.dir(e.target);
// }

// removeParagraphBtn.addEventListener('click', removeParagraph);
// changeBgColorBtn.addEventListener('click', addBgColor);


// 3) Now select and store the paragraphs mentioned in the text you see on the page
//    (first and third paragraph)
//    - Select BOTH paragraphs by drilling into the document and "navigating" to the
//      mentioned elements
//    - If you struggle with DOM drilling, use "ids" instead but watch the solution!

const firstParagraphElement = document.body.children[2].children[1];
// const thirdParagraphElement = document.getElementsByTagName('p')[3];
// const thirdParagraphElement = document.body.children[2].children[3];
const thirdParagraphElement = firstParagraphElement.nextElementSibling.nextElementSibling;


// 4) Change the functions from (2) such that:
//    - The first button removes the third paragraph (i.e. the <p> prior to it)
//    - The second button changes the background color of the first paragraph to blue

function removeParagraph() {
  // removeParagraphBtn.previousElementSibling.remove(); // 이 방법을 쓰면 버튼 이전의 p 요소들이 계속해서 삭제됨
  thirdParagraphElement.remove();
}

// function addBgColor() {
//   firstParagraphElement.style.backgroundColor = 'blue';
// }

removeParagraphBtn.addEventListener('click', removeParagraph);
// changeBgColorBtn.addEventListener('click', addBgColor);


// 5) Solve (4) both by changing the "inline styles" as well as by adding CSS classes
//    Note: You'll have to add those classes to the styles.css file first!

function addBgColor(e) {
  firstParagraphElement.classList.add('change-bg-color');
}

changeBgColorBtn.addEventListener('click', addBgColor);