const fs = require('fs/promises');

async function readFile() {
  let fileData;
  
  // 1. 콜백지옥
  // fs.readFile('data.txt', (error, fileData) => {
  // if (error) {
  // ...
  // }
  //   console.log('File parsing done!');
  //   console.log(fileData.toString());
  //   // start another async task that sends the data to a database
  // });

  // 2. promise then 사용
  // fs.readFile('data.txt')
  //   .then((fileData) => {
  //     console.log('File parsing done!');
  //     console.log(fileData.toString());
  //     // return anotherAsyncOperation;
  //   })
  //   .then(() => {
  //     // 다른 콜백함수
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // 3. async/await 사용  
  try {
    fileData = await fs.readFile('data.text');
  } catch (error) {
    console.log(error);
  }

  console.log('File parsing done!');
  console.log(fileData.toString());
  // return anotherAsyncOperation;
  console.log('Hi there!');
}

readFile();

module.exports = { readFile };
