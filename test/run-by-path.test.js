const path = require('path');
const { runByPath } = require('../src');

(async () => {
  try {
    const filePath = path.join(__dirname, './demo.py');
    const result = await runByPath(filePath, ['-gpus=0,1,2', '--batch-size=10']);
    console.log('result =>', result);
  } catch (error) {
    console.log('error =>', error);
  }
})();