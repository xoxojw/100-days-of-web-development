const productNameInputElement = document.querySelector('#product-name');
const remainingCharsElement = document.querySelector('#remaining-chars');

// console.dir(productNameInputElement);
const maxAllowedChars = productNameInputElement.maxLength;

function updateRemainingChars(e) {
  const enteredText = e.target.value;
  const enteredTextLength = enteredText.length;

  const remainingChars = maxAllowedChars - enteredTextLength;
  remainingCharsElement.textContent = remainingChars;

  if (remainingChars === 0) {
    productNameInputElement.classList.add('error');
    remainingCharsElement.classList.add('error');
  } else if (remainingChars <= 10) {
    productNameInputElement.classList.add('warning');
    remainingCharsElement.classList.add('warning');
    productNameInputElement.classList.remove('error');
    remainingCharsElement.classList.remove('error');
  } else {
    productNameInputElement.classList.remove('warning');
    remainingCharsElement.classList.remove('warning');
  }
}

productNameInputElement.addEventListener('input', updateRemainingChars);