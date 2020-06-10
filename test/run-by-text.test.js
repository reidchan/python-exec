const { runByText } = require('../src');

(async () => {
  try {
    const result = await runByText(`import os;
import sys;
print('hello world');
print("argv =>", sys.argv);`, ['-gpus=0,1,2', '--batch-size=10']);
    console.log('result =>', result);
  } catch (error) {
    console.log('error =>', error);
  }
})();