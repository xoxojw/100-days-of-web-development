// 원시값: 숫자, 문자열, 불리언, undefiend 등
// 참조값: 객체


const hobbies = ['Sports', 'Cooking']; // 참조값; 배열의 포인터가 메모리에 저장됨
const age = 30; // 원시값: 값 자체가 메모리에 저장됨

hobbies.push('Reading'); // 배열의 값이 변경되더라도 배열의 주소는 변하지 않음

// hobbies = ['Coding', 'Sleeping']; // 불가능

// 상수에는 객체 자체가 아니라 객체의 주소만 저장하기 때문에 상수 값 자체를 조작하지 않고도 기본 객체나 배열 안의 값들을 조작할 수 있는 것



const person = { age: 30 };

// function getAdultYears(p) { // p : 객체의 '주소'
//   p.age -= 18;
//   return p.age
// };

// console.log(getAdultYears(person)); // 12
// console.log("원래 객체의 값", person); // 12 - person 객체의 age값까지 바뀌어버린다.

// 위처럼 person의 age의 원래 값이 변하지 않게 하려면?
// 1) 재정의하지 않고 값으로만 반환하기
function getAdultYears1(p) { // p : 객체의 '주소'
  return p.age - 18;
};
console.log(getAdultYears1(person)); // 12
console.log("원래 객체의 값", person); // 30

// 2) 매개변수에 기존의 person 객체가 아닌 새 객체를 넣어주기
function getAdultYears2(p) {
  p.age -= 18; // 객체 변경
  return p.age;
}
console.log(getAdultYears2({ age: person.age })); // 12 (1) person.age에 저장된 값을 기반으로 새로운 객체 생성
console.log(getAdultYears2({ ...person })); // 12 - (2) 스프레드 연산자 이용하여 객체의 모든 Key-Value 쌍을 가져와 목록을 제공
console.log("원래 객체의 값", person); // 30