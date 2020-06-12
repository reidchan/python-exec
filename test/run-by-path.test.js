const path = require('path');
const { execByPath, execByPath3, spawnByPath, spawnByPath3 } = require('.');

(async () => {
  console.log('execByPath...');
  try {
    const filePath = path.join(__dirname, './demo.py');
    const result = await execByPath(filePath);
    console.log('result =>', result);
  } catch (error) {
    console.log('error =>', error);
  }
})();

(async () => {
  console.log('execByPath3...');
  try {
    const filePath = path.join(__dirname, './demo.py');
    const result = await execByPath3(filePath);
    console.log('result =>', result);
  } catch (error) {
    console.log('error =>', error);
  }
})();

(async () => {
  console.log('spawnByPath...');
  try {
    const filePath = path.join(__dirname, './demo.py');
    const result = await spawnByPath(filePath);
    console.log('result =>', result);
  } catch (error) {
    console.log('error =>', error);
  }
})();

(async () => {
  console.log('spawnByPath3...');
  try {
    const filePath = path.join(__dirname, './demo.py');
    const result = await spawnByPath3(filePath);
    console.log('result =>', result);
  } catch (error) {
    console.log('error =>', error);
  }
})();