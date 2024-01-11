// This is how a comment is added to JavaScript
// Comments are not executed - they are just there to provide extra
// information to you or other developers

// Exercise Time!

// 1) Create three new variables:
//    - A variable that stores the name of an online course of your choice
//    - A variable that stores the price of that course
//    - A variable that stores the three main goals that you have, when taking this course

let courseName = 'Web Development Bootcamp';
let coursePrice = 12000;
let courseGoals = [
  '웹개발에 대한 개념 전체적으로 복습하기',
  '라이브러리나 프레임워크가 아닌 자바스크립트 자체에 대한 이해도 높이기',
  '매일 조금씩이라도 꾸준히 학습하기'
];

// 2) Output ("alert") the three variable values
alert(courseName);
alert(coursePrice);
alert(courseGoals);

// 3) Try "grouping" the three variables together and still output their values thereafter
let course = {
  name: courseName,
  price: coursePrice,
  goals: courseGoals,
}

// 4) Also output the second element in your "main goals" variable
alert(course.goals[1]);

// 5) Add a custom command that does the following:
//    - Use your "main goals" variable and access an element by its identifier
//    - The concrete identifier value should be dynamic / flexible 
//      (i.e. the command can be executed for different identifier)
//    - The "main goals" variable should also be dynamic: The command should work 
//      with ANY list of values
//    - The custom command should provide the accessed value (i.e. the list element)
function getListItem(arr, arrIdx) {
  let arrayElement = arr[arrIdx];
  return arrayElement;
}

// 6) Execute your custom command from (5) and output ("alert") the result
let firstGoal = getListItem(courseGoals, 0);
alert(firstGoal);