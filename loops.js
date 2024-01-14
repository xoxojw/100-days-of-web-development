// for문
for (let i = 0; i < 10; i++) {
  console.log(i);
};

// for ... of문
const users = ['Max', 'Anna', 'Joel'];

for (const user of users) {
  console.log(user);
};

// for ... in문
const loggedInUser = {
  name: 'Max',
  age: 32,
  isAdmin: true,
};

for (const propertyName in loggedInUser) {
  console.log(propertyName);
  console.log(loggedInUser[propertyName]);
};

// while문
let isFinished = false;

while (!isFinished) {
  isFinished = confirm('Do you want to quit?');
}

console.log('Done!'); // while loop가 중지되는 경우에만 실행됨