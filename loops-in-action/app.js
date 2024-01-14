// Calculate sum exercise
// const calculateBtnElement = document.getElementsByTagName('section')[0].querySelector('button');
const calculateBtnElement = document.querySelector('#calculator button');
const outputResultElement = document.getElementById('calculated-sum');

function calculateSum() {
  const userNumberElement = document.getElementById('user-number');
  const userNumber = +userNumberElement.value;

  let sumValue = 0;

  for (let i = 1; i <= userNumber; i++) {
    sumValue += i;
  };

  outputResultElement.textContent = sumValue;
  outputResultElement.style.display = 'block';
};

calculateBtnElement.addEventListener('click', calculateSum);


// Highlight links exercise
const secondSectionElement = document.getElementsByTagName('section')[1];
const highlightBtnElement = document.querySelector('#highlight-links button');

function highlightAllLinks() {
  const anchorElements = secondSectionElement.querySelectorAll('a');
  for (const anchorElement of anchorElements) {
    anchorElement.classList.add('highlight');
  };
};

highlightBtnElement.addEventListener('click', highlightAllLinks);


// Display user data
const dummyUserData = {
  firstName: 'Youngseok',
  lastName: 'Na',
  age: 30,
};

const displayUserDataBtnElement = document.querySelector('#user-data button');

function displayUserData() {
  const outputDataElement = document.getElementById('output-user-data');
  // const newDataItemElement = document.createElement('li');

  outputDataElement.innerHTML = ''; // 버튼을 누를때마다 outputText가 계속해서 추가되지 않고 리셋 후 데이터를 추가되도록

  for (const key in dummyUserData) {
    const newDataItemElement = document.createElement('li');
    const outputText = `${key.toUpperCase()}: ${dummyUserData[key]}`;
    newDataItemElement.textContent = outputText;
    outputDataElement.append(newDataItemElement);
  };
};

displayUserDataBtnElement.addEventListener('click', displayUserData);


// Statistics
const rollDiceBtnElement = document.querySelector('#statistics button');

function rollDice() {
  return Math.floor(Math.random() * 6) + 1
 };

function deriveNumberOfDiceRolls() {
  const userTargetNumberInputElement = document.getElementById('user-target-number');
  const diceRollsListElement = document.getElementById('dice-rolls');

  const enteredNumber = +userTargetNumberInputElement.value;
  diceRollsListElement.innerHTML = ''; // 리스트 초기화

  let hasRolledTargetNumber = false;
  let numberOfRolls = 0;

  while (!hasRolledTargetNumber) {
    const rolledNumber = rollDice();
    numberOfRolls++;

    const newRollListItemElement = document.createElement('li');
    const outputText = `Roll ${numberOfRolls}: ${rolledNumber}`;
    newRollListItemElement.textContent = outputText;
    diceRollsListElement.append(newRollListItemElement);

    if (rolledNumber === enteredNumber) {
      hasRolledTargetNumber = true;
    }
  }

  const outputTotalRollsElement = document.getElementById('output-total-rolls');
  const outputTargetNumberElement = document.getElementById('output-target-number');
  
  outputTargetNumberElement.textContent = enteredNumber;
  outputTotalRollsElement.textContent = numberOfRolls;
 };

rollDiceBtnElement.addEventListener('click', deriveNumberOfDiceRolls);