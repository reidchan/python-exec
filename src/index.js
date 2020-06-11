const { spawnSync } = require('child_process');
const fs = require('fs')
const os = require('os');
const path = require('path');

async function _execPython (pythonPath, params = []) {
  try {
    const spwanParmas = [pythonPath];
    if (params) {
      for (const param of params) {
        spwanParmas.push(param);
      }
    }
    const { stdout, stderr } = spawnSync('python', spwanParmas, {
      encoding: 'utf8'
    });
    if (stdout) {
      return stdout;
    }
    if (stderr) {
      throw new Error(stderr);
    }
  } catch (error) {
    throw error;
  }
}

function _getFileName() {
  const timestamp = new Date().getTime() + '';
  const num = 4;
  const random = parseInt((Math.random() * 9 * Math.pow(10, num - 1)) + Math.pow(10, num - 1) + '')
  return timestamp.substring(timestamp.length - 6) + random;
}

async function _handleResult(path, params) {
  try {
    const result = await _execPython(path, params);
    return result;
  } catch (error) {
    error.name = 'PythonExecError';
    error.message = error.message.replace(/File.+,.+line/, 'line');
    throw error;
  }
}

const runByPath = async (path, params = []) => {
  try {
    return await _handleResult(path, params);
  } catch (error) {
    throw error;
  }
}

const runByText = async (text, params = []) => {
  const fileName = _getFileName()
  const tmpPath = path.join(os.tmpdir(), `${fileName}.py`);
  fs.writeFileSync(tmpPath, text);
  try {
    return await runByPath(tmpPath, params);
  } catch (error) {
    throw error;
  } finally {
    if (tmpPath) {
      fs.unlink(tmpPath, error => {
        if (error) {
          throw error;
        }
      });
    }
  }
}

module.exports = {
  runByText,
  runByPath
}