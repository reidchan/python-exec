const { execByText, execByText3, spawnByText, spawnByText3 } = require('.');

(async () => {
  console.log('execByText...');
  try {
    const result = await execByText(`import os;
import sys;
print('hello guy');
print("argv =>", sys.argv);`, ['-gpus=0,1,2', '--batch-size=10']);
    console.log('result =>', result);
  } catch (error) {
    console.log('error =>', error.message);
  }
})();

(async () => {
  console.log('execByText3...');
  try {
    const result = await execByText3(`import os;
import sys;
print('hello guy');
print("argv =>", sys.argv);`, ['-gpus=0,1,2', '--batch-size=10']);
    console.log('result =>', result);
  } catch (error) {
    console.log('error =>', error.message);
  }
})();

(async () => {
  console.log('spawnByText...');
  try {
    const result = await spawnByText(`import os;
import sys;
print('hello guy');
print("argv =>", sys.argv);`, ['-gpus=0,1,2', '--batch-size=10']);
    console.log('result =>', result);
  } catch (error) {
    console.log('error =>', error.message);
  }
})();

(async () => {
  console.log('spawnByText3...');
  try {
    const result = await spawnByText3(`import os;
import sys;
print('hello guy');
print("argv =>", sys.argv);`, ['-gpus=0,1,2', '--batch-size=10']);
    console.log('result =>', result);
  } catch (error) {
    console.log('error =>', error.message);
  }
})();

(async () => {
  const result = await execByText(`print('hello guy');`);
  console.log('result =>', result);
})();