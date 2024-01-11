let paragraphElement = document.body.firstElementChild;

function changeParagraphText() {
  paragraphElement.textContent = 'Clicked!';
}
  
// paragraphElement.addEventListener('click', () => {
//   paragraphElement.textContent = 'Clicked!';
// });
paragraphElement.addEventListener('click', changeParagraphText); // 콜백함수