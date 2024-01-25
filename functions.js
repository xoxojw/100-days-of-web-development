function greetUser(greetingPrefix, userName = 'user') {
  console.log(`${greetingPrefix}, ${userName}!`);
}

greetUser('Hi', 'Max');
greetUser('Hello');

function sumUp(...numbers) { // spread operator
  let result = 0;

  for (const number of numbers) {
    result += number;
  }

  return result;
}

const inputNumbers = [1, 5, 10, 11, 20, 31];

console.log(sumUp(inputNumbers)); // 01,5,10,11,20,31
console.log(sumUp(...inputNumbers)); // 78

console.log(sumUp);