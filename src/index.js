const { spawnSync, execSync } = require('child_process');
const fs = require('fs')
const os = require('os');
const path = require('path');

async function _runPython (pythonPath, params = [], { command, type }) {
  try {
    if (type === 'exec') {
      const files = pythonPath.split('/');
      const fileName = files[files.length - 1];
      pythonPath = pythonPath.replace(`/${fileName}`, '');
      try {
        const result = execSync(`cd ${pythonPath} && ${command} ${fileName} ` + params.join(' '), {
          encoding: 'utf8'
        });
        return result;
      } catch (error) {
        throw error;
      }
    }

    if (type === 'spawn') {
      const spwanParmas = [pythonPath];
      if (params) {
        for (const param of params) {
          spwanParmas.push(param);
        }
      }
      const { stdout, stderr } = spawnSync(command, spwanParmas, {
        encoding: 'utf8'
      });
      if (stdout) {
        return stdout;
      }
      if (stderr) {
        throw new Error(stderr);
      }
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

async function _handleResult(path, params, options) {
  try {
    const result = await _runPython(path, params, options);
    return result;
  } catch (error) {
    error.name = 'PythonExecError';
    error.message = error.message.replace(/File.+,.+line/, 'line').replace(/^Command failed[\s\S]*line/, 'line');
    throw error;
  }
}

const _runByPath = async (path, params = [], options) => {
  try {
    return await _handleResult(path, params, options);
  } catch (error) {
    throw error;
  }
}

const _runByText = async (text, params = [], options) => {
  const fileName = _getFileName()
  const tmpPath = path.join(os.tmpdir(), `${fileName}.py`);
  fs.writeFileSync(tmpPath, text);
  try {
    return await _runByPath(tmpPath, params, options);
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

const execByPath = async (path, params = []) => {
  return await _runByPath(path, params, { command: 'python', type: 'exec' });
}

const execByText = async (text, params = []) => {
  return await _runByText(text, params, { command: 'python', type: 'exec' });
}

const spawnByPath = async (path, params = []) => {
  return await _runByPath(path, params, { command: 'python', type: 'spawn' });
}

const spawnByText = async (text, params = []) => {
  return await _runByText(text, params, { command: 'python', type: 'spawn' });
}

const execByPath3 = async (path, params = []) => {
  return await _runByPath(path, params, { command: 'python3', type: 'exec' });
}

const execByText3 = async (text, params = []) => {
  return await _runByText(text, params, { command: 'python3', type: 'exec' });
}

const spawnByPath3 = async (path, params = []) => {
  return await _runByPath(path, params, { command: 'python3', type: 'spawn' });
}

const spawnByText3 = async (text, params = []) => {
  return await _runByText(text, params, { command: 'python3', type: 'spawn' });
}

module.exports = {
  execByText,
  execByPath,
  spawnByText,
  spawnByPath,
  execByText3,
  execByPath3,
  spawnByText3,
  spawnByPath3
}