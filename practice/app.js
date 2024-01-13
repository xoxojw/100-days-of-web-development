let paragraphElement = document.body.firstElementChild;

function changeParagraphText() {
  paragraphElement.textContent = 'Clicked!';
}
  
// paragraphElement.addEventListener('click', () => {
//   paragraphElement.textContent = 'Clicked!';
// });
paragraphElement.addEventListener('click', changeParagraphText); // 콜백함수

// ---

let inputElement = document.body.querySelector('input');

function retrieveUserInput(event) {
  // let enteredText = inputElement.value;
  let enteredText = event.target.value; // 위의 inputElement.value와 같지만 외부 변수를 사용하지 않아도 된다는 이점
  // let enteredText = event.data; => 위의 inputElement.value, event.target.value와 다름
  console.log(enteredText);
  console.log(event);
}

inputElement.addEventListener('input', retrieveUserInput);