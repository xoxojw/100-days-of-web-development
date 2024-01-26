const fs = require('fs');

function readFile() {
  let fileData;
  try {
    const fileData = fs.readFileSync('data.json');
  } catch (err) {
    console.log('An error occurred.');
  }
  console.log(fileData);
}

readFile();

module.exports = { readFile };