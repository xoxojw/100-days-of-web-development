// 객체의 생성
// const job = {
//   title: 'Developer',
//   location: 'New York',
//   salary: 50000
// };

// console.log(new Date().toString());

// const job2 = {
//   title: 'Cook',
//   location: 'Munich',
//   salary: 35000,
// }

class Job {
  constructor(title, location, salary) { // constructor: 구체적 인스턴스를 생성하는 메서드, 생성자 함수 역할
    this.title = title; // this: 생성될 객체를 참조
    this.location = location;
    this.salary = salary;
  }

  decribe() {
    console.log(`I'm a ${this.title}, I work in ${this.location} and I earn ${this.salary}.`)
  }
}

const developer = new Job('Developer', 'New York', 50000); // 순서대로 입력
const cook = new Job('Cook', 'Munich', 35000);

developer.decribe(); // I'm a Developer, I work in New York and I earn 50000.
cook.decribe(); // I'm a Cook, I work in Munich and I earn 35000.


// 객체와 배열의 디스트럭쳐링
const input = ['Max', 'Schwarzmüller'];

// const firstName = input[0];
// const lastName = input[1];
const [firstName, lastName] = input; // 구조분해할당

const job = { title: 'Developer', location: 'New York' };
const { title } = job;
const { location: place } = job;
console.log(place) // New York