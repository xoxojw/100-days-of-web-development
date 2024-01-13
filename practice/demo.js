const productNameInput = document.querySelector('#product-name');
const remainingChars = document.querySelector('#remaining-chars');

// console.dir(productNameInput);
const maxAllowedChars = productNameInput.maxLength;

function updateRemainingChars(e) {
  const stringLength = e.target.value.length;
  remainingChars.textContent = maxAllowedChars - stringLength;

  if (remainingChars.textContent < 10) {
    productNameInput.classList.add('warning');
    remainingChars.classList.add('warning');
  } else {
    productNameInput.classList.remove('warning');
    remainingChars.classList.remove('warning');
  }
}

productNameInput.addEventListener('input', updateRemainingChars);